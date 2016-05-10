var _ = require('lodash');
var async = require('async');
var superagent = require('superagent');
var debug = require('debug')('strider-gitlab:api');
var util = require('util');
var parseLinkHeader = require('parse-link-header');

module.exports = {
  get: get,
  parseRepo: parseRepo,
  createHooks: createHooks,
  deleteHooks: deleteHooks,
  addDeployKey: addDeployKey,
  removeDeployKey: removeDeployKey
};

/**
 * Retrieve a file from a GitLab repository, using the GitLab API.
 * @param {Object} config The configuration of the GitLab provider plugin.
 * @param {String} uri The URI of the file to retrieve.
 * @param {Function} done A function to call, once a result is available.
 */
function get(config, uri, done) {
  // If the configuration has no GitLab API URL, bail.
  if (!config.api_url) {
    return done(new Error('API URL missing from GitLab provider configuration!'));
  }
  // Append a slash to the URL if there isn't one.
  var apiBase = config.api_url;
  if (!/\/$/.test(apiBase)) {
    apiBase += '/';
  }
  // Construct the complete request URL
  var url = apiBase + uri;
  superagent
    .get(url)
    .query({
      private_token: config.api_key,
      per_page: 100
    })
    .set('User-Agent', 'StriderCD (http://stridercd.com)')
    .end(function (error, res) {
      res = res || {};

      if (error) {
        return done(error, null, null);
      }

      debug('Response body type: ' + typeof res.body);
      debug('Response body received: ' + util.inspect(res.body, false, 10, true));
      if (res.error) {
        return done(res.error, null, res);
      }
      if (!res.body) {
        return done(undefined, res.body, res);
      }

      var results = res.body;

      if (res.headers.link) {
        var numberOfPages = parseLinkHeader(res.headers.link).last.page;
        var i = 1;

        async.whilst(
          function() {
            return i < numberOfPages;
          },
          function(callback) {
            i++;
            superagent
              .get(url)
              .query({
                private_token: config.api_key,
                per_page: 100,
                page: i
              })
              .set('User-Agent', 'StriderCD (http://stridercd.com)')
              .end(function(err1, res) {
                if (err1) return callback(err1);

                results = results.concat(res.body);
                callback(null, i);
              });
          },
          function(err, n) {
            if(err) return done(err);

            return done(null, results, res);
          }
        );
      } else {
        return done(null, results, res);
      }
    });
}

function parseRepo(repo) {
  return {
    id: repo.id,
    name: repo.path_with_namespace,
    display_name: repo.path_with_namespace,
    display_url: repo.web_url,
    group: repo.namespace.path,
    private: !repo.public,
    config: {
      auth: {type: 'ssh'},
      scm: 'git',
      url: repo.ssh_url_to_repo,
      owner: repo.owner,
      repo: repo.web_url,
      pull_requests: 'none',
      whitelist: []
    }
  };
}

function createHooks(config, repo_id, url, callback) {
  var qpm = {private_token: config.api_key};
  var endpoint_url = config.api_url + '/projects/' + repo_id + '/hooks';

  superagent
    .post(endpoint_url)
    .query(qpm)
    .send({
      url: url,
      push_events: true
    })
    .set('User-Agent', 'StriderCD (http://stridercd.com)')
    .end(function (err, res) {
      if (err) return callback(err);
      if (res && res.status !== 201) return callback(res.status);

      return callback(null, true);
    });
}

function deleteHooks(config, repo_id, url, callback) {
  var qpm = {private_token: config.api_key};
  var endpoint_url = config.api_url + "/projects/" + repo_id + "/hooks";

  // Fetch all webhooks from Gitlab
  superagent
    .get(endpoint_url)
    .query(qpm)
    .set('User-Agent', 'StriderCD (http://stridercd.com)')
    .end(function (err, res) {
      var deleted = false;

      if (err) {
        return callback(err);
      }

      if (!res) {
        return callback(new Error("Empty response."));
      }

      async.each(res.body, function (hook, cb) {
        // Remove all webhooks matching url
        if (hook.url == url) {
          var hook_url = endpoint_url + "/" + hook.id;

          superagent
            .del(hook_url)
            .query(qpm)
            .end(function (err, res) {
              deleted = true;
              cb(err);
            });
        } else cb();
      }, function (err) {
        callback(err, deleted);
      });
    });
}

function addDeployKey(config, repo_id, title, key, callback) {
  var qpm = {private_token: config.api_key};
  var endpoint_url = config.api_url + '/projects/' + repo_id + '/keys';

  superagent
    .post(endpoint_url)
    .query(qpm)
    .send({
      title: title,
      key: key
    })
    .set('User-Agent', 'StriderCD (http://stridercd.com)')
    .end(function (err, res) {
      if (err) return callback(err);
      if (res && res.status !== 201) return callback(res.status);

      return callback(null, true);
    });
}

function removeDeployKey(config, repo_id, title, callback) {
  var qpm = {private_token: config.api_key};
  var endpoint_url = config.api_url + '/projects/' + repo_id + '/keys';

  // Fetch all deploy keys from Gitlab
  superagent
    .get(endpoint_url)
    .query(qpm)
    .set('User-Agent', 'StriderCD (http://stridercd.com)')
    .end(function (err, res) {

      if (err) {
        return callback(err);
      }

      var deleted = false;

      if (!res) {
        return callback(new Error("Empty response."));
      }

      async.each(res.body, function (key, cb) {
        // Remove all webhooks matching url
        if (key.title == title) {
          var deploy_key_url = endpoint_url + '/' + key.id;

          superagent
            .del(deploy_key_url)
            .query(qpm)
            .end(function (err, res) {
              deleted = true;
              cb(err);
            });
        } else cb();
      }, function (err) {
        callback(err, deleted);
      });
    });
}
