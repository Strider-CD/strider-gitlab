'use strict';

/*
 Here we simulate the response of the server when asked
 to tear down the repo for privproject1

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
  //Simulate good responses that are sent when the repo is torn down correctly

  //get the list of ssh keys
  nock('http://localhost:80')
    .get('/api/v3/projects/5/deploy_keys')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b080000000000000375d14b8fa2401405e0bfd2614bdb4d953c5d0dcf26a2342f5b743299005542c94ba1046132ff7d3499cd2ce66e4eeec9d97ddf7f3104312b28bf3294d00a332ba6a71d41b85bfc4d8a7b8abbf74b47864bd79e714601f3ca94787a4efb62d1f5c98bfa386de9ce890ea60c9acfd7507d557bd6aaafd7ad939243efb53c053a98871d6756e7b477e429908b6242a6531feffa1859cb61107bc9abc7234621f59325f24814f6b3a7de2732d159b69348637349fa5aebb91b39bb6b3542f409e5ecd816bc1d8c72a1d73011344d833a1902a7d95a8dc8d9c04a63bfea14f3e6a54225dd907f4ed61f87d2deab8622679b496a8da54da3681b833054aa3db89bb9e5df3c944690cab59e69bb2c9725cb364ba4909087065b8fe6d05e9c2bab3a87c22c21328c4d75312d716d5b6c5e9ea6c93fef02a4ab2d7f307a711b70db36d8eecf208958019fc8e912eedf95358d2d213646a7ac9bf2ab41d7d80199a8ba568c58d4229bf65699ba3cdb7d2e371f6aa301bc9edd61d41af7e5ff3effd27dcbeb84546f595b3fdcb20e2714a39f097df0410e080b4e5e401801b0e2c51514de38513932bf7ffc014101a3c118020000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 11:47:06 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"690cd0366b746f11420cf4cd41447505"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '61269e5f-cfc1-422e-b74f-eca5a5171203',
      'x-runtime': '0.019441',
      'content-encoding': 'gzip'
    });

  //get the list of hooks
  nock('http://localhost:80')
    .get('/api/v3/projects/5/hooks')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b0800000000000003658e4b0ec2300c44efe275216928bf9c83150845a1356d209062bbb040dc9d8010126239f3eca7d9dc21346027ba80812258e8447aab544cb58f5d62c9486bc542a141126441523d856b4fe980b594caf741b541a2dfa91beeba948e50404de8051be7252b8d2ea723bd1819b32a4b5bcdaca9c6cbb959e7bb8fc5bd364c731cb87378c5b33058a1010b08cc03f2b7dcfbc8b93d21b5e8082f99c91f15dfba1fd5fbebb17d0262c84f93ed000000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 11:47:06 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      link: '<http://localhost/api/v3/projects/5/hooks?page=1&per_page=0>; rel="first", <http://localhost/api/v3/projects/5/hooks?page=1&per_page=0>; rel="last"',
      etag: 'W/"e7cde71ed4b2e2f010cc02aa14c300e5"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '27681ba4-9cea-4b26-8306-0ec64c76bfec',
      'x-runtime': '0.022184',
      'content-encoding': 'gzip'
    });

  //delete the key associated with the project
  nock('http://localhost:80')
    .delete('/api/v3/projects/5/deploy_keys/28')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b08000000000000038c52c976a24014fd951cb6c4842a9957cd188e286132a29b1ca04a40c64009627ebef1f4ca5dbfdd7d77d8dcfb4b158892a1f84a5d07dc7f3f4073adaa572aed714c30fa8e0925539001dc8a1157108600c82c2f43ee8de1a513b5d83af45fba12cf4bd030e4ab7e885f94e5d4b5738f3530a7d078405df114f5f1563cad6eeda4380e6ecb12a081fbb8678cea920cb638fb629ecfc8b0ebd34d9b42733d8efc20b8f574c228205ebc466e1106c3dd556e733193bb68c5a14a6782f0b5d13227b4f73fd504d12714d3539bb3963f89b956c3985355156ac5e8dbcdce6c78c602661279552f195737e12ae18abc4bbcf93896d641d12531ddce42abaf2d1286bb080481541dc0cdc84cefeaa2248444acb554dda7992898965122a90858a8d3f5648c6d67ffd08a7dcc8d12225ddf569d61f21bcba4b3f23ccfde65ef234d69d9a33ef03b9fd9b5feee7001714873f85c9cbbe0f02e6d486472913ed965dd945f0dfa896c90f28a634688462db2c8609689c3d2fde77afba1342ac09bbb334e6ae3bc0ca42f10ee091e08eedfbbbe18bbbebde09480d513f527abe3a27a4bdb7ae99714a4c28fe6fe999f954f218bf85c3419ee97e4e6b19a98971920f3922c2c83817f6795966265996c65666a95626165666c656a62659c6695960452936461659a08d45f509a949399ac64959698539c5a0b00837af5d39c020000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 11:47:06 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"b4902d64c484b3f0e011862ecaa556eb"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '3e5e9625-a43c-4f32-a6a5-477e05b0ed3b',
      'x-runtime': '0.023933',
      'content-encoding': 'gzip'
    });

  //delete the hook associated with the project
  nock('http://localhost:80')
    .delete('/api/v3/projects/5/hooks/30')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b08000000000000038d8dcd6ec2301084df65cf013be6aff573f4c4c532c93671ebc666771d0e8877c720540971e13adfcc3767083dd8956ea050040ba348b64ac5d4f93826968ab4562c147a244116249529cc99d20f76d22a9f831a82447f50273c8c29fd42030fea6eee4d031da117ec9d97fa6074bb59e88f85315f6d6bd75b6bd6cbcf9dd9d759c9fd5b3d469a438777fd5462ac87854787334ec260850a3610980bf27ff8ed23d7f40f69404778ac4c5ea8f8c13da91eab29093e9b2e57ff64dcac39010000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 11:47:06 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"cf8c92b71d0b72f1e754948cc93b78f1"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '55957387-e9bb-4b80-8172-2990bffbf2e0',
      'x-runtime': '0.024064',
      'content-encoding': 'gzip'
    });

  //--------------------------------------------------------------------------------------
  //Simulate 401 Unauthorized responses when invalid credentials are supplied

  nock('http://localhost:80')
    .get('/api/v3/projects/5/hooks')
    .query({"private_token": "badkey"})
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 11:57:57 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': '8a4a34a5-f522-4f13-b7a5-534505e0a9c4',
      'x-runtime': '0.004208'
    });


  nock('http://localhost:80')
    .get('/api/v3/projects/5/deploy_keys')
    .query({"private_token": "badkey"})
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 11:57:57 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': '1ebb7394-25f2-4279-abce-ea4845d458d5',
      'x-runtime': '0.006446'
    });

  //--------------------------------------------------------------------------------------
  //Simulate a 404 when an invalid repo id is passed
  nock('http://localhost:80')
    .get('/api/v3/projects/invalidrepo/hooks')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(404, ["1f8b0800000000000003ab56ca4d2d2e4e4c4f55b252323130510828cacf4a4d2e51f0cb2f5170cb2fcd4b51aa050037095a2823000000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 12:02:54 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '404 Not Found',
      'cache-control': 'no-cache',
      'x-request-id': '3af42422-6659-4deb-a356-857cc209dbe9',
      'x-runtime': '0.005849',
      'content-encoding': 'gzip'
    });


  nock('http://localhost:80')
    .get('/api/v3/projects/invalidrepo/deploy_keys')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(404, ["1f8b0800000000000003ab56ca4d2d2e4e4c4f55b252323130510828cacf4a4d2e51f0cb2f5170cb2fcd4b51aa050037095a2823000000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 12:02:54 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '404 Not Found',
      'cache-control': 'no-cache',
      'x-request-id': '6a09637f-d80f-404b-a11c-80677a62a979',
      'x-runtime': '0.006442',
      'content-encoding': 'gzip'
    });
};
