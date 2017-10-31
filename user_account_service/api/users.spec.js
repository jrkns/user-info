var request = require('supertest');
var should = require('should');
var server = require('../server/server');

describe('Users API', () => {

  //  Our running app (rebuilt for each test) and our repo, which
  //  we can mock for each test.
  var app = null;
  var testUsers = [{
      id: '1',
      username: 'alice',
      phone_number: '1234567890'
    }, {
      id: '2',
      username: 'bob',
      phone_number: '2345678901'
    }
  ];
  var testRepo = {
    getUsers: () => { 
      return Promise.resolve(testUsers);
    },
    getUserByUsername: (username) => { 
      return Promise.resolve(testUsers.find((user) => {
        return user.username === username;
      }));
    }
  };
  
  beforeEach(() => {
    return server.start({
      port: 1234,
      repository: testRepo
    }).then(function (svr) {
      app = svr;
    });
  });

  afterEach(() => {
    app.close();
    app = null;
  });

  it('can return all users', (done) => {

    request(app)
      .get('/users')
      .expect(function(res) {
        res.body.should.containEql({
          id: '1',
          username: 'alice',
          phone_number: '1234567890'
        });
      res.body.should.containEql({
          id: '2',
          username: 'bob',
          phone_number: '2345678901'
        });
      })
      .expect(200, done);

  });

  it('returns a 404 for an unknown user', (done) => {

    request(app)
      .get('/?username=unknownperson')
      .expect(404, done);
  });

  it('returns a 200 for a known user', (done) => {

    request(app)
      .get('/?username=alice')
      .expect(200, done);
  });

});