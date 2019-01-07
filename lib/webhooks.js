'use strict';

var debug = require('debug')('strider-gitlab:webhooks');
var gravatar = require('gravatar');

module.exports = {
  receiveWebhook: receiveWebhook,
  pushJob: pushJob
};

function makeJob(project, config) {
  var deploy = false;
  var branch = project.branch(config.branch) || {active: true, mirror_master: true, deploy_on_green: false};

  if (!branch.active) return false;

  if (config.branch !== 'master' && branch.mirror_master) {
    // mirror_master branches don't deploy
    deploy = false;
  } else {
    deploy = config.deploy && branch.deploy_on_green;
  }

  return {
    type: deploy ? 'TEST_AND_DEPLOY' : 'TEST_ONLY',
    trigger: config.trigger,
    project: project.name,
    ref: config.ref,
    plugin_data: config.plugin_data || {},
    user_id: project.creator._id,
    created: new Date()
  };
}

function startFromCommit(project, payload, send) {
  var config = pushJob(payload);
  if (payload.commits) {
    var lastCommit = payload.commits[payload.commits.length - 1];

    if (lastCommit.message.indexOf('[skip ci]') > -1) {
      return { skipCi: true };
    }
  } else if (payload.after) {
    if (/^0+$/.test(payload.after)) {
      return { deleteTag: true };
    }
  }

  var branch = project.branch(config.branch);
  var job;

  if (branch) {
    job = makeJob(project, config);
    if (job) return send(job);
  }

  return false;
}

// returns : {trigger, branch, deploy}
function pushJob(payload) {
  var branchname;
  var trigger;
  var ref;
  var commit;
  var isTagPush = false;

  if (payload.commits) {
    commit = payload.commits[payload.commits.length - 1];
  } else if (payload.user_name) {
    commit = {
      url: `${payload.repository.homepage}/commit/${payload.after}`,
      message: 'tag push',
      timestamp: (new Date()).toISOString(),
      author: {
        name: payload.user_name,
        email: undefined,
        image: '',
      }
    };
  }

  if (payload.ref.indexOf('refs/heads/') === 0) {
    branchname = payload.ref.substring('refs/heads/'.length);
    ref = {
      branch: branchname,
      id: payload.after
    };
  } else if (payload.ref.indexOf('refs/tags/') === 0) {
    isTagPush = true;
    branchname = payload.ref.substring('refs/tags/'.length);
    ref = {
      branch: branchname,
      id: payload.after
    };
  } else {
    ref = {
      fetch: payload.ref
    };
  }

  trigger = {
    type: isTagPush ? 'tag push' : 'commit',
    author: {
      name: commit.author.name,
      username: commit.author.username,
      email: commit.author.email,
      image: gravatar.url(commit.author.email, {}, true)
    },
    url: commit.url,
    message: commit.message,
    timestamp: commit.timestamp,
    source: {
      type: 'plugin',
      plugin: 'gitlab'
    }
  };

  return {
    branch: branchname,
    trigger: trigger,
    deploy: true,
    ref: ref
  };
}

function receiveWebhook(emitter, req, res) {
  var payload = req.body;

  res.sendStatus(204);

  var result = startFromCommit(req.project, payload, sendJob);

  if (result && result.skipCi) {
    debug('Skipping commit due to [skip ci] tag');
  } else if (result && result.deleteTag) {
    debug('Skipping push due to delete tag event');
  } else if (!result) {
    debug('webhook received, but no branches matched or branch is not active');
  }

  function sendJob(job) {
    emitter.emit('job.prepare', job);
    return true;
  }
}
