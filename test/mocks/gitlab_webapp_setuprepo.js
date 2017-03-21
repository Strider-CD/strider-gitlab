/*
 Here we simulate the response of the server when asked
 to setup the repo for privproject1

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

const nock = require('nock');

module.exports = function() {

  //--------------------------------------------------------------------------------------
  //Simulate good response that are sent when the repo is set up correctly

  nock('http://localhost:80')
    .post('/api/v3/projects/5/hooks', {
      "url": "http://localhost:3000/stridertester/privproject1/api/gitlab/webhook",
      "push_events": true
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(201, {
      "id": 23,
      "url": "http://localhost:3000/stridertester/privproject1/api/gitlab/webhook",
      "created_at": "2015-08-22T08:55:50.345Z",
      "project_id": 5,
      "push_events": true,
      "issues_events": false,
      "merge_requests_events": false,
      "tag_push_events": false
    }, {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 08:55:50 GMT',
      'content-type': 'application/json',
      'content-length': '235',
      connection: 'close',
      status: '201 Created',
      etag: '"3e1074f02f37c23c355cd1a33eecfb4b"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '3ccf26db-b72c-4b62-9b7b-42b307a85381',
      'x-runtime': '0.031542'
    });


  nock('http://localhost:80')
    .post('/api/v3/projects/5/deploy_keys', {
      "title": "strider-stridertester/privproject1",
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1j1c3wNyUwFzIhU5ELZb6tH1K+TkQgV0CrYjRvWmeZZr5aNKehSo5ntCoPtjZOddD2qYOUNyqe0EkdsSa7JeuD0blk5T9V8EADxqSmfYE8qD3Ch1JN0T4gbxoH20N45gqfpzug04FNwaDvCoxJgKvJXNj141SRLVVsa3DlByqC1Il+6TS7LqsQQMnSahgdx6fOUSLzSRG5NmbHGnS4CA1W4zyqQKzznh/Qj9WLxQKxugly3PPWtlcCDoaFBBQSOIgGVs00Bd3X8DJW/3gNPfydtUAdm/BcDZHOLyBUNOQCjR/fGyLS8D4ufYt6vr72No9O0dyKyI+FpOb+jPDG631 stridertester/privproject1-stridertester@gmail.com\n"
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(201, {
      "id": 24,
      "title": "strider-stridertester/privproject1",
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1j1c3wNyUwFzIhU5ELZb6tH1K+TkQgV0CrYjRvWmeZZr5aNKehSo5ntCoPtjZOddD2qYOUNyqe0EkdsSa7JeuD0blk5T9V8EADxqSmfYE8qD3Ch1JN0T4gbxoH20N45gqfpzug04FNwaDvCoxJgKvJXNj141SRLVVsa3DlByqC1Il+6TS7LqsQQMnSahgdx6fOUSLzSRG5NmbHGnS4CA1W4zyqQKzznh/Qj9WLxQKxugly3PPWtlcCDoaFBBQSOIgGVs00Bd3X8DJW/3gNPfydtUAdm/BcDZHOLyBUNOQCjR/fGyLS8D4ufYt6vr72No9O0dyKyI+FpOb+jPDG631 stridertester/privproject1-stridertester@gmail.com",
      "created_at": "2015-08-22T08:55:50.403Z"
    }, {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 08:55:50 GMT',
      'content-type': 'application/json',
      'content-length': '534',
      connection: 'close',
      status: '201 Created',
      etag: '"f5843bd3736577d1059f9390612e8f81"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '667866c3-47bb-408c-9569-f049ab7a21e6',
      'x-runtime': '0.103697'
    });

  //--------------------------------------------------------------------------------------
  //Simulate 401 unauthorized responses on sending incorrect api key

  nock('http://localhost:80')
    .post('/api/v3/projects/5/hooks', {
      "url": "http://localhost:3000/stridertester/privproject1/api/gitlab/webhook",
      "push_events": true
    })
    .query({"private_token": "badkey"})
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 09:47:00 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': 'f31bd5f2-36cf-4cd6-9199-7ca70831da4d',
      'x-runtime': '0.004801'
    });

  nock('http://localhost:80')
    .post('/api/v3/projects/5/deploy_keys', {
      "title": "strider-stridertester/privproject1",
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1j1c3wNyUwFzIhU5ELZb6tH1K+TkQgV0CrYjRvWmeZZr5aNKehSo5ntCoPtjZOddD2qYOUNyqe0EkdsSa7JeuD0blk5T9V8EADxqSmfYE8qD3Ch1JN0T4gbxoH20N45gqfpzug04FNwaDvCoxJgKvJXNj141SRLVVsa3DlByqC1Il+6TS7LqsQQMnSahgdx6fOUSLzSRG5NmbHGnS4CA1W4zyqQKzznh/Qj9WLxQKxugly3PPWtlcCDoaFBBQSOIgGVs00Bd3X8DJW/3gNPfydtUAdm/BcDZHOLyBUNOQCjR/fGyLS8D4ufYt6vr72No9O0dyKyI+FpOb+jPDG631 stridertester/privproject1-stridertester@gmail.com\n"
    })
    .query({"private_token": "badkey"})
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 09:47:00 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': '000fffa7-8aa6-46ed-a34a-7689f88d331f',
      'x-runtime': '0.006122'
    });

  //--------------------------------------------------------------------------------------
  //Simulate 404 when invalid repo is specified
  nock('http://localhost:80')
    .post('/api/v3/projects/invalidrepo/hooks', {
      "url": "http://localhost:3000/stridertester/privproject1/api/gitlab/webhook",
      "push_events": true
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(404, ["1f8b0800000000000003ab56ca4d2d2e4e4c4f55b252323130510828cacf4a4d2e51f0cb2f5170cb2fcd4b51aa050037095a2823000000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 11:29:30 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '404 Not Found',
      'cache-control': 'no-cache',
      'x-request-id': '9d44eb7e-8a4d-4714-bd0a-5b4de958ed24',
      'x-runtime': '0.005929',
      'content-encoding': 'gzip'
    });


  nock('http://localhost:80')
    .post('/api/v3/projects/invalidrepo/deploy_keys', {
      "title": "strider-stridertester/privproject1",
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC1j1c3wNyUwFzIhU5ELZb6tH1K+TkQgV0CrYjRvWmeZZr5aNKehSo5ntCoPtjZOddD2qYOUNyqe0EkdsSa7JeuD0blk5T9V8EADxqSmfYE8qD3Ch1JN0T4gbxoH20N45gqfpzug04FNwaDvCoxJgKvJXNj141SRLVVsa3DlByqC1Il+6TS7LqsQQMnSahgdx6fOUSLzSRG5NmbHGnS4CA1W4zyqQKzznh/Qj9WLxQKxugly3PPWtlcCDoaFBBQSOIgGVs00Bd3X8DJW/3gNPfydtUAdm/BcDZHOLyBUNOQCjR/fGyLS8D4ufYt6vr72No9O0dyKyI+FpOb+jPDG631 stridertester/privproject1-stridertester@gmail.com\n"
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(404, ["1f8b0800000000000003ab56ca4d2d2e4e4c4f55b252323130510828cacf4a4d2e51f0cb2f5170cb2fcd4b51aa050037095a2823000000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 11:29:30 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '404 Not Found',
      'cache-control': 'no-cache',
      'x-request-id': 'f78f974c-207b-4d85-b42a-3c38dea668e7',
      'x-runtime': '0.006760',
      'content-encoding': 'gzip'
    });


  //--------------------------------------------------------------------------------------
  //Simulate a situation where an invalid ssh key is provided
  //the hook ends up getting created, but we get a 400 Bad Request when trying to add the key
  nock('http://localhost:80')
    .post('/api/v3/projects/5/hooks', {
      "url": "http://localhost:3000/stridertester/privproject1/api/gitlab/webhook",
      "push_events": true
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(201, {
      "id": 27,
      "url": "http://localhost:3000/stridertester/privproject1/api/gitlab/webhook",
      "created_at": "2015-08-22T11:31:48.159Z",
      "project_id": 5,
      "push_events": true,
      "issues_events": false,
      "merge_requests_events": false,
      "tag_push_events": false
    }, {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 11:31:48 GMT',
      'content-type': 'application/json',
      'content-length': '235',
      connection: 'close',
      status: '201 Created',
      etag: '"ae205f292720e19ab273c3bea2ba66b0"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '4562483b-5c3d-4f19-bf63-bb3968c39815',
      'x-runtime': '0.023564'
    });

  nock('http://localhost:80')
    .post('/api/v3/projects/5/deploy_keys', {"title": "strider-stridertester/privproject1", "key": "invalid key"})
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(400, {"message": {"key": ["is invalid"], "fingerprint": ["cannot be generated"]}}, {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 11:31:48 GMT',
      'content-type': 'application/json',
      'content-length': '72',
      connection: 'close',
      status: '400 Bad Request',
      'cache-control': 'no-cache',
      'x-request-id': 'be0ac084-2fae-4589-b4a7-13a65cc0f055',
      'x-runtime': '0.074954'
    });
};
