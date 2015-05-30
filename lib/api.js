var request = require('request'),
    qs = require('querystring'),
    _ = require('lodash'),
    async = require('async');

module.exports = {
    get: get,
    parseRepo: parseRepo,
    createHooks: createHooks,
    deleteHooks: deleteHooks,
    addDeployKey: addDeployKey,
    removeDeployKey: removeDeployKey
};


function get(config, uri, callback) {
    var qpm = {
            private_token: config.api_key,
            per_page: 100
        },
        glue = (~uri.indexOf('?')) ? "&" : "?",
        url = config.api_url + '/' + uri + glue + qs.stringify(qpm);

    request.get({
        url: url,
        json: true
    }, function(err, res) {
        if (err) {
            return callback(err);
        }
        
        if (res.statusCode !== 200) {
            return callback(new Error("Cannot access GitLab API. Please verify your private token. (Status:" + res.statusCode + ")"));
        }
        
        callback(undefined, res.body);
    });
}

function parseRepo(repo){
    return {
        id: repo.id,
        name: repo.path_with_namespace,
        display_name: repo.path_with_namespace,
        display_url: repo.web_url,
        group: repo.namespace.path,
        private: !repo.public,
        config: {
            auth: { type: 'ssh' },
            scm: 'git',
            url: repo.ssh_url_to_repo,
            owner: repo.owner,
            repo: repo.web_url,
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

function addDeployKey(config, repo_id, title, key, callback){
    var qpm = { private_token: config.api_key },
        endpoint_url = config.api_url + "/projects/" + repo_id + "/keys?" + qs.stringify(qpm);

    request.post({
        url: endpoint_url,
        body: {
            title: title,
            key: key
        },
        json: true
    }, function (err, response, body){
        if (err) return callback(err);
        if (response.status !== 201) return callback(response.status);

        return callback(null, true)
    });
}

function removeDeployKey(config, repo_id, title, callback){
    var qpm = { private_token: config.api_key },
        endpoint_url = config.api_url + "/projects/" + repo_id + "/keys";

    // Fetch all deploy keys from Gitlab
    request.get({
        url: endpoint_url + "?" + qs.stringify(qpm),
        json: true
    }, function(err, res){
        var deleted = false;

        async.each(res.body, function(key, cb){
            // Remove all webhooks matching url
            if (key.title == title){
                var deploy_key_url = endpoint_url +"/"+ key.id + "?" + qs.stringify(qpm);

                request.del(deploy_key_url, function(err, res){
                    deleted = true;
                    cb(err);
                });
            } else cb();
        }, function(err){
            callback(err, deleted);
        });
    });
}
