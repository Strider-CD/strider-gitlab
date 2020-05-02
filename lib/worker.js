'use strict';

const git = require('strider-git/worker');

module.exports = {
  init: (dirs, account, config, job, done) => {
    return done(null, {
      config: config,
      account: account,
      fetch: (context, done) => {
        module.exports.fetch(dirs.data, account, config, job, context, done);
      },
    });
  },
  fetch: (dest, account, config, job, context, done) => {
    if (config.auth.type === 'https' && !config.auth.username) {
      config.auth.username = account.accessToken;
      config.auth.password = '';
    }

    git.fetch(dest, config, job, context, done);
  },
};
