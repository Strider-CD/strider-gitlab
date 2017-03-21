'use strict';

/*
 Used to test the gitlab webhooks
 */

const expect = require('expect.js');
const webhooks = require('../lib/webhooks');
let util = require('util');
let debug = require('debug')('strider-gitlab:test:webhooks');

describe('receiving webhooks from the gitlab server', function() {
  //--------------------------------------------------------------------------------------
  describe('receiveWebhook', function() {
    //It takes three parameters, emitter, req and res

    it('should emit a job.prepare event on emitter AND return a 204 response if the payload was parsed successfully and a job could be created', function(done) {
      let expected_successes_remaining = 2;

      //the test should pass only when mockRes.sendStatus gets called with 204 AND when
      //emitter receives this signal with the jobObject, doing assertion counting to
      //ensure both conditions are successful. TODO: Is there a better way to do this with Mocha?

      function checkDone() {
        expected_successes_remaining--;
        if(expected_successes_remaining === 0) {
          done();
        }
      }

      //This will get the job.prepare event when the job is successfully created
      const emitter = new (require('events').EventEmitter);

      //This contains the payload received from the gitlab server in
      //body and project information from strider
      const mockReq = require('./mocks/receive_webhooks_req.js');

      //On receiving the payload we are expected to send a 204 immediately (?)
      //perhaps we should send a 400 if we could not parse the payload
      const mockRes = {
        sendStatus: function(code) {
          expect(code).to.eql(204);
          checkDone();
        }
      };

      emitter.on('job.prepare', function(jobObject) {
        expect(jobObject.type).to.eql("TEST_AND_DEPLOY");
        expect(jobObject.trigger.type).to.eql("commit");
        expect(jobObject.ref.branch).to.eql("master");
        expect(jobObject.ref.id).to.eql("6a00c57e69bd4e269496ca27973191ecafcf8b20");
        checkDone();
      });

      webhooks.receiveWebhook(emitter, mockReq, mockRes);

    });

    it('should send a 400 error in the res if the payload cannot be parsed');

  });

  //--------------------------------------------------------------------------------------
  describe('pushJob', function() {
    //pushJob takes one parameter - a payload object

    it('should be able to parse the payload and return an object with branch, trigger, deploy and ref', function() {
      const samplePayload = require('./mocks/sample_payload.js');
      const config = webhooks.pushJob(samplePayload);
      expect(config).to.eql({
        branch: 'master',
        trigger: {
          type: 'commit',
          author: {
            name: 'Strider Tester',
            username: undefined,
            email: 'stridertester@gmail.com',
            image: 'https://s.gravatar.com/avatar/3f671ed86ed3d21ed3640c7a016b0997'
          },
          url: 'http://nodev/stridertester/privproject1/commit/352e6fe2ea42d394a21dc7995df2116e86bb0684',
          message: 'updated strider.json\n',
          timestamp: '2015-08-26T20:02:07+09:00',
          source: {type: 'plugin', plugin: 'gitlab'}
        },
        deploy: true,
        ref: {
          branch: 'master',
          id: '352e6fe2ea42d394a21dc7995df2116e86bb0684'
        }
      });
    });
  });

});
