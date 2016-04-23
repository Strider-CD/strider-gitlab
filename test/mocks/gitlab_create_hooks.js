/*
 Simulation of responses from a server when we
 request the creation of hooks.

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
var nock = require('nock');

module.exports = function () {

  //--------------------------------------------------------------------------------------
  //Simulate a 401 reply if api key is not sent
  nock('http://localhost:80')
    .post('/api/v3/projects/5/hooks', {
      "url": "http://localhost:3000/stridertester/privproject1/api/gitlab/webhook",
      "push_events": true
    })
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 14:42:46 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': '052eafeb-0028-4e69-b951-95925efdc232',
      'x-runtime': '0.004600'
    });

  //--------------------------------------------------------------------------------------
  //Simulate 201 replies when we request the addition of a new project
  //(adding hooks and keys)
  nock('http://localhost:80')
    .post('/api/v3/projects/5/hooks', {
      "url": "http://localhost:3000/stridertester/privproject1/api/gitlab/webhook",
      "push_events": true
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(201, {
      "id": 18,
      "url": "http://localhost:3000/stridertester/privproject1/api/gitlab/webhook",
      "created_at": "2015-08-21T14:11:54.922Z",
      "project_id": 5,
      "push_events": true,
      "issues_events": false,
      "merge_requests_events": false,
      "tag_push_events": false
    }, {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 14:11:54 GMT',
      'content-type': 'application/json',
      'content-length': '235',
      connection: 'close',
      status: '201 Created',
      etag: '"3b0821c3d2fa5d74684be993bfba7805"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '0f470a71-564f-4dcc-ae1f-743b73c98473',
      'x-runtime': '0.021008'
    });

  nock('http://localhost:80')
    .post('/api/v3/projects/5/keys', {
      "title": "strider-stridertester/privproject1",
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC5CS04M9YZAoOkl9suZuKdBR643lB9Kv2AigyqcCfljhnFK3tWPLEnlsLE7ZnunTC3VcPPesdC8MeWC95EvQgNGH6Y5oXrGcaxZKiVDunk4xxKpJQjzMbp753B4R7i28NyZVShCyYG0+wkqAYlJ4NFWn6PMEOouinY8Z3/JD/e9luq4QgyyrI9s+e7VWKBBof9f6FtaGWXwpaWt7Peud3/AWKkhPELQmDDBEcZ5jxFneLsO0KEQ3qqGlEhQbtYLblgjWvuekd0CAReyUNjyJQG+rfDyVVadAQNHiri7c8cj6Y766FdfRskCKiA7E5IPfnysUcRx8657u6DG4PC6guV stridertester/privproject1-stridertester@gmail.com\n"
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(201, {
      "id": 22,
      "title": "strider-stridertester/privproject1",
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC5CS04M9YZAoOkl9suZuKdBR643lB9Kv2AigyqcCfljhnFK3tWPLEnlsLE7ZnunTC3VcPPesdC8MeWC95EvQgNGH6Y5oXrGcaxZKiVDunk4xxKpJQjzMbp753B4R7i28NyZVShCyYG0+wkqAYlJ4NFWn6PMEOouinY8Z3/JD/e9luq4QgyyrI9s+e7VWKBBof9f6FtaGWXwpaWt7Peud3/AWKkhPELQmDDBEcZ5jxFneLsO0KEQ3qqGlEhQbtYLblgjWvuekd0CAReyUNjyJQG+rfDyVVadAQNHiri7c8cj6Y766FdfRskCKiA7E5IPfnysUcRx8657u6DG4PC6guV stridertester/privproject1-stridertester@gmail.com",
      "created_at": "2015-08-21T14:11:54.986Z"
    }, {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 14:11:55 GMT',
      'content-type': 'application/json',
      'content-length': '534',
      connection: 'close',
      status: '201 Created',
      etag: '"13f3437db289c9c485011a1201db884f"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '0e829475-9fda-458e-8b34-08c7e8c4c0f5',
      'x-runtime': '0.099567'
    });

  //--------------------------------------------------------------------------------------
  //Simulate a 404 if we passed an incorrect repo id
  nock('http://localhost:80')
    .post('/api/v3/projects/invalid-repo/hooks', {
      "url": "http://localhost:3000/stridertester/privproject1/api/gitlab/webhook",
      "push_events": true
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(404, ["1f8b0800000000000003ab56ca4d2d2e4e4c4f55b252323130510828cacf4a4d2e51f0cb2f5170cb2fcd4b51aa050037095a2823000000"], {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 14:47:42 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '404 Not Found',
      'cache-control': 'no-cache',
      'x-request-id': 'b35510b5-8f3b-434c-bc63-e77ed6a5dc74',
      'x-runtime': '0.006681',
      'content-encoding': 'gzip'
    });

  //--------------------------------------------------------------------------------------
  //Simulate a 400 if we passed a bad URL
  nock('http://localhost:80')
    .post('/api/v3/projects/5/hooks', {"url": false, "push_events": true})
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(400, {"message": "400 (Bad request) \"url\" not given"}, {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 14:52:41 GMT',
      'content-type': 'application/json',
      'content-length': '49',
      connection: 'close',
      status: '400 Bad Request',
      'cache-control': 'no-cache',
      'x-request-id': '823fd96a-3829-4dbe-b7ff-75ab89b50455',
      'x-runtime': '0.010701'
    });

  //--------------------------------------------------------------------------------------
  //Simulate a 401 if wrong credentials were sent
  nock('http://localhost:80')
    .post('/api/v3/projects/5/hooks', {
      "url": "http://localhost:3000/stridertester/privproject1/api/gitlab/webhook",
      "push_events": true
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnra"})
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 16:38:40 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': '0f3180af-8f43-495f-91fb-8455313eff9a',
      'x-runtime': '0.004978'
    });
};
