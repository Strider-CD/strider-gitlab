/*
 Here we simulate the response of the server when asked
 to get the strider.json file from the privproject1 repo

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
    .get('/api/v3/projects/5/repository/blobs/master')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp", "per_page": "100", "filepath": "strider.json"})
    .reply(200, ["1f8b0800000000000003abe6525050ca4bcc4d55b25250cacd2c294a54d2010915a726e7e7a580048b12cb3221622519994560a1e2d2a24aa8bab4fcd2a2920c90605246625ea912572d170048d47f8653000000"], {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 14:12:21 GMT',
      'content-type': 'text/plain',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"079e2a69978805f09ba55d6f6b3705f2"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': 'daffad5d-cdff-4f23-bd2d-aec209109619',
      'x-runtime': '0.013665',
      'content-encoding': 'gzip'
    });

  //--------------------------------------------------------------------------------------
  //Simulate a scenario where the project does not contain a strider.json
  //For this purpose we have added another project named priproject2 with id 8
  nock('http://localhost:80')
    .get('/api/v3/projects/8/repository/blobs/master')
    .query({"private_token":"zRtVsmeznn7ySatTrnrp","per_page":"100","filepath":"strider.json"})
    .reply(404, ["1f8b0800000000000003ab56ca4d2d2e4e4c4f55b2523231305170cbcc4955f0cb2f5170cb2fcd4b51aa0500db72e71020000000"], { server: 'nginx',
    date: 'Mon, 24 Aug 2015 06:28:17 GMT',
    'content-type': 'application/json',
    'transfer-encoding': 'chunked',
    connection: 'close',
    status: '404 Not Found',
    'cache-control': 'no-cache',
    'x-request-id': '9e221d4c-9109-4291-929b-2e7cb1e4f057',
    'x-runtime': '0.022119',
    'content-encoding': 'gzip' });
};
