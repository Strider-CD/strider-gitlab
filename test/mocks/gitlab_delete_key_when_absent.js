/*
 Here we simulate the response of the server when there
 no deploy keys registered in the project.

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

  nock('http://localhost:80')
    .get('/api/v3/projects/5/keys')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, [], {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 07:44:07 GMT',
      'content-type': 'application/json',
      'content-length': '2',
      connection: 'close',
      status: '200 OK',
      etag: '"d751713988987e9331980363e24189ce"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '6335ed65-d224-42e7-bf6d-948559539f88',
      'x-runtime': '0.015344'
    });
};
