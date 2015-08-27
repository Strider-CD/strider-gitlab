/*
 Used to test the gitlab worker
 */

var proxyquire = require('proxyquire');
var expect = require('expect.js');
var util = require('util');
var debug = require('debug')('strider-gitlab:test:webapp');

var gitStub = { };

gitStub.fetch = function(dest, config, job, context, done) {
  done();
}

var worker = proxyquire('../lib/worker', {'strider-git/worker': gitStub});

describe('gitlab worker', function () {
  //--------------------------------------------------------------------------------------
  describe('init', function () {
    var dirs = { 
      base: '/home/dev/.strider',
      data: '/home/dev/.strider/data/stridertester-privproject1-55de9a6c1cfc0d872d309dbb',
      cache: '/home/dev/.strider/cache/stridertester/privproject1' 
    }; 

    var account = { 
      api_url: 'http://localhost:80/api/v3',
      api_key: 'zRtVsmeznn7ySatTrnrp' 
    };

    var config = {
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
      auth: { type: 'ssh' } 
    };

    var job = { };

    it('should call back with err as null and the second param as an object with three properties, config, account and a fetch function', function(done) {
      worker.init(dirs, account, config, job, function(err, object) {
        expect(err).to.not.be.ok();
        expect(object.config).to.eql(config);
        expect(object.account).to.eql(account);
        expect(object.fetch).to.be.a('function');
        done();
      }); 
    });

    it('should check for invalid arguments and operational errors ?'); 
  });

  //--------------------------------------------------------------------------------------
  describe('fetch', function () {
    
    it('should call our callback after strider-git/worker fetch is done with its task', function(done){
      var dest = "";
      var account = {
        accessToken: "abcd"
      };
      var config  = { 
        auth: {
          type    : "https",
          username: "strider"
        }
      };
      var job     = {};
      var context = {};
 
      worker.fetch(dest, account, config, job, context, done); 
    });

    it('should check for invalid arguments and operational errors ?'); 
  });

});
