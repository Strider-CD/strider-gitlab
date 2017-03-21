/*

 Used to test the gitlab API wrapper

 nock will simulate a gitlab server running at
 localhost:80, where Strider Tester, a user is
 registered with the name "stridertester", and
 has been registered with api token - zRtVsmeznn7ySatTrnrp
 stridertester is an "owner" of a group named "testunion"
 and has admin access to three projects -
 testunion / unionproject1
 Strider Tester / pubproject1
 Strider Tester / privproject1
 */


const expect = require('expect.js');
const api = require('../lib/api');
let util = require('util');
let debug = require('debug')('strider-gitlab:test:api');
const nock = require('nock');

const correctConfig = {
  api_key: 'zRtVsmeznn7ySatTrnrp',
  api_url: 'http://localhost:80/api/v3'
};

const wrongCredentialsConfig = {
  api_key: 'zRtVsmeznn7ySatTrnra',
  api_url: 'http://localhost:80/api/v3'
};

const invalidServerNameConfig = {
  api_key: 'zRtVsmeznn7ySatTrnrp',
  api_url: 'http://localghost:80/api/v3'
};

const configWithoutApiUrl = {api_key: 'zRtVsmeznn7ySatTrnrp'};

const configWithoutApiKey = {
  api_url: 'http://localhost:80/api/v3'
};

const correctDeployKey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDAMoSHhKfeE3/oXanAQEZO0Sq20SMjvjmJlTy+CaGz/1uk+glLXi9u2RKtfPRZDceAgyEtRUpqya9Uo1v9bjkIckGLhQwXdSo2G6O3QuzpE3gc6AXTDPQ0ZkkXbSdU9VGL1Zzr+maBnvfwK6IlsNz3fLa4lNV7vz1LaGCg9D1jP+nufZjuDiCAno7D607oG1iHQ3x/BqzphUATav3DFQFT2FBmmittQT0l0mMJ4XsQCQXkwNbDjkLYNon8FYPm9U3AOlzicOGteebt5mhsQtfl9+lL99B8+fk8b24pEEbOxZ4l0HcwMI1R5OLoTzPwSvVw+bp3YPhH2IzfFwK5NUk7 stridertester/privproject1-stridertester@gmail.com\n";

