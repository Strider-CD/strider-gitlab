var _ = require('lodash');
var api = require('./api');
var async = require('async');
var util = require('util');
var webhooks = require('./webhooks');
var debug = require('debug')('strider-gitlab:webapp');
var hostname = process.env.strider_server_name || 'http://localhost:3000';

module.exports = {

  // this is the project-level config
  // project.provider.config
  config: {
    url: String,
    owner: String,
    repo: String,
    cache: Boolean,
    pull_requests: {type: String, enum: ['all', 'none', 'whitelist']},
    whitelist: [{
      name: String,
      level: {type: String, enum: ['tester', 'admin']}
    }],
    // used for the webhook
    secret: String,
    // type: https || ssh
    auth: {}
  },

  listRepos: function (config, done) {
    api.get(config, 'projects', function (err, repos) {
      if (err) return done(err);

      if (!repos) {
        return done(new Error("Could not get a list of projects from the GitLab repository. Please check the configuration in Account->GitLab."));
      }

      // Parse and filter only git repos
      done(null, repos.map(api.parseRepo).filter(function (repo) {
        return repo.config.scm === 'git';
      }));
    });
  },

  getFile: function (filename, ref, account, config, project, done) {
    var repo_id = project.provider.repo_id;
    var branch = ref.branch;

    var uri = util.format('projects/%d/repository/blobs/%s?filepath=%s', repo_id, branch, filename);

    api.get(account.config, uri, function (err, data, res) {
      if(err) {
        return done(err, null);
      }
      else {
        done(err, res.text);
      }
    });
  },

  getBranches: function (account, config, project, done) {
    var repo_id = project.provider.repo_id;

    var uri = util.format('projects/%d/repository/branches', repo_id);

    debug("Getting URI " + uri);
    api.get(account, uri, function (err, branches) {
      debug("We get the following as branches: " + util.inspect(branches, false, 10, true));

      done(err, _.map(branches || [], function (branch) {
        return branch.name;
      }));
    });
  },

  // will be namespaced under /:org/:repo/api/gitlab
  routes: function (app, context) {
    app.post('/hook', function (req, res) {
      var url = hostname + '/' + req.project.name + '/api/gitlab/webhook',
        config = req.accountConfig();

      if (!config.api_key) return res.status(400).send('Gitlab account not configured');

      return api.createHooks(config, req.project.provider.repo_id, url, function (err) {
        if (err) return res.status(500).send(err.message);

        return res.status(200).send('Webhook registered');
      });
    });

    app.delete('/hook', function (req, res) {
      var url = hostname + '/' + req.project.name + '/api/gitlab/webhook',
        config = req.accountConfig();

      if (!config.api_key) return res.status(400).send('Gitlab account not configured');

      return api.deleteHooks(config, req.project.provider.repo_id, url, function (err, deleted) {
        if (err) return res.status(500).send(err.message);

        return res.status(200).send(deleted ? 'Webhook removed' : 'No webhook to delete');
      });
    });

    // gitlab should hit this endpoint
    app.anon.post('/webhook', webhooks.receiveWebhook.bind(null, context.emitter));
  },

  setupRepo: function (account, config, project, done) {
    var url = hostname + '/' + project.name + '/api/gitlab/webhook';
    var deploy_key_title = util.format('strider-%s', project.name);

    if (!account.api_key) return done(new Error('Gitlab account not configured'));

    // Create webhooks and add deploykey
    return async.parallel([
      function (callback) {
        api.createHooks(account, project.provider.repo_id, url, callback);
      },
      function (callback) {
        api.addDeployKey(account, project.provider.repo_id, deploy_key_title, project.branches[0].pubkey, callback);
      }
    ], function (err) {
      done(err, config);
    });
  },

  teardownRepo: function (account, config, project, done) {
    var url = hostname + '/' + project.name + '/api/gitlab/webhook';
    var deploy_key_title = util.format('strider-%s', project.name);

    if (!account.api_key) return done(new Error('Gitlab account not configured'));

    // Remove webhooks and deploykey
    return async.parallel([
      function (callback) {
        api.deleteHooks(account, project.provider.repo_id, url, callback);
      },
      function (callback) {
        api.removeDeployKey(account, project.provider.repo_id, deploy_key_title, callback);
      }
    ], done);
  }
};
