'use strict';

/*
 Here we simulate the response of the server when asked
 to get a list of repositories from the gitlab server

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
  //Simulate a good response that sends the three correct repos
  nock('http://localhost:80')
    .get('/api/v3/projects')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp", "per_page": "100"})
    .reply(200, ["1f8b0800000000000003e5966d6f9b3010c7bf8ac5eb94e7474bd5f61dd657eb2ae4c0257823c06c03aaaa7ef79d816421340fd52655daa4248ace77e7f3df773f787c31786ed06865e42033c11bc5ebcaa0c643c125c10f238da8bf43a6c88ef14ae11772b27e26aa00f245099e83200f20150849da4ac7ea4c1bd6962a5d0b56650526db31ed802b8a6dd3924b65d0c7a795d1b4eb926706ddb052c2ca60222b780758cd64e8b8e46b5e72f59c96d04169507b654859a4ad285355a7029a1ab36fb9fa5cd539745461214311d6f03b55ee98e8819b174a3527a1da442d6b88b62e47f7b0d6c1b8df2d41b85dc57680deb34a2673da7355a4da41362cd35e87bd8935cab8af1d231aa6b488a789b4f942a2b90498864bd9824ca162eb528bac448ba2ef406c0195fc896b6ab1daf31ffc344256bc69e0d877baae4c005390a70cafd7706d27b8b3e33b277eb043ea4634b04d3789bf6221257643ca32c53b7db36f7927d48f4cd775b5f790b516a9ee52675475126dec5cefa0f441c3df9a1d9beabe82314dd596e594f8ed72b1e2c035c3c8d105b44d7eee5833bf73f3a36b205b51b70dd9d48234503725106de5d596c871864cdc88754c3161d01763e8335de5ebebde3cf6de605b8d070f2f8cec3058fbc9c5d4ef9dc8b1376e1848f7ca444ec7d3a70561e1c0bf7326afc59f99cab361a8c5d0075ae56940e714d3172e414c6bb33cb8a49b101b4e2aec086cf2a189e17075733ef47d6f6ec578a96656efacf1afe56db0b1208f43c8bddcc57f5ee8db59c46c275cdb49127d92f7befdadb56d37ccef91af95e21962153b612aea4845dc5a1b9718981f0aa1320f9a90b2342e335d92f24391e2533f3093f846a404d4f34ddf1f26fa1829133e6648f10f529fdeffa4dba9f9375a30dd050c3a36f502d38fbd2b5c99f9cdb972c48911061336967c08167cd020da3fcd1d4d9cf762e1af3da84f9a4af0eecfb8b04c701b188ee2fe0932cccf732b1ae6517b362cad57e1300ff9483a381e0d123372c22b2f1caeab5f4f8298baaee925d17f4087a75f735e9d4af20b0000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 08:21:19 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      link: '<http://localhost/api/v3/projects?page=1&per_page=100>; rel="first", <http://localhost/api/v3/projects?page=1&per_page=100>; rel="last"',
      etag: 'W/"4568d3770abe645a4a67a538d64ae3d3"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '1f82c7d6-2948-487a-bbcd-9e2a485b4fb0',
      'x-runtime': '0.089518',
      'content-encoding': 'gzip'
    });

  nock('http://localhost:80')
    .get('/api/v3/projects')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp", "per_page": "100", "page": "1"})
    .reply(200, ["1f8b0800000000000003e5966d6f9b3010c7bf8ac5eb94e7474bd5f61dd657eb2ae4c0257823c06c03aaaa7ef79d816421340fd52655daa4248ace77e7f3df773f787c31786ed06865e42033c11bc5ebcaa0c643c125c10f238da8bf43a6c88ef14ae11772b27e26aa00f245099e83200f20150849da4ac7ea4c1bd6962a5d0b56650526db31ed802b8a6dd3924b65d0c7a795d1b4eb926706ddb052c2ca60222b780758cd64e8b8e46b5e72f59c96d04169507b654859a4ad285355a7029a1ab36fb9fa5cd539745461214311d6f03b55ee98e8819b174a3527a1da442d6b88b62e47f7b0d6c1b8df2d41b85dc57680deb34a2673da7355a4da41362cd35e87bd8935cab8af1d231aa6b488a789b4f942a2b90498864bd9824ca162eb528bac448ba2ef406c0195fc896b6ab1daf31ffc344256bc69e0d877baae4c005390a70cafd7706d27b8b3e33b277eb043ea4634b04d3789bf6221257643ca32c53b7db36f7927d48f4cd775b5f790b516a9ee52675475126dec5cefa0f441c3df9a1d9beabe82314dd596e594f8ed72b1e2c035c3c8d105b44d7eee5833bf73f3a36b205b51b70dd9d48234503725106de5d596c871864cdc88754c3161d01763e8335de5ebebde3cf6de605b8d070f2f8cec3058fbc9c5d4ef9dc8b1376e1848f7ca444ec7d3a70561e1c0bf7326afc59f99cab361a8c5d0075ae56940e714d3172e414c6bb33cb8a49b101b4e2aec086cf2a189e17075733ef47d6f6ec578a96656efacf1afe56db0b1208f43c8bddcc57f5ee8db59c46c275cdb49127d92f7befdadb56d37ccef91af95e21962153b612aea4845dc5a1b9718981f0aa1320f9a90b2342e335d92f24391e2533f3093f846a404d4f34ddf1f26fa1829133e6648f10f529fdeffa4dba9f9375a30dd050c3a36f502d38fbd2b5c99f9cdb972c48911061336967c08167cd020da3fcd1d4d9cf762e1af3da84f9a4af0eecfb8b04c701b188ee2fe0932cccf732b1ae6517b362cad57e1300ff9483a381e0d123372c22b2f1caeab5f4f8298baaee925d17f4087a75f735e9d4af20b0000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 08:21:19 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      link: '<http://localhost/api/v3/projects?page=1&per_page=100>; rel="first", <http://localhost/api/v3/projects?page=1&per_page=100>; rel="last"',
      etag: 'W/"4568d3770abe645a4a67a538d64ae3d3"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '1f82c7d6-2948-487a-bbcd-9e2a485b4fb0',
      'x-runtime': '0.089518',
      'content-encoding': 'gzip'
    });

  //--------------------------------------------------------------------------------------
  //Simulate a 401 on bad credentials being sent
  nock('http://localhost:80')
    .get('/api/v3/projects')
    .query({"private_token": "badkey", "per_page": "100"})
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 08:32:44 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': '82e3262d-3a37-4a00-93c0-116b1886faf2',
      'x-runtime': '0.004822'
    });
};
