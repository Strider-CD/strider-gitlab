'use strict';

const debug = require('debug')('strider-gitlab:webhooks');
const gravatar = require('gravatar');
const util = require('util');

module.exports = {
  receiveWebhook: receiveWebhook,
  pushJob: pushJob
};

function makeJob(project, config) {
  let deploy = false;
  const branch = project.branch(config.branch) || {active: true, mirror_master: true, deploy_on_green: false};

  if(!branch.active) return false;

  if(config.branch !== 'master' && branch.mirror_master) {
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
  const config = pushJob(payload);
  const lastCommit = payload.commits[payload.commits.length - 1];

  if(lastCommit.message.indexOf('[skip ci]') > -1) {
    return {skipCi: true};
  }

  const branch = project.branch(config.branch);
  let job;

  if(branch) {
    job = makeJob(project, config);
    if(job) return send(job);
  }

  return false;
}

// returns : {trigger, branch, deploy}
function pushJob(payload) {
  let branchname;
  const commit = payload.commits[payload.commits.length - 1];
  debug(`Commit data extracted from payload:${util.inspect(commit)}`);

  let trigger;
  let ref;

  if(payload.ref.indexOf('refs/heads/') === 0) {
    branchname = payload.ref.substring('refs/heads/'.length);
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
    type: 'commit',
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
  const payload = req.body;

  res.sendStatus(204);

  let result = startFromCommit(req.project, payload, sendJob);

  if(result && result.skipCi) {
    debug('Skipping commit due to [skip ci] tag');
  } else if(!result) {
    debug('webhook received, but no branches matched or branch is not active');
  }

  function sendJob(job) {
    emitter.emit('job.prepare', job);
    return true;
  }
}
