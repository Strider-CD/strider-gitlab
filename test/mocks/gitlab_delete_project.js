/*
 Simulate responses from server when we try to
 delete a project.

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
  //Simulate responses during a successful delete operation
  nock('http://localhost:80')
    .get('/api/v3/projects/5/keys')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b080000000000000375914b8fa2400084ffca84abe3740302e26991a73c544659d4cd66836d232d0fb1bb5570b2ff7d35d9cb1eb62e95aad4a192efc797400ec244d4de054e78858589c03825074c877f9d63c631052d25b7969e4f18715178174adcbfa6ac185296bd194f4de5f92333c51e49f62b5a466c4c5fb5115b374ac2540d41752a734c2173a792a6b68d28ad34b52f2278d1a2dd6e7d2cf9d8c52d2b46b96dccf083fbdab987eea0408113b941ea2f7d5d424a536c1534b6ad4cf2b05dcddcf69458ae978f5cffd2a669ba6ff00eceafcbade55da7614b48c969b35191db5f947902d2b06ee60b51be2730ec5a45d2a3c1c1ebf69e6f6138ebd9f95672ad32ecf9f5d69f10f556eb8ad58613c04e078cdf8e5a4e06f4ae3a6c7395b6345e786668aa7982880b2ea4b3133da795fcd8630f01d6a8b06ac896811a8278162c8ad5b5e8ca1105a1cd833275827e2d6bb9f368bb1a24b934c3aae5c42650f2689f176c1f2f756edf53bd3625ff1c9b9b512546d1e7f7e7e3f2d347e0f0f67f3effa2fb76ac33527da073fde48628ce383efccaf8139f04456508c743515f436d22cb1359f9186b7027fcfef90733edcd2b18020000"], {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 07:34:26 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"6b396edfec74bfbd19e6db1f696be410"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': 'd7010f79-a813-4e88-8b23-4b8adac5bc43',
      'x-runtime': '0.026638',
      'content-encoding': 'gzip'
    });

  nock('http://localhost:80')
    .delete('/api/v3/projects/5/hooks/14')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b08000000000000038d8db14ec4301044ff65eb1c76081177fe0e2a1acb970c89c1c466771d0ac4bf63d009e944433b6fe6cd07c5995c7fd751e5448e56d5e28c49790a69cda26eb0d61a518e3358210a3685e35e383f63d2de8412cd123585b379c779cdf9853aba50ffed1e3b9a184131fba0ede1d6f6e3c11e0ffde9c1debb6170c37873b4a7c736ab65fe574fc07b9cf0a3df6a4aedb0caeab1635321a75cd15114a990dff0292469e92b788167bc35a67fa886c55fa92eab2d2bae4d9f5f95e44d6c39010000"], {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 07:34:26 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"48100b28764f2de3fffabb9de2e5c741"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': 'f3623d3d-af5f-4673-a0c8-568a3f5829cb',
      'x-runtime': '0.019863',
      'content-encoding': 'gzip'
    });

  nock('http://localhost:80')
    .delete('/api/v3/projects/5/keys/17')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(200, ["1f8b08000000000000038c52c992a24014fc950eaeb65dc5be9c06651341a5d541bd74201652b288558582f3f38331276ff36ef95e664646e4fbc3e11367f0ea27d752447e5ea06ecbf2934b094a183afd248c333801f2f2186a635edf40d510454394bf34151eb841d69cfe8b57a07e30a2341f139a7c98c34cc4c53399f27d2ad82f6899913979adcdc8ba131cc44a00ca4b912102a93b1154a5a97961ad2a7d1ec29b1a1e0e9b73c1341735349732db9ca127f3d56b0fdd519ece9dd09dc7fecad78554aef3bd9c6ab695081eb2cb99db5cb696eb6592ebdf9a388e8f353ac045bbda5b5e3b091a8c0b46ea9d92bafd4d5e6c411c54f562c98b8f2d0cba4616f47074f2baa3e75b08ce7a7abd174c2d4d7bd1defb4b4abcf5a6a495e9cc61a703caee6735c323f2501cba6b853d8996de34982ad936c52eb8e1cedeea1929c5e7117929a0b502cb1aef29a8208866f365be6ef3ae9008086c362f6267de6f4435739e4d57816d26cc906239d114c85978cc727a8c563ab31fb15e4d05ff1a4d7752c987e1f7ef2171f1eda7e0f44119c1274418a20c11d0107c6fc8f58252c68fdf4ebfce5582cbaff45a0dfd32cc4af46aee9ff89df9663290335c9f11199cebd7d748a2a123031e0d2d3124edefac4c4dacd252acd28cacd24cac9281a9c8cc2a35cdcac4c0ca32cdcad2d0ca3211a8bfa03429273359c92a2d31a738b5160053bf1cd39c020000"], {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 07:34:26 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"73e7baa6dacd78d9a403fb0391b6e4bb"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': 'f60ad59d-8088-40d4-9358-37ff188ec374',
      'x-runtime': '0.033622',
      'content-encoding': 'gzip'
    });

  //--------------------------------------------------------------------------------------
  //simulate trying to delete a project when an incorrect repo id is specified
  nock('http://localhost:80')
    .get('/api/v3/projects/wrong%20repo%20id/keys')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(404, ["1f8b0800000000000003ab56ca4d2d2e4e4c4f55b252323130510828cacf4a4d2e51f0cb2f5170cb2fcd4b51aa050037095a2823000000"], {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 08:35:42 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '404 Not Found',
      'cache-control': 'no-cache',
      'x-request-id': '234fcd84-6d78-44fb-921f-0c613414671a',
      'x-runtime': '0.005932',
      'content-encoding': 'gzip'
    });

  //--------------------------------------------------------------------------------------
  //simulate 401 when wrong credentials are specified
  nock('http://localhost:80')
    .get('/api/v3/projects/5/keys')
    .query({"private_token": "zRtVsmeznn7ySatTrnra"})
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 04:43:22 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': '404162fd-f217-4d03-a429-d08edd893921',
      'x-runtime': '0.460579'
    });
};
