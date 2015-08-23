/*

 These scenarios are mock responses from the server
 when we request the deletion of hooks, when registered
 hooks are present.

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

  /*--------------------------------------------------------------------------------------
   Simulate responses from gitlab server when deleting multiple hooks associated with a
   repo - here, there are four hooks with IDs 18, 19, 20 and 21. NOTE: what if other
   software has registered hooks with the same repo? Perhaps what we should be doing is,
   keeping track of which hooks were registered by Strider, and delete only those.
   --------------------------------------------------------------------------------------
   */
  nock('http://localhost:80')
    .persist()
    .get('/api/v3/projects/5/hooks')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b0800000000000003c592c14ec4300c44ff25e76e13274db5cd777002a128db9a369025c5719703e2df09688584b8778f9e198ffc243f7c883809a7a1111b25e1c4c2bc3a29531e435a7261679452b230c50989b130925c295e56cacf3832c8b04639474ee124dff1b4e4fc221a311206c6c907ae955a813da8e341c31d74ce80b37d6b8dbaafb96b8bffbec1d6712b8bc70bbe72118e69c346c452362cbfe25348a5aa67a4193de15bf5f89fcb61f67faa7eb63e9b2babda8d55f74e776d6fccad5861d88fb57356b783829bb11e776385fac35d3b68bd3bebe317b6d31703b1030000"], {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 15:17:53 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      link: '<http://localhost/api/v3/projects/5/hooks?page=1&per_page=0>; rel="first", <http://localhost/api/v3/projects/5/hooks?page=1&per_page=0>; rel="last"',
      etag: 'W/"66dde97b2afc21eb28d09cea6cd938b5"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '6dadbbb0-79d7-440f-9cb7-e68ce8a29554',
      'x-runtime': '0.519726',
      'content-encoding': 'gzip'
    });

  nock('http://localhost:80')
    .delete('/api/v3/projects/5/hooks/20')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b08000000000000038d8dc16ec2301044ff65cfa1761c4095bf83532f96932c89a989dddd757aa8faef1884901017aef366defc4118c11add40a1081666916c958a69f0714e2cb6d35a2b160a2392200b92ca14d64ce98483b4cae7a0a620d1f7ea17fb39a56f68e04eddd5bd6b6020f482a3f3521f8c6e771bfdb931eda1dd5ab3b766fbb1efbaaf3a2b797cabc7486b18f0a65f4a8cf5b0f0ec70c54518ac50c1060273417e84471fb9a667a4091de14f65f242c54fee49755f2d49f0d9f47f014f6dcfe639010000"], {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 15:17:53 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"441a3588cef9fb94b7d512ef5e950ea7"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': 'b694345c-e83b-4b65-ae85-08d4464f3c07',
      'x-runtime': '0.025442',
      'content-encoding': 'gzip'
    });

  nock('http://localhost:80')
    .delete('/api/v3/projects/5/hooks/19')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b08000000000000038d8dc16ec2301044ff65cfa1b603918abf831317cb244b6230b1d95da787aaff8e41080971e975decc9b5f080358b36da050040b9348b64ac5d4fb382516bbd65a2b160a0392200b92ca14964ce984bd18e573506390e80fea070f534a6768e049dddddd35d0137ac1c179a90fad36dd4a7faf5ab3331bdb6e6cd77e6db5d9d759c9c3bf7a8cb4841e1ffab9c4580f0b4f0e179c85c10a156c203017e45778f4916b7a411ad1115e2b930f2a7e746faae76a4e82efa6bf1b8989ea2039010000"], {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 15:17:53 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"a589536875f3986c7a8dbb852470a6b9"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': 'f7ae7e88-4d88-4410-8fe3-e5f9e571d46c',
      'x-runtime': '0.014732',
      'content-encoding': 'gzip'
    });

  nock('http://localhost:80')
    .delete('/api/v3/projects/5/hooks/18')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b08000000000000038d8dc16ec2301044ff65cfa1b60391c0dfd11317cb244b627063b3bb4e0f55ff1d831012e2c275decc9b3f080358b36da050040b9348b64ac5d4fb382516bbd65a2b160a0392200b92ca14964ce984bd18e573506390e80fea170f534a6768e041ddcddd35d0137ac1c179a90fad36dd4a6f57adf9361b6b8ced365fbbb6ddd759c9c3473d465a428f77fd5c62ac878527870bcec260850a3610980bf2333cfac835fd411ad1115e2a93372a7e742faac76a4e82afa6ff2bc45c0bae39010000"], {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 15:17:53 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"833cfcd8b12696291ad963463ea5ec47"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': 'f36e3cd5-2f64-4859-93b1-dde3d6c4863e',
      'x-runtime': '0.014471',
      'content-encoding': 'gzip'
    });

  nock('http://localhost:80')
    .delete('/api/v3/projects/5/hooks/21')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b08000000000000038d8dc16ec2301044ff65cfa1b6138290bfa3272e964996c4d48dcdee3a3d54fd770c4248a817aef366defc4218c1b6a68142112ccc22d92a15d3e0e39c586ca7b5562c1446244116249529ac99d2190731cae7a0a620d11fd50f1ee794bea08107753777dfc040e80547e7a53eb4daf41bbddfb4e6d36c6d676cbffbe83b7da8b392c7b77a8cb48601effaa5c4580f0bcf0e575c84c10a156c203017e46778f2916bfa8d34a123bc5426ffa8f8c9bda81eab2509be9afeae07c9ee7a39010000"], {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 15:17:53 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"3586f6e4865bead39cdd672bd35adf9a"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': 'b73a0d0d-7cab-4c25-a364-237699b677c9',
      'x-runtime': '0.519791',
      'content-encoding': 'gzip'
    });

  //--------------------------------------------------------------------------------------
  //Simulate case when api_key is not provided
  nock('http://localhost:80')
    .get('/api/v3/projects/5/hooks')
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 16:02:41 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': '343536d3-1830-45de-a609-78d98844599c',
      'x-runtime': '0.003969'
    });

  //--------------------------------------------------------------------------------------
  //Simulate case when invalid repo id is sent
  nock('http://localhost:80')
    .get('/api/v3/projects/invalid-repo/hooks')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(404, ["1f8b0800000000000003ab56ca4d2d2e4e4c4f55b252323130510828cacf4a4d2e51f0cb2f5170cb2fcd4b51aa050037095a2823000000"], {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 16:05:38 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '404 Not Found',
      'cache-control': 'no-cache',
      'x-request-id': '3b41f707-85d9-49cd-a052-bcdcd0180b20',
      'x-runtime': '0.005461',
      'content-encoding': 'gzip'
    });

  //--------------------------------------------------------------------------------------
  //Case when invalid credentials are sent
  nock('http://localhost:80')
    .get('/api/v3/projects/5/hooks')
    .query({"private_token": "zRtVsmeznn7ySatTrnra"})
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Fri, 21 Aug 2015 16:33:39 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': 'bbf03f1f-8c62-4b7c-9bb1-e1fbb3856411',
      'x-runtime': '0.004745'
    });
};
