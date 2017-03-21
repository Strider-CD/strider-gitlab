/*
 Here we simulate the response of the server when asked
 to get a list of branches from the privproject1 repo

 nock will simulate a gitlab server running at
 localhost:80, where Strider Tester, a user is
 registered with the name "stridertester", and
 has been registered with api token - zRtVsmeznn7ySatTrnrp
 stridertester is an "owner" of a group named "testunion"
 and has admin access to three projects -
 testunion / unionproject1
 Strider Tester / pubproject1
 Strider Tester / privproject1

 privproject has two branches firstbranch and master
 */

const nock = require('nock');

module.exports = function() {

  //--------------------------------------------------------------------------------------
  //Simulate a good response that sends the correct branches
  nock('http://localhost:80')
    .get('/api/v3/projects/5/repository/branches')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp", "per_page": "100"})
    .reply(200, ["1f8b0800000000000003bd914f4f023110c5bf0ae95520fdb74bdb9346397a516e48c8b49d42137631dd723084ef6e1102c68872d1ebbc99f732ef37dd92161a24868498ba6c13b46e49fac4ad9b266662b624fa22faa0400826a5422aaa5a680ca09c730a3c30e625b35450a145b96cb0eb60b177bc5f42bb40df7b1adf3d3c8e878d7f698bfe0a09db3c8fbe23664a24ad9d05ad99b3b606ea18adb50e0e2d528e4e0b1194ac2b2fc9ac4f609397eb847eee21effd3965d580aa01e71356994a19560d29a537541b4a4bd2617f7efcef39a7e831f526d8654c67191b88abe2d61df4fc21df2ef6d36169e1d445be3ef8505eb1b9987ddef82d7e571a4beb8caee4131360d5e1ae7f82d6c0f1992fbcaeaef5332ff0bed0b2b185f4d60b7185dff01a8112bc70d1b5171c582d1843096847ca8f2cd5238bdc0685f8132fa6275c18ce8c90ffcbeb52f0dff1ca6983bbd93b8b937b0e65030000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 07:32:10 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '200 OK',
      etag: 'W/"a5766ebd98e6dcefebb0256942be9cf1"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '6166a894-b650-4e17-9057-6c23bc4e959f',
      'x-runtime': '0.019611',
      'content-encoding': 'gzip'
    });

  //--------------------------------------------------------------------------------------
  //Simulate a 401 when bad credentials are sent
  nock('http://localhost:80')
    .get('/api/v3/projects/5/repository/branches')
    .query({"private_token": "badkey", "per_page": "100"})
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 07:45:55 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': 'c487af2c-3a4f-45ff-938e-9ee196429b65',
      'x-runtime': '0.003879'
    });

  //--------------------------------------------------------------------------------------
  //Simulate a 404 when an invalid repo id of "invalidrepo" is sent
  //Heaven forbid that there actually is a project with repo ID "NaN"
  nock('http://localhost:80')
    .get('/api/v3/projects/NaN/repository/branches')
    .query({"private_token": "zRtVsmeznn7ySatTrnrp", "per_page": "100"})
    .reply(404, ["1f8b0800000000000003ab56ca4d2d2e4e4c4f55b252323130510828cacf4a4d2e51f0cb2f5170cb2fcd4b51aa050037095a2823000000"], {
      server: 'nginx',
      date: 'Sat, 22 Aug 2015 07:56:44 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '404 Not Found',
      'cache-control': 'no-cache',
      'x-request-id': '60c9a1ef-0dbf-4533-8f6e-0aded176d319',
      'x-runtime': '0.006694',
      'content-encoding': 'gzip'
    });
};
