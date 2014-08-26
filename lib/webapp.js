var api = require('./api'),
    webhooks = require('./webhooks'),
    util = require('util'),
    _ = require('lodash'),
    hostname = process.env.strider_server_name || 'http://localhost:3000';


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

    listRepos: function(config, done){
        api.get(config, "projects", function(err, repos){
            if (err) return done(err);

            // Parse and filter only git repos
            done(null, repos.map(api.parseRepo).filter(function(repo){
                return repo.config.scm === 'git';
            }));
        });
    },

    getFile: function (filename, ref, account, config, project, done){
        var repo_id = project.provider.repo_id,
            branch = project.branches[0].name;

        var uri = util.format("projects/%d/repository/blobs/%s?filepath=%s", repo_id, branch, filename);

        api.get(account.config, uri, function(err, data){
            done(err, data);
        });
    },

    getBranches: function(account, config, project, done){
        var repo_id = project.provider.repo_id;

        var uri = util.format("projects/%d/repository/branches", repo_id);

        api.get(account, uri, function(err, branches){
            done(err, _.map(branches || [], function(branch){ return branch.name }));
        });
    },

    // will be namespaced under /:org/:repo/api/gitlab
    routes: function (app, context){
        app.post('/hook', function(req, res){
            var url = hostname + '/' + req.project.name + '/api/gitlab/webhook',
                config = req.accountConfig();

            if (!config.api_key) return res.send(400, 'Gitlab account not configured');

            return api.createHooks(config, req.project.provider.repo_id, url, function(err){
                if (err) return res.send(500, err.message);

                return res.send(200, 'Webhook registered');
            });
        });

        app.delete('/hook', function(req, res){
            var url = hostname + '/' + req.project.name + '/api/gitlab/webhook',
                config = req.accountConfig();

            if (!config.api_key) return res.send(400, 'Gitlab account not configured');

            return api.deleteHooks(config, req.project.provider.repo_id, url, function(err, deleted){
                if (err) return res.send(500, err.message);

                return res.send(200, deleted ? 'Webhook removed' : 'No webhook to delete');
            });
        });

        // gitlab should hit this endpoint
        app.anon.post('/webhook', webhooks.receiveWebhook.bind(null, context.emitter));
    },

    setupRepo: function(account, config, project, done) {
        var url = hostname + '/' + project.name + '/api/gitlab/webhook';

        if (!account.api_key) return done(new Error('Gitlab account not configured'));

        return api.createHooks(account, project.provider.repo_id, url, function(err){
            done(err, config);
        });
    },

    teardownRepo: function(account, config, project, done) {
        var url = hostname + '/' + project.name + '/api/gitlab/webhook';

        if (!account.api_key) return done(new Error('Gitlab account not configured'));

        return api.deleteHooks(account, project.provider.repo_id, url, done);
    }
};
