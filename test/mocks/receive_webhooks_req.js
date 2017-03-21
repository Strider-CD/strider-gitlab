//This is a mock for a request passed in to the receiveWebhooks function
//It contains the payload received from the gitlab server in
//body and project information from strider

module.exports = {
  body: {
    object_kind: 'push',
    before: 'e85d185fdd17ebb379495f5ec14426134ce02837',
    after: '6a00c57e69bd4e269496ca27973191ecafcf8b20',
    ref: 'refs/heads/master',
    checkout_sha: '6a00c57e69bd4e269496ca27973191ecafcf8b20',
    message: null,
    user_id: 3,
    user_name: 'Strider Tester',
    user_email: 'stridertester@gmail.com',
    project_id: 5,
    repository: {
      name: 'privproject1',
      url: 'git@nodev:stridertester/privproject1.git',
      description: 'Test project 1.',
      homepage: 'http://nodev/stridertester/privproject1',
      git_http_url: 'http://nodev/stridertester/privproject1.git',
      git_ssh_url: 'git@nodev:stridertester/privproject1.git',
      visibility_level: 0
    },
    commits: [{
      id: '6a00c57e69bd4e269496ca27973191ecafcf8b20',
      message: 'testing webhook receiving\n',
      timestamp: '2015-08-26T21:25:22+09:00',
      url: 'http://nodev/stridertester/privproject1/commit/6a00c57e69bd4e269496ca27973191ecafcf8b20',
      author: {name: 'Strider Tester', email: 'stridertester@gmail.com'}
    }],
    total_commits_count: 1
  }
  ,
  project: {
    name: "stridertester/privproject1",
    creator: {
      _id: "55d2ecb5edb0d634165eac37"
    },
    branch: function(branchname) {
      //mocked to only return the master branch
      return {
        name: 'master',
        pubkey: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDWHmPMdv+QDoR/vaPcu4yk/sn23B4wNQe3bGTtrIUjMj/7Ih3gy7XWGDUxCpVjTgq3LOfIK3Uu9cnHHV8KUQF7edF16MBMvZT2IsDgErXMEeWLYL7Or7yi6Oa9JGYSSxJXoKh8tMSqFooXFnppK9MtKCuuj2F537s9v/0fbL9WdIja5xMX0tDm7jGCSzMJhG7WYdzJ+GoX7Y9w+6JuWwTHIFavX8xVxJ59InxQ+GiHszibRcgnDUam3/QG9v/z9aeLNB7tngXX8NaszwAj1OA1sZnotmGrO0byH2zhcG7QPWYJkk94ZAz9TZMzEOqGze0Guh/A8VZOPRZjaWKKhx6B stridertester/privproject1-stridertester@gmail.com\n',
        privkey: '-----BEGIN RSA PRIVATE KEY-----\nMIIEogIBAAKCAQEA1h5jzHb/kA6Ef72j3LuMpP7J9tweMDUHt2xk7ayFIzI/+yId\n4Mu11hg1MQqVY04KtyznyCt1LvXJxx1fClEBe3nRdejATL2U9iLA4BK1zBHli2C+\nzq+8oujmvSRmEksSV6CofLTEqhaKFxZ6aSvTLSgrro9hed+7Pb/9H2y/VnSI2ucT\nF9LQ5u4xgkszCYRu1mHcyfhqF+2PcPuiblsExyBWr1/MVcSefSJ8UPhoh7M4m0XI\nJw1Gpt/0Bvb/8/WnizQe7Z4F1/DWrM8AI9TgNbGZ6LZhqztG8h9s4XBu0D1mCZJP\neGQM/U2TMxDqhs3tBrofwPFWTj0WY2liiocegQIDAQABAoIBAE4yHwRG2SJFCwKT\nwUoVfFGtcxiiXqwAUeccwOdDwAOQkGkolnzIKIodoR9d3By+HY+z6JnjtRIHVT9Q\nbKsZ1k6/uE01STU9by9Mld+/NYFnb8ss88ILz/o20D13E4fOvs4dsCqK4d+0B45S\n+TV7ec3eA8XmOxUFLh5pBQn67w2lKmmslmQVdHovPifQLDrRLnmJs5WdS5FYFgGj\nVY4N1unyJ1a42YpcxDQgYYJilCrWtQ58L5FY2zE87y9p3uljxnBiFULuWdPIlWMq\nJ0cjp6IWlkl1lR7zfAIGK989VgNchcStZGRz3yGMnQYT7S20zEWX4MBkmQYUrbVf\nZ4xd9KECgYEA7JOJB1TEhRJPXPFW6uIWxz0INSHoDp4ue7TGvGhWouC7o7Ed+cdc\nbZL+Naqf34ZB9ZpPFxI9t2CDc3Xzb9jRlAja/kVAksojaJCXMqDuDtaCeUjpD5hh\ndQq3ZDF/B5aC67/1fOm++rv/ZusQt8yeo/RRYJSajb9AR5N9n8sHLnUCgYEA57LU\ntSNNAxRkucAkTooo0oEGg1GLae4JsyyFxQAkCE/YZUmZKfOhpPUhiqst9XhaI08o\n++/9hpE2DlQe2xfsvIxgIGlZDlEZCfRu9+sM0s7OWGSh+U/VXDAowczJwAnN48Js\nUKTuwBgQYuNXKk19y37omqHq0sxScWRe4izyhl0CgYAH0o0KYAQrfkJ/iT9dfuJP\n7jWyRA+/Q/23e2/C1RRgSFwL+pRKKQxmVyDut1iX9IGD1HlfAuxlftx52eGVxi6P\n3YcYN0P+Vo67K2TEeMvGU9N2nTGPoXM/gn4z4usXXiOwFeXRHo2BDuxQA9/GpA5u\nz2pNbjx6CWPfugHCYd037QKBgE3MuKvSHKvqDyBoKkjND4QPmxZBLWT2bv9g9dH+\niBraZLkuC2YQzrhLL2YWsKn6LZopnINsRF8JJ3OMP4gl8nIlWKnJdgPeq1+yWgiZ\nPocStirsL489hVEdQrJAh4YaRK4zvJcfqqOJ8Qaje8NSnejUxloWAHmj7hLxNwMP\nQKhpAoGAEt5A8mlohNoJAEJyoO0dH2m2oyBhxSGOhNdwE0GPMdOeDlLhkkn0JB+8\n+y9j+jCpjEpOfHkPZ7gVOkWgZUZwhbzYkDmfy8OXFuVUtUtDHvF7MoHGCXBsVpCq\nCuBauEVw5orSfYJXFwoFYwLbiXSVBdNVvNMsC6bDwi1J701SsOU=\n-----END RSA PRIVATE KEY-----\n',
        _id: "55dac66a7946e3a309c92f68",
        runner: {id: 'simple-runner', config: {pty: false}},
        plugins: [{
          id: 'node',
          enabled: true,
          config: {},
          _id: "55dac66a7946e3a309c92f69",
          showStatus: true
        }],
        deploy_on_green: true,
        mirror_master: false,
        active: true
      }
    }
  }
};
