'use strict';

/*
 Simulation of responses from server when we
 request the addition of a deploy key.

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
  //simulate a Created 201 response when we try to deploy ssh keys for a project
  nock('http://localhost:80')
    .post('/api/v3/projects/5/deploy_keys', {
      "title": "strider-stridertester/privproject1",
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDAMoSHhKfeE3/oXanAQEZO0Sq20SMjvjmJlTy+CaGz/1uk+glLXi9u2RKtfPRZDceAgyEtRUpqya9Uo1v9bjkIckGLhQwXdSo2G6O3QuzpE3gc6AXTDPQ0ZkkXbSdU9VGL1Zzr+maBnvfwK6IlsNz3fLa4lNV7vz1LaGCg9D1jP+nufZjuDiCAno7D607oG1iHQ3x/BqzphUATav3DFQFT2FBmmittQT0l0mMJ4XsQCQXkwNbDjkLYNon8FYPm9U3AOlzicOGteebt5mhsQtfl9+lL99B8+fk8b24pEEbOxZ4l0HcwMI1R5OLoTzPwSvVw+bp3YPhH2IzfFwK5NUk7 stridertester/privproject1-stridertester@gmail.com\n"
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(201, {
      "id": 12,
      "title": "strider-stridertester/privproject1",
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDAMoSHhKfeE3/oXanAQEZO0Sq20SMjvjmJlTy+CaGz/1uk+glLXi9u2RKtfPRZDceAgyEtRUpqya9Uo1v9bjkIckGLhQwXdSo2G6O3QuzpE3gc6AXTDPQ0ZkkXbSdU9VGL1Zzr+maBnvfwK6IlsNz3fLa4lNV7vz1LaGCg9D1jP+nufZjuDiCAno7D607oG1iHQ3x/BqzphUATav3DFQFT2FBmmittQT0l0mMJ4XsQCQXkwNbDjkLYNon8FYPm9U3AOlzicOGteebt5mhsQtfl9+lL99B8+fk8b24pEEbOxZ4l0HcwMI1R5OLoTzPwSvVw+bp3YPhH2IzfFwK5NUk7 stridertester/privproject1-stridertester@gmail.com",
      "created_at": "2015-08-19T03:35:01.863Z"
    }, {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 03:35:01 GMT',
      'content-type': 'application/json',
      'content-length': '534',
      connection: 'close',
      status: '201 Created',
      etag: '"5a11f9a2bf20878df6e3de77364e297c"',
      'cache-control': 'max-age=0, private, must-revalidate',
      'x-request-id': '565d54e9-f03b-4077-8cf4-a93503060889',
      'x-runtime': '0.099917'
    });

  //--------------------------------------------------------------------------------------
  //simulate a 400 Bad Request response when an invalid key is sent
  nock('http://localhost:80')
    .post('/api/v3/projects/5/deploy_keys', {"title": "strider-stridertester/privproject1", "key": "invalid-key"})
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(400, {"message": {"key": ["is invalid"], "fingerprint": ["cannot be generated"]}}, {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 04:35:26 GMT',
      'content-type': 'application/json',
      'content-length': '72',
      connection: 'close',
      status: '400 Bad Request',
      'cache-control': 'no-cache',
      'x-request-id': '907e7139-cb13-407a-864f-a91ce108e419',
      'x-runtime': '0.054109'
    });

  //--------------------------------------------------------------------------------------
  //simulate a 401 Unauthorized response when invalid credentials are used
  nock('http://localhost:80')
    .post('/api/v3/projects/5/deploy_keys', {
      "title": "strider-stridertester/privproject1",
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDAMoSHhKfeE3/oXanAQEZO0Sq20SMjvjmJlTy+CaGz/1uk+glLXi9u2RKtfPRZDceAgyEtRUpqya9Uo1v9bjkIckGLhQwXdSo2G6O3QuzpE3gc6AXTDPQ0ZkkXbSdU9VGL1Zzr+maBnvfwK6IlsNz3fLa4lNV7vz1LaGCg9D1jP+nufZjuDiCAno7D607oG1iHQ3x/BqzphUATav3DFQFT2FBmmittQT0l0mMJ4XsQCQXkwNbDjkLYNon8FYPm9U3AOlzicOGteebt5mhsQtfl9+lL99B8+fk8b24pEEbOxZ4l0HcwMI1R5OLoTzPwSvVw+bp3YPhH2IzfFwK5NUk7 stridertester/privproject1-stridertester@gmail.com\n"
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnra"})
    .reply(401, {"message": "401 Unauthorized"}, {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 05:03:45 GMT',
      'content-type': 'application/json',
      'content-length': '30',
      connection: 'close',
      status: '401 Unauthorized',
      'cache-control': 'no-cache',
      'x-request-id': '282a2411-dd11-4026-90b3-8a36560c0512',
      'x-runtime': '0.004726'
    });

  //--------------------------------------------------------------------------------------
  //simulate a 404 response when project could not be found
  nock('http://localhost:80')
    .post('/api/v3/projects/wrong%20repo%20id/deploy_keys', {
      "title": "strider-stridertester/privproject1",
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDAMoSHhKfeE3/oXanAQEZO0Sq20SMjvjmJlTy+CaGz/1uk+glLXi9u2RKtfPRZDceAgyEtRUpqya9Uo1v9bjkIckGLhQwXdSo2G6O3QuzpE3gc6AXTDPQ0ZkkXbSdU9VGL1Zzr+maBnvfwK6IlsNz3fLa4lNV7vz1LaGCg9D1jP+nufZjuDiCAno7D607oG1iHQ3x/BqzphUATav3DFQFT2FBmmittQT0l0mMJ4XsQCQXkwNbDjkLYNon8FYPm9U3AOlzicOGteebt5mhsQtfl9+lL99B8+fk8b24pEEbOxZ4l0HcwMI1R5OLoTzPwSvVw+bp3YPhH2IzfFwK5NUk7 stridertester/privproject1-stridertester@gmail.com\n"
    })
    .query({"private_token": "zRtVsmeznn7ySatTrnrp"})
    .reply(404, ["1f8b0800000000000003ab56ca4d2d2e4e4c4f55b252323130510828cacf4a4d2e51f0cb2f5170cb2fcd4b51aa050037095a2823000000"], {
      server: 'nginx',
      date: 'Wed, 19 Aug 2015 05:25:00 GMT',
      'content-type': 'application/json',
      'transfer-encoding': 'chunked',
      connection: 'close',
      status: '404 Not Found',
      'cache-control': 'no-cache',
      'x-request-id': '2c64ae26-d7b1-4caf-8efd-300893dedf37',
      'x-runtime': '0.005714',
      'content-encoding': 'gzip'
    });
}
