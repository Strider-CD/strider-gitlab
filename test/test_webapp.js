/*
 Used to test the gitlab webapp

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

var expect = require('expect.js');
var webapp = require('../lib/webapp');
var util = require('util');
var debug = require('debug')('strider-gitlab:test:webapp');
var nock = require('nock');

//TODO: The following two functions should probably be put in a utilities package
var inspect = function inspect(string, object) {
  //util.inspect params - object, showHiddenProperties, levels to recurse, colorize output
  debug(string, util.inspect(object, false, 10, true));
};

function deepClone(sourceObject) {
  return JSON.parse(JSON.stringify(sourceObject));
}

var wrongCredentialsConfig = {
  api_url: 'http://localhost:80/api/v3',
  api_key: 'badkey'
};

var providerConfig = {
  whitelist: [],
  pull_requests: 'none',
  repo: 'http://nodev/stridertester/privproject1',
  owner: {
    avatar_url: 'http://www.gravatar.com/avatar/3f671ed86ed3d21ed3640c7a016b0997?s=40&d=identicon',
    state: 'active',
    id: 3,
    username: 'stridertester',
    name: 'Strider Tester'
  },
  url: 'git@nodev:stridertester/privproject1.git',
  scm: 'git',
  auth: {type: 'ssh'}
};

var repoProject = {
  name: 'stridertester/privproject1',
  display_name: 'stridertester/privproject1',
  display_url: 'http://nodev/stridertester/privproject1',
  public: false,
  prefetch_config: true,
  creator: "55d2ecb5edb0d634165eac37",
  provider: {
    id: 'gitlab',
    account: '0',
    repo_id: '5',
    config: {
      auth: {type: 'ssh'},
      scm: 'git',
      url: 'git@nodev:stridertester/privproject1.git',
      owner: {
        name: 'Strider Tester',
        username: 'stridertester',
        id: 3,
        state: 'active',
        avatar_url: 'http://www.gravatar.com/avatar/3f671ed86ed3d21ed3640c7a016b0997?s=40&d=identicon'
      },
      repo: 'http://nodev/stridertester/privproject1',
      pull_requests: 'none',
      whitelist: []
    }
  },
  branches: [{
    name: 'master',
    active: true,
    mirror_master: false,
    deploy_on_green: true,
    pubkey: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1j1c3wNyUwFzIhU5ELZb6tH1K+TkQgV0CrYjRvWmeZZr5aNKehSo5ntCoPtjZOddD2qYOUNyqe0EkdsSa7JeuD0blk5T9V8EADxqSmfYE8qD3Ch1JN0T4gbxoH20N45gqfpzug04FNwaDvCoxJgKvJXNj141SRLVVsa3DlByqC1Il+6TS7LqsQQMnSahgdx6fOUSLzSRG5NmbHGnS4CA1W4zyqQKzznh/Qj9WLxQKxugly3PPWtlcCDoaFBBQSOIgGVs00Bd3X8DJW/3gNPfydtUAdm/BcDZHOLyBUNOQCjR/fGyLS8D4ufYt6vr72No9O0dyKyI+FpOb+jPDG631 stridertester/privproject1-stridertester@gmail.com\n',
    privkey: '-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEAtY9XN8DclMBcyIVORC2W+rR9Svk5EIFdAq2I0b1pnmWa+WjS\nnoUqOZ7QqD7Y2TnXQ9qmDlDcqntBJHbEmuyXrg9G5ZOU/VfBAA8akpn2BPKg9wod\nSTdE+IG8aB9tDeOYKn6c7oNOBTcGg7wqMSYCryVzY9eNUkS1VbGtw5QcqgtSJfuk\n0uy6rEEDJ0moYHcenzlEi80kRuTZmxxp0uAgNVuM8qkCs854f0I/Vi8UCsboJctz\nz1rZXAg6GhQQUEjiIBlbNNAXd1/AyVv94DT38nbVAHZvwXA2Rzi8gVDTkAo0f3xs\ni0vA+Ln2Ler6+9jaPTtHcisiPhaTm/ozwxut9QIDAQABAoIBAGbtMPOheSs29iKT\nN/B8q+fKpHD5YnlR7QmUmUjWCWdLkJSt8SD+uxZZS07l+gcDvF5yOMtK2h4nq6Fh\nV0nAsKhzbqy9gqwwsHA5H8ZWU9swNUJ3UGzuUUJUQhwBHNDP4rbMemjYtUVNkXrj\nFEQymTjzkTvbufkWjHpdNPX4JFvdBGKJID9Orfq53TV/tKWQ4cuk9y6L3WcHojPo\nTx6iKc7n6GEH3OYaUeuF0LfbZGGrSO04EB0gsq/kjtjPzmTH5kVG8haVZBhbjETW\nrFQPTWfshSx6za3ecMGfvlC7Jb5JBZ7BknTHHytAGuPK0W08K9yBfkrTmhMUiEyD\nMDO7oU0CgYEA4ofELHIt7/V/YKFyCU4v7DkrCJdOcTnLHpOlMm2e3NZInGZdDp8+\n6XFKRKlk/Vv7NZg5m/liPhBRGZalWTT5x20VyTNxVN0WudjPTGbl/Q6l9nG1cu5V\nNtxX5G3o8eOcSQaiTY8IVEN96ApuYhnh2u+463WSaWc5U53Oh+0V4kcCgYEAzS3n\n9o1qmkc+KLmjYI19M5gN3sW1ZyIYa3f0i9FCqnAaKKoBrNVjSaQ5Hp/jyAc1hDtq\nS/HwztUDJNvVB5/IRacpMklrh8ReF/2kTHgM1ChCTkdsoIQOw04Sp8VJLK4ECswn\n7R+17Ff4hW0nffYfQeMeXCZd99HrbYgH564PL+MCgYBzNLzuJbt7GA2J5VGLrfnt\nVz2thtXb+5pzmH8hYGK0yT3wXJbjAtYJ/xXYSZYUzBy8KwjRbEksazvzmYvKDIkj\nhTTZOJJgqHgQWFVE8+fvhO2eokG3i8JGvlTs1YDs0+b9tKQCccW4pQJ5aiStO6CD\nqfsPtKGbfWXIQq9wrYC9rQKBgGUx5f0pJFGxH4wwes7NGdoPfY/JDT4vh8HBaQBo\nliu/nHc/2hGnMRAKCg37p/lo7NEqCLQqQK2SS7mrHrdi7ADGgEAIDBvrEslcVONO\nNm2Q6Zr4CTBl0W4sHHFYkU2TCfVVWb/O6wgFH1KXUmoCsMnrPXcPiTsH8siT1epD\nY8QnAoGAYhPbK1k6sH8bTdU6hI3TtaSZ1MOMDO2eeB0u2dpQSOiQ5a33vLM9AN2s\nHQfwA6yNn9oPf3BnJBOGxpX6W/L3ntYOVp4T/18LCZOX8f9GFwUrAAtbH52YgP/3\njveYyVbjAOkSohdCd2UhiJWoQVHcGGHrkX/bKFfyVYUlKrKpVag=\n-----END RSA PRIVATE KEY-----\n',
    plugins: [
      {
        id: 'node',
        enabled: true,
        config: {
          fork: 'Node.js',
          runtime: 'whatever',
          caching: 'none',
          test: 'npm test',
          globals: []
        }
      }],
    runner: {
      id: 'simple-runner',
      config: {pty: false}
    }
  },
    {name: '*', mirror_master: true}
  ]
};

var projectWithInvalidRepoID = deepClone(repoProject);
projectWithInvalidRepoID.provider.repo_id = "invalidrepo";

var projectWithInvalidSSHKey = deepClone(repoProject);
projectWithInvalidSSHKey.branches[0].pubkey = "invalid key";

var projectWithInvalidName = deepClone(repoProject);
projectWithInvalidName.name = "nonexistentproject";

describe('gitlab webapp', function () {
  //--------------------------------------------------------------------------------------
  //Test getting a json file
  describe('getFile', function () {
    before('Setup the mock gitlab server', function setupNock() {
      nock.cleanAll();
      nock.disableNetConnect();
      require('./mocks/gitlab_webapp_getfile.js')();
    });

    after('Tear down mock Gitlab server', function tearDownNock() {
      nock.cleanAll();
    });


    it('should get a json file correctly', function (done) {
      var filename = "strider.json";

      var ref = {
        branch: 'master',
      };

      //getFile only uses account.config
      var account = {
        config: {
          api_key: 'zRtVsmeznn7ySatTrnrp',
          api_url: 'http://localhost:80/api/v3'
        }
      };


      //getFile only uses project.provider.repo_id
      var project = {
        provider: {
          repo_id: '5',
        }
      }

      webapp.getFile(filename, ref, account, providerConfig, project, function (err, text) {
        expect(text).to.be.a('string');
        done();
      });
    });
  });

  //--------------------------------------------------------------------------------------
  //Test getting branches from a repository
  describe('getBranches', function () {
    //takes parameters - account, config, project

    /*
     NOTE: the account argument in this function is DIFFERENT from
     the account argument passed in to webapp.getFile. Here we get passed what is
     known elsewhere (in the api tests) to be a config object (i.e. one with
     two properties - api_url and api_key. Also note that in the webapp file, config
     is used to refer to an object of type project.provider.config
     */
    var account = {
      api_url: 'http://localhost:80/api/v3',
      api_key: 'zRtVsmeznn7ySatTrnrp'
    };


    var invalidAccount = {
      api_url: 'http://localhost:80/api/v3',
      api_key: 'badkey'
    };

    //getBranches only uses project.provider.repo_id
    var project = {
      provider: {
        repo_id: '5',
      }
    };

    var invalidProject = {
      provider: {
        repo_id: 'invalidrepo',
      }
    };

    before('Setup the mock gitlab server', function setupNock() {
      nock.cleanAll();
      nock.disableNetConnect();
      require('./mocks/gitlab_webapp_getbranches.js')();
    });

    after('Tear down mock Gitlab server', function tearDownNock() {
      nock.cleanAll();
    });

    it('should get a correct list of branches in the project', function (done) {
      webapp.getBranches(account, providerConfig, project, function (err, branches) {
        //debug("Branches we get are: " + Object.prototype.toString.call(branches) + "Inspected: " + util.inspect(branches, false, null, true));
        expect(branches).to.be.an('array');
        expect(branches).to.eql(['firstbranch', 'master']);
        done();
      });
    });

    it('should complain suitably if account data is empty', function (done) {
      webapp.getBranches({}, providerConfig, project, function (err, branches) {
        //debug("Branches we get are: " + Object.prototype.toString.call(branches) + "Inspected: " + util.inspect(branches, false, null, true));
        //debug("We get ERR as: " + util.inspect(err, false, null, true));
        expect(err).to.be.ok();
        done();
      });
    });

    it('should complain suitably if account data is invalid', function (done) {
      webapp.getBranches(invalidAccount, providerConfig, project, function (err, branches) {
        //debug("We get ERR as: " + err);
        expect(err).to.be.ok();
        done();
      });
    });

    it('should complain suitably if project.provider.repo_id is invalid', function (done) {
      webapp.getBranches(account, providerConfig, invalidProject, function (err, branches) {
        //debug("We get ERR as: " + util.inspect(err, false, null, true));
        expect(err).to.be.ok();
        done();
      });
    });
  });

  //--------------------------------------------------------------------------------------
  describe('listRepos', function () {
    //takes parameters - config, callback

    //NOTE: what listRepos expects as config, is called account elsewhere in webapp.js
    var config = {
      api_url: 'http://localhost:80/api/v3',
      api_key: 'zRtVsmeznn7ySatTrnrp'
    };


    before('Setup the mock gitlab server', function setupNock() {
      nock.cleanAll();
      nock.disableNetConnect();
      require('./mocks/gitlab_webapp_listrepos.js')();
    });

    after('Tear down mock Gitlab server', function tearDownNock() {
      nock.cleanAll();
    });

    it('should get a list of repositories accessible to the user correctly', function (done) {
      webapp.listRepos(config, function (err, repos) {
        expect(err).to.not.be.ok();
        expect(repos).to.be.an('array');
        expect(repos.length).to.eql(3);
        done();
      });
    });

    it('should complain if an invalid config is passed - invalid api_url', function (done) {
      webapp.listRepos({api_url: 'invalidurl', api_key: 'zRtVsmeznn7ySatTrnrp'}, function (err, repos) {
        expect(err).to.be.ok();
        done();
      });
    });

    it('should complain if invalid credentials are passed - wrong api_key', function (done) {
      webapp.listRepos(wrongCredentialsConfig, function (err, repos) {
        expect(err).to.be.ok();
        done();
      });
    });
  });

  //--------------------------------------------------------------------------------------
  describe('setupRepo', function () {
    //takes parameters - account, project, config, callback
    var account = {
      api_url: 'http://localhost:80/api/v3',
      api_key: 'zRtVsmeznn7ySatTrnrp'
    };

    before('Setup the mock gitlab server', function setupNock() {
      nock.cleanAll();
      nock.disableNetConnect();
      require('./mocks/gitlab_webapp_setuprepo.js')();
    });

    after('Tear down mock Gitlab server', function tearDownNock() {
      nock.cleanAll();
    });

    it('should callback with the same config object that we passed in as the second parameter if repo was set up successfully', function (done) {
      webapp.setupRepo(account, providerConfig, repoProject, function (err, receivedConf) {
        expect(err).to.not.be.ok();
        expect(receivedConf).to.eql(providerConfig);
        done();
      });
    });

    it('should callback with an error if invalid credentials are supplied', function (done) {
      webapp.setupRepo(wrongCredentialsConfig, providerConfig, repoProject, function (err, receivedConf) {
        expect(err).to.be.ok();
        done();
      });
    });

    it('should callback with an error if project.provider.repo_id is invalid', function (done) {
      webapp.setupRepo(account, providerConfig, projectWithInvalidRepoID, function (err, receivedConf) {
        expect(err).to.be.ok();
        done();
      });
    });

    it('should callback with an error if project.branches[0].pubkey is not a valid ssh public key', function (done) {
      webapp.setupRepo(account, providerConfig, projectWithInvalidSSHKey, function (err, receivedConf) {
        expect(err).to.be.ok();
        done();
      });
    });
  });

  //--------------------------------------------------------------------------------------
  describe('tearDownRepo', function () {
    //takes parameters - account, project, config, callback
    var account = {
      api_url: 'http://localhost:80/api/v3',
      api_key: 'zRtVsmeznn7ySatTrnrp'
    };

    before('Setup the mock gitlab server', function setupNock() {
      nock.cleanAll();
      nock.disableNetConnect();
      require('./mocks/gitlab_webapp_teardownrepos.js')();
    });

    after('Tear down mock Gitlab server', function tearDownNock() {
      nock.cleanAll();
    });

    it('should callback on success with no parameters if the repo was destroyed successfully', function (done) {
      webapp.teardownRepo(account, providerConfig, repoProject, function (err) {
        expect(err).to.not.be.ok();
        done();
      });
    });

    it('should callback with an error if invalid credentials are supplied', function (done) {
      webapp.teardownRepo(wrongCredentialsConfig, providerConfig, repoProject, function (err) {
        expect(err).to.be.ok();
        done();
      });
    });

    it('should callback with an error if project.provider.repo_id is invalid', function (done) {
      webapp.teardownRepo(account, providerConfig, projectWithInvalidRepoID, function (err) {
        expect(err).to.be.ok();
        done();
      });
    });

    it.skip('should callback with an error if an invalid project name is given', function (done) {
      webapp.teardownRepo(account, providerConfig, projectWithInvalidName, function (err) {
        //TODO: what happens here is that the title does not match that of the key and
        //the key is not deleted. In that case, we are silently ignoring the was_deleted flag
        //and directly calling done with a null error
        expect(err).to.be.ok();
        done();
      });
    });
  });
});
