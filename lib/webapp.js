'use strict';

const _ = require('lodash');
const api = require('./api');
const async = require('async');
const debug = require('debug')('strider-gitlab:webapp');
const hostname = process.env.strider_server_name || 'http://localhost:3000';
const util = require('util');
const webhooks = require('./webhooks');

module.exports = {
  // this is the project-level config
  // project.provider.config
  config: {
    url: String,
    owner: String,
    repo: String,
    cache: Boolean,
    pull_requests: { type: String, enum: ['all', 'none', 'whitelist'] },
    whitelist: [
      {
        name: String,
        level: { type: String, enum: ['tester', 'admin'] },
      },
    ],
    // used for the webhook
    secret: String,
    // type: https || ssh
    auth: {},
  },

  listRepos: (config, done) => {
    api.get(config, 'projects', (err, repos) => {
      if (err) return done(err);

      if (!repos) {
        return done(
          new Error(
            'Could not get a list of projects from the GitLab repository. Please check the configuration in Account->GitLab.'
          )
        );
      }

      // Parse and filter only git repos
      done(
        null,
        repos.map(api.parseRepo).filter((repo) => {
          return repo.config.scm === 'git';
        })
      );
    });
  },

  getFile: (filename, ref, account, config, project, done) => {
    const repoId = project.provider.repo_id;
    const branch = encodeURIComponent(ref.branch);
    const encodedFileName = encodeURIComponent(filename);
    const uri = util.format(
      'projects/%d/repository/blobs/%s?filepath=%s',
      repoId,
      branch,
      encodedFileName
    );

    api.get(account, uri, (err, data, res) => {
      if (err) {
        return done(err, null);
      } else {
        done(err, res.text);
      }
    });
  },

  getBranches: (account, config, project, done) => {
    const repoId = project.provider.repo_id;
    const uri = util.format('projects/%d/repository/branches', repoId);

    debug(`Getting URI ${uri}`);
    api.get(account, uri, (err, branches) => {
      debug(
        `We get the following as branches: ${util.inspect(
          branches,
          false,
          10,
          true
        )}`
      );

      done(
        err,
        _.map(branches || [], (branch) => {
          return branch.name;
        })
      );
    });
  },

  // will be namespaced under /:org/:repo/api/gitlab
  routes: (app, context) => {
    app.post('/hook', (req, res) => {
      const url = `${hostname}/${req.project.name}/api/gitlab/webhook`;
      const config = req.accountConfig();

      if (!config.api_key)
        return res.status(400).send('Gitlab account not configured');

      return api.createHooks(
        config,
        req.project.provider.repo_id,
        url,
        (err) => {
          if (err) return res.status(500).send(err.message);

          return res.status(200).send('Webhook registered');
        }
      );
    });

    app.delete('/hook', (req, res) => {
      const url = `${hostname}/${req.project.name}/api/gitlab/webhook`;
      const config = req.accountConfig();

      if (!config.api_key)
        return res.status(400).send('Gitlab account not configured');

      return api.deleteHooks(
        config,
        req.project.provider.repo_id,
        url,
        (err, deleted) => {
          if (err) return res.status(500).send(err.message);

          return res
            .status(200)
            .send(deleted ? 'Webhook removed' : 'No webhook to delete');
        }
      );
    });

    // gitlab should hit this endpoint
    app.anon.get('/webhook', function (req, res) {
      webhooks.receiveWebhook(context.emitter, req, res);
    });
  },

  setupRepo: (account, config, project, done) => {
    const url = `${hostname}/${project.name}/api/gitlab/webhook`;
    const deploy_key_title = util.format('strider-%s', project.name);

    if (!account.api_key)
      return done(new Error('Gitlab account not configured'));

    // Create webhooks and add deploykey
    return async.parallel(
      [
        (callback) => {
          debug('Creating webhooks...');
          api.createHooks(account, project.provider.repo_id, url, callback);
        },
        (callback) => {
          debug('Adding deployment keys...');
          api.addDeployKey(
            account,
            project.provider.repo_id,
            deploy_key_title,
            project.branches[0].pubkey,
            callback
          );
        },
      ],
      (err) => {
        done(err, config);
      }
    );
  },

  teardownRepo: (account, config, project, done) => {
    const url = `${hostname}/${project.name}/api/gitlab/webhook`;
    const deploy_key_title = util.format('strider-%s', project.name);

    if (!account.api_key)
      return done(new Error('Gitlab account not configured'));

    // Remove webhooks and deploykey
    return async.parallel(
      [
        (callback) => {
          api.deleteHooks(account, project.provider.repo_id, url, callback);
        },
        (callback) => {
          api.removeDeployKey(
            account,
            project.provider.repo_id,
            deploy_key_title,
            callback
          );
        },
      ],
      done
    );
  },
};
