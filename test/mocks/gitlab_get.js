'use strict';

/*
 This file sets up mock responses as received from gitlab for each request fired
 during get operations.

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
  nock('http://localhost:80')
    .get('/api/v3/projects')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp", "per_page": "100"})
    .reply(200, ["1f8b0800000000000003e5966d6f9b3010c7bf0af2eb94674862a9dabec3fa6a5d850c5c823702cc36a0aaea77df199c2c84e6a1daa44a9b9444e87c773eff7df7238f2f84e7842e1724079909de285e57849287824b0b3fcc6a44fd1d3265ed18af147e21b7d2674b15607d5182e720ac07900a84b4da4ac7ea4c1bd6962a4905abb20293ed9876c015c5b649c9a522f4f169419a362d7946e8869512168489ace01d6035c6d071c9535e72f59c94d04149a8bb205216492bca44d58980a6c6ec5bae3e57750e1d5558c8508433fc9aca3d1b3d70f342a9e624549ba8e30cd1cee5e81e521d8cfbdd1284db556c07e83da9c498939eab22d10eb26199f63aec6d39a38cfbda31a2614a8b789a489b2f249a4a8069b8942dc8042a96965a64255a147d07620ba8e44f5c53b3d59effe0a711b2e24d03c7bee6ba32014c419e30bc5ee2bb5e74e7aeeebcd5831b537f4923d7f6d7abaf584889dd90b04cf14edfec5bde6b1a2e6ddff7b5f790b51689ee526f54d58836766e7050faa0e16fcd8e4d755fc198a66acbd2247ebb5cac38f2ed78e9e902da263f77ac89dfb9f9d135585b51b78db5a985d540dd9460692bafb6961c67c8c68d58c7141384be90a1cf7495afaf7bf3d87b836d311e3cbe30b2c360ed271753bf7722c7deb86120fd2b13698ea74f0bc2c1817fe74c5e8b3f339567c3508ba10fb4ca6640a714d3172e4198b5491e5cd24d880d2715760436f9d0c470b8ba291ffabeb7b762bc543bab77cef8e8041b6c2cc85731e441eee35310876eb664ae17a7ee7abdfc24ef43f75bebba7e9cdf235f2bc533c42a768229ea4845dc5a1be718981e0aa1320d3248991be7992e49f9a148096918d9ebd58d48896810da61384cf431520c3e2648090f529fdebfd1edd4fc1b2d98ee02063d9706911dae822b5c99f84db972c4891106061b733e44333e6810eddfe69e26ce7bb1f0d75ed4274d2578f7675c9827b80d0c4771ff0419a6e7b9150dd3a83d1be6d6ab7098867c241dbc80466b7be9c5b7fde1086888effb20fc0fe8f0f40bfc3991d8f20b0000"], {
      server: 'nginx',
      date: 'Tue, 18 Aug 2015 14:32:30 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      link: '<http://localhost/api/v3/projects?page=1&per_page=100>; rel="first", <http://localhost/api/v3/projects?page=1&per_page=100>; rel="last"',
      etag: 'W/"29dc98e2063c4571f4a98da2b681bb60"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '374db4c9-de67-4408-b9e8-49651bf8a7f3',
      'x-runtime': '0.616995',
      'content-encoding': 'gzip'
    });

  nock('http://localhost:80')
    .get('/api/v3/projects')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp", "per_page": "100", "page": "1"})
    .reply(200, ["1f8b0800000000000003e5966d6f9b3010c7bf0af2eb94674862a9dabec3fa6a5d850c5c823702cc36a0aaea77df199c2c84e6a1daa44a9b9444e87c773eff7df7238f2f84e7842e1724079909de285e57849287824b0b3fcc6a44fd1d3265ed18af147e21b7d2674b15607d5182e720ac07900a84b4da4ac7ea4c1bd6962a4905abb20293ed9876c015c5b649c9a522f4f169419a362d7946e8869512168489ace01d6035c6d071c9535e72f59c94d04149a8bb205216492bca44d58980a6c6ec5bae3e57750e1d5558c8508433fc9aca3d1b3d70f342a9e624549ba8e30cd1cee5e81e521d8cfbdd1284db556c07e83da9c498939eab22d10eb26199f63aec6d39a38cfbda31a2614a8b789a489b2f249a4a8069b8942dc8042a96965a64255a147d07620ba8e44f5c53b3d59effe0a711b2e24d03c7bee6ba32014c419e30bc5ee2bb5e74e7aeeebcd5831b537f4923d7f6d7abaf584889dd90b04cf14edfec5bde6b1a2e6ddff7b5f790b51689ee526f54d58836766e7050faa0e16fcd8e4d755fc198a66acbd2247ebb5cac38f2ed78e9e902da263f77ac89dfb9f9d135585b51b78db5a985d540dd9460692bafb6961c67c8c68d58c7141384be90a1cf7495afaf7bf3d87b836d311e3cbe30b2c360ed271753bf7722c7deb86120fd2b13698ea74f0bc2c1817fe74c5e8b3f339567c3508ba10fb4ca6640a714d3172e4198b5491e5cd24d880d2715760436f9d0c470b8ba291ffabeb7b762bc543bab77cef8e8041b6c2cc85731e441eee35310876eb664ae17a7ee7abdfc24ef43f75bebba7e9cdf235f2bc533c42a768229ea4845dc5a1be718981e0aa1320d3248991be7992e49f9a148096918d9ebd58d48896810da61384cf431520c3e2648090f529fdebfd1edd4fc1b2d98ee02063d9706911dae822b5c99f84db972c4891106061b733e44333e6810eddfe69e26ce7bb1f0d75ed4274d2578f7675c9827b80d0c4771ff0419a6e7b9150dd3a83d1be6d6ab7098867c241dbc80466b7be9c5b7fde1086888effb20fc0fe8f0f40bfc3991d8f20b0000"], {
      server: 'nginx',
      date: 'Tue, 18 Aug 2015 14:32:30 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      link: '<http://localhost/api/v3/projects?page=1&per_page=100>; rel="first", <http://localhost/api/v3/projects?page=1&per_page=100>; rel="last"',
      etag: 'W/"29dc98e2063c4571f4a98da2b681bb60"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '374db4c9-de67-4408-b9e8-49651bf8a7f3',
      'x-runtime': '0.616995',
      'content-encoding': 'gzip'
    });

  //mocks a response when incorrect credentials are specified
  nock('http://localhost:80')
    .get('/api/v3/projects')
    .query({"private_token": "zRtVsmeznn7ySatTrnra", "per_page": "100"})
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 01:09:38 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': '4eb8c9f8-3a0c-4b70-aa9a-cfd61ea15b87',
      'x-runtime': '0.444739'
    });

  //mocks a response when an incorrect path is specified
  nock('http://localhost:80')
    .get('/api/v3/nonexistentpath')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp", "per_page": "100"})
    .reply(404, ["1f8b08000000000000039551b152c3300cddf315c24b61a9e9b5639a053816383a74615462a5f6c5b173b6c291bf4771e00358ec93a5f7f4de737df7fcf174fdbcbc80e5d13755fd77119aa602a8d9b1a7e66a0926bc112c71de25021fe3e0c20dfa98a08bb3371022434bf2300703f7a7c7d343ad37eccae25d18c026eacf4a674676ddbecb59c148c6e159e52e11050589bc14bc78ca968815f032d159317db32ef35a146a5bb455751bcd5234da43230ba571d8cae33ff5ee057adca0493608e3d4bce3409067f1cae21d8d499433b82c7653a28e01c5275be4d22fd958cc61c730c62f324239fd325d3c6126c10546c14982095e1dbf612bb4a30b2e734296205dbf36856f0d4bceb20e61940111b331d67a732d8acb7ffd000988a5bfc0010000"], {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 01:21:43 GMT',
      'content-type': 'text/html; charset=utf-8',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '404 Not Found',
      'x-frame-options': 'DENY',
      'x-xss-protection': '1; mode=block',
      'x-content-type-options': 'nosniff',
      'x-ua-compatible': 'IE=edge',
      'cache-control': 'no-cache',
      'x-request-id': '78eec92b-b96f-49bb-a46f-3b9ed7d8ff71',
      'x-runtime': '0.077683',
      'content-encoding': 'gzip'
    });
};
