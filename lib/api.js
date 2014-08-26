var request = require('request'),
    qs = require('querystring'),
    _ = require('lodash'),
    async = require('async');

module.exports = {
    get: get,
    parseRepo: parseRepo,
    createHooks: createHooks,
    deleteHooks: deleteHooks
};


function get(config, uri, callback){
    var qpm = {
            private_token: config.api_key,
            per_page: 100
        },
        glue = (~uri.indexOf('?')) ? "&" : "?",
        url = config.api_url + '/' + uri + glue + qs.stringify(qpm);

    request.get({
        url: url,
        json: true
    }, function(err, res){
        if (res.statusCode != 200) {
            return callback(new Error("API seems to be broken: Status:" + res.statusCode));
        }
        callback(err, res.body);
    });
}

function parseRepo(repo){
    return {
        id: repo.id,
        name: repo.path_with_namespace,
        display_name: repo.path_with_namespace,
        display_url: repo.web_url,
        group: repo.namespace.name,
        private: !repo.public,
        config: {
            auth: { type: 'ssh' },
            scm: 'git',
            url: repo.web_url,
            owner: repo.owner,
            repo: repo.http_url_to_repo,
            pull_requests: 'none',
            whitelist: []
        }
    }
}


function createHooks(config, repo_id, url, callback){
    var qpm = { private_token: config.api_key },
        endpoint_url = config.api_url + "/projects/" + repo_id + "/hooks?" + qs.stringify(qpm);

    request.post({
        url: endpoint_url,
        body: {
            url: url,
            push_events: true
        },
        json: true
    }, function (err, response, body){
        if (err) return callback(err);
        if (response.status !== 201) return callback(response.status);

        return callback(null, true)
    });
}


function deleteHooks(config, repo_id, url, callback) {
    var qpm = { private_token: config.api_key },
        endpoint_url = config.api_url + "/projects/" + repo_id + "/hooks";

    // Fetch all webhooks from Gitlab
    request.get({
        url: endpoint_url + "?" + qs.stringify(qpm),
        json: true
    }, function(err, res){
        var deleted = false;

        async.each(res.body, function(hook, cb){
            // Remove all webhooks matching url
            if (hook.url == url){
                var hook_url = endpoint_url +"/"+ hook.id + "?" + qs.stringify(qpm);

                request.del(hook_url, function(err, res){
                    deleted = true;
                    cb(err);
                });
            } else cb();
        }, function(err){
            callback(err, deleted);
        });
    });
}