describe('gitlab api', function() {
  before('Setup the mock gitlab server', function setupNock() {
    nock.cleanAll();
    require('./mocks/gitlab_get.js')();
    require('./mocks/gitlab_add_key.js')();
  });

  after('Tear down mock Gitlab server', function tearDownNock() {
    nock.cleanAll();
  });

  //--------------------------------------------------------------------------------------
  describe('get', function() {
    it('should get a list of projects', function(done) {
      api.get(correctConfig, 'projects', function(err, body, res) {
        expect(err).to.not.be.ok();
        expect(body).to.be.an(Array);
        done();
      });
    });

    it('should return an error if a non existent path is asked for', function(done) {

      const wrongPath = 'nonexistentpath';

      api.get(correctConfig, wrongPath, function(err, body, res) {
        expect(err).to.be.ok();
        expect(err).to.be.an(Error);
        expect(err.status).to.eql('404');
        done();
      });
    });

    it('should return a 401 error if incorrect credentials are specified', function(done) {
      api.get(wrongCredentialsConfig, 'projects', function(err, body, res) {
        expect(err).to.be.ok();
        expect(err).to.be.an(Error);
        expect(err.status).to.eql('401');
        done();
      });
    });

    it('should return an error if the specified gitlab server IP cannot be resolved from the name', function(done) {
      api.get(invalidServerNameConfig, 'projects', function(err, body, res) {
        expect(err).to.be.ok();
        expect(err).to.be.an(Error);
        done();
      });
    });

    it('should return an error if the config passed in to it does not have a Gitlab API url', function(done) {
      const config = {api_key: 'zRtVsmeznn7ySatTrnrp'};
      api.get(config, 'projects', function(err, body, res) {
        expect(err).to.be.ok();
        expect(err).to.be.an(Error);
        done();
      });
    });

    it('should invoke our callback with the first parameter as undefined if the Gitlab server responds with a falsy value for res.body');
  });

  //--------------------------------------------------------------------------------------
  describe('parseRepo', function() {
    it('should correctly parse repo information as received from gitlab server into a repo object');
    it('should throw an error if it gets an empty parameter as repo ?');
    it('should throw an error if repo.id is absent ?');
    it('should throw an error if repo.path_with_namespace is absent ?');
    it('should throw an error if repo.web_url is absent ?');
    it('should throw an error if repo.public is absent ?');
    it('should throw an error if repo.ssh_url_to_repo is absent ?');
    it('should throw an error if repo.owner is absent ?');
    it('should throw an error if repo.web_url is absent ?');

    /*
     return {
     83     id: repo.id,
     84     name: repo.path_with_namespace,
     85     display_name: repo.path_with_namespace,
     86     display_url: repo.web_url,
     87     group: repo.namespace.path,
     88     private: !repo.public,
     89     config: {
     90       auth: {type: 'ssh'},
     91       scm: 'git',
     92       url: repo.ssh_url_to_repo,
     93       owner: repo.owner,
     94       repo: repo.web_url,
     95       pull_requests: 'none',
     96       whitelist: []
     97     }
     */
  });

  //--------------------------------------------------------------------------------------
  describe('addDeployKey', function() {
    it('should return an error if any of its expected arguments are absent');

    it('should invoke our callback with err as null and the second parameter as true, when given correct parameters', function(done) {
      api.addDeployKey(correctConfig, 5, 'strider-stridertester/privproject1', correctDeployKey, function(err, secondParam) {
        expect(err).to.not.be.ok();
        expect(secondParam).to.be.ok();
        done();
      });
    });

    it('should give an error if invalid data is sent as an ssh key', function(done) {
      api.addDeployKey(correctConfig, 5, 'strider-stridertester/privproject1', "invalid-key", function(err, secondParam) {
        //debug("Err is: " + util.inspect(err, false, 10, true));
        expect(err).to.be.ok();
        done();
      });
    });

    it('should give an error if incorrect credentials are passed to it', function(done) {
      api.addDeployKey(wrongCredentialsConfig, 5, 'strider-stridertester/privproject1', correctDeployKey, function(err, secondParam) {
        //debug("Err is: " + util.inspect(err, false, 10, true));
        expect(err).to.be.ok();
        done();
      });
    });

    it('should return an error if the specified gitlab server IP cannot be resolved from the name', function(done) {
      api.addDeployKey(invalidServerNameConfig, 5, 'strider-stridertester/privproject1', correctDeployKey, function(err, secondParam) {
        expect(err).to.be.ok();
        expect(err).to.be.an(Error);
        done();
      });
    });

    it('should return an error if the config passed in to it does not have a Gitlab API url', function(done) {
      const config = {api_key: 'zRtVsmeznn7ySatTrnrp'};
      api.addDeployKey(config, 5, 'strider-stridertester/privproject1', correctDeployKey, function(err, secondParam) {
        expect(err).to.be.ok();
        expect(err).to.be.an(Error);
        done();
      });
    });

    it('should give an error if invalid repo id is passed to it', function(done) {
      api.addDeployKey(correctConfig, "wrong repo id", 'strider-stridertester/privproject1', correctDeployKey, function(err, secondParam) {
        //debug("Err is: " + util.inspect(err, false, 10, true));
        expect(err).to.be.ok();
        done();
      });
    });
  });

  //--------------------------------------------------------------------------------------
  describe('removeDeployKey - when key is registered with the server', function() {
    before('Setup the mock gitlab server', function setupNock() {
      nock.cleanAll();
      require('./mocks/gitlab_delete_project.js')();
    });

    after('Tear down mock Gitlab server', function tearDownNock() {
      nock.cleanAll();
    });

    it('should return an error if any of its expected arguments are absent');

    it('should delete a key and invoke our callback with err as null and wasDeleted as true when given correct parameters', function(done) {
      api.removeDeployKey(correctConfig, 5, 'strider-stridertester/privproject1', function(err, wasDeleted) {
        //debug("Err is: " + util.inspect(err, false, 10, true));
        //debug("Err is: " + err);
        //debug("wasDeleted is: " + wasDeleted);
        expect(err).to.not.be.ok();
        expect(wasDeleted).to.be.ok();
        done();
      });
    });

    it('should return an error if wrong credentials are given', function(done) {
      api.removeDeployKey(wrongCredentialsConfig, 5, 'strider-stridertester/privproject1', function(err, wasDeleted) {
        //debug("Err is: " + util.inspect(err, false, 10, true));
        //debug("Err is: " + err);
        expect(err).to.be.ok();
        expect(err).to.be.an(Error);
        done();
      });
    });

    it('should return an error if the config passed in to it does not have a Gitlab API url', function(done) {
      api.removeDeployKey(configWithoutApiUrl, 5, 'strider-stridertester/privproject1', function(err, wasDeleted) {
        //debug("Err is: " + util.inspect(err, false, 10, true));
        //debug("Err is: " + err);
        expect(err).to.be.ok();
        expect(err).to.be.an(Error);
        done();
      });
    });

    it('should return an error if the specified gitlab server IP cannot be resolved from the name', function(done) {
      api.removeDeployKey(invalidServerNameConfig, 5, 'strider-stridertester/privproject1', function(err, wasDeleted) {
        //Currently due to an issue with nock/superagent interaction we get a TypeError thrown instead of ENOTFOUND
        //https://github.com/pgte/nock/issues/211#issuecomment-133636234
        //debug("Err is: " + util.inspect(err, false, 10, true));
        //debug("Err is: " + err.stack);
        expect(err).to.be.ok();
        expect(err).to.be.an(Error);
        done();
      });
    });

    it('should give an error if invalid repo id is passed to it', function(done) {
      api.removeDeployKey(correctConfig, "wrong repo id", 'strider-stridertester/privproject1', function(err, secondParam) {
        //debug("Err is: " + err);
        //debug("Err is: " + util.inspect(err, false, 10, true));
        expect(err).to.be.ok();
        done();
      });
    });
  });

  describe('removeDeployKey - when key is not registered in the gitlab server', function() {
    before('Setup the mock gitlab server', function setupNock() {
      nock.cleanAll();
      require('./mocks/gitlab_delete_key_when_absent.js')();
    });

    after('Tear down mock Gitlab server', function tearDownNock() {
      nock.cleanAll();
    });

    it('should callback with err as null and wasDeleted as false', function(done) {
      api.removeDeployKey(correctConfig, 5, 'strider-stridertester/privproject1', function(err, wasDeleted) {
        //debug("Err is: " + util.inspect(err, false, 10, true));
        //debug("wasDeleted is: " + wasDeleted);
        expect(err).to.not.be.ok();
        expect(wasDeleted).to.not.be.ok();
        done();
      });
    });
  });

  //--------------------------------------------------------------------------------------
  describe('createHooks', function() {
    //takes parameters config, repo_id, url and callback

    beforeEach('Setup the mock gitlab server for creating hooks', function setupNock() {
      nock.cleanAll();
      require('./mocks/gitlab_create_hooks.js')();
    });

    afterEach('Tear down mock Gitlab server', function tearDownNock() {
      nock.cleanAll();
    });


    it('should return true as the second parameter and err as false if hooks were created successfully', function(done) {
      api.createHooks(correctConfig, '5', 'http://localhost:3000/stridertester/privproject1/api/gitlab/webhook', function(err, couldCreateHooks) {
        //debug("error: " + err + " couldCreateHooks: " + couldCreateHooks);
        expect(err).to.not.be.ok();
        expect(couldCreateHooks).to.be.ok();
        done();
      });
    });//NOTE: if the webhook has already been created, gitlab creates a new one with an incremented ID

    it('should callback with an error if config does not have an api_url', function(done) {
      api.createHooks(configWithoutApiUrl, '5', 'http://localhost:3000/stridertester/privproject1/api/gitlab/webhook', function(err, couldCreateHooks) {
        expect(err).to.be.ok();
        done();
      });
    });

    it('should callback with an error if config does not have an api_key', function(done) {
      api.createHooks(configWithoutApiKey, '5', 'http://localhost:3000/stridertester/privproject1/api/gitlab/webhook', function(err, couldCreateHooks) {
        expect(err).to.be.ok();
        done();
      });
    });

    it('should callback with an error if invalid credentials were specified', function(done) {
      api.createHooks(wrongCredentialsConfig, '5', 'http://localhost:3000/stridertester/privproject1/api/gitlab/webhook', function(err, couldCreateHooks) {
        expect(err).to.be.ok();
        done();
      });
    });


    it('should callback with an error if an invalid repo_id was specified', function(done) {
      api.createHooks(correctConfig, 'invalid-repo', 'http://localhost:3000/stridertester/privproject1/api/gitlab/webhook', function(err, couldCreateHooks) {
        expect(err).to.be.ok();
        done();
      });
    });

    it('should callback with a 400 error if the URL parameter is not a string', function(done) {
      api.createHooks(correctConfig, '5', false, function(err, couldCreateHooks) {
        expect(err).to.be.ok();
        done();
      });
    });

    it('should callback with an error if the gitlab server cannot be reached or resolved', function(done) {
      api.createHooks(invalidServerNameConfig, '5', false, function(err, couldCreateHooks) {
        expect(err).to.be.ok();
        done();
      });
    });
  });

  //--------------------------------------------------------------------------------------
  describe('deleteHooks - when hook has been registered', function() {
    before('Setup the mock gitlab server', function setupNock() {
      nock.cleanAll();
      require('./mocks/gitlab_delete_hooks_when_present.js')();
    });

    after('Tear down mock Gitlab server', function tearDownNock() {
      nock.cleanAll();
    });


    it('should call our callback with second param as true and err as null if hooks were successfully deleted', function(done) {
      api.deleteHooks(correctConfig, '5', 'http://localhost:3000/stridertester/privproject1/api/gitlab/webhook', function(err, wasDeleted) {
        expect(err).to.not.be.ok();
        expect(wasDeleted).to.be.ok();
        done();
      });
    });

    it('should callback with an error if config does not have an api_url', function(done) {
      api.deleteHooks(configWithoutApiUrl, '5', 'http://localhost:3000/stridertester/privproject1/api/gitlab/webhook', function(err, wasDeleted) {
        //debug('Error is ' + util.inspect(err, false, null, true));
        expect(err).to.be.ok();
        done();
      });
    });

    it('should callback with an error if config does not have an api_key', function(done) {
      api.deleteHooks(configWithoutApiKey, '5', 'http://localhost:3000/stridertester/privproject1/api/gitlab/webhook', function(err, wasDeleted) {
        expect(err).to.be.ok();
        done();
      });
    });

    it('should callback with an error if invalid credentials were specified', function(done) {
      api.deleteHooks(wrongCredentialsConfig, '5', 'http://localhost:3000/stridertester/privproject1/api/gitlab/webhook', function(err, wasDeleted) {
        expect(err).to.be.ok();
        done();
      });
    });


    it('should callback with an error if an invalid repo_id was specified', function(done) {
      api.deleteHooks(correctConfig, 'invalid-repo', 'http://localhost:3000/stridertester/privproject1/api/gitlab/webhook', function(err, wasDeleted) {
        expect(err).to.be.ok();
        done();
      });
    });


    it('should callback with an error if the gitlab server cannot be reached', function(done) {
      api.deleteHooks(invalidServerNameConfig, '5', 'http://localhost:3000/stridertester/privproject1/api/gitlab/webhook', function(err, wasDeleted) {
        expect(err).to.be.ok();
        done();
      });
    });
  });

  //--------------------------------------------------------------------------------------
  describe('deleteHooks - when hook has not been registered', function() {
    before('Setup the mock gitlab server', function setupNock() {
      nock.cleanAll();
      require('./mocks/gitlab_delete_hooks_when_absent.js')();
    });

    after('Tear down mock Gitlab server', function tearDownNock() {
      nock.cleanAll();
    });

    it('should callback with err as null and wasDeleted as false', function(done) {
      api.deleteHooks(correctConfig, 5, 'strider-stridertester/privproject1', function(err, wasDeleted) {
        //debug("Err is: " + util.inspect(err, false, 10, true));
        //debug("wasDeleted is: " + wasDeleted);
        expect(err).to.not.be.ok();
        expect(wasDeleted).to.not.be.ok();
        done();
      });
    });
  });
});
