var _ = require('lodash');
var gravatar = require('gravatar');

module.exports = {
  receiveWebhook: receiveWebhook,
  pushJob: pushJob
};

function makeJob(project, config) {
  var deploy = false,
    branch = project.branch(config.branch) || {active: true, mirror_master: true, deploy_on_green: false};

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
  var commit = payload.commits[payload.commits.length - 1];
  var trigger;
  var ref;

  if (payload.ref.indexOf('refs/heads/') === 0) {
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
  }
}

function receiveWebhook(emitter, req, res) {
  var payload = req.body;

  res.sendStatus(204);

  startFromCommit(req.project, payload, sendJob);

  function sendJob(job) {
    emitter.emit('job.prepare', job)
  }
}
