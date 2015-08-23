/*
 Simulation of responses from server when we
 ask for deleting hooks when no hooks are present

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
  //Empty array as list of hooks in response
  nock('http://localhost:80')
    .get('/api/v3/projects/5/hooks')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, [], {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 16:08:18 GMT',
      'content-type': 'application/json',
      'content-length': '2',
      connection: 'close',
      status: '200 OK',
      link: '<http://localhost/api/v3/projects/5/hooks?page=1&per_page=0>; rel="first", <http://localhost/api/v3/projects/5/hooks?page=0&per_page=0>; rel="last"',
      etag: '"d751713988987e9331980363e24189ce"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': 'de64f599-b582-4bcb-b68d-552c2441028e',
      'x-runtime': '0.019459'
    });
};
