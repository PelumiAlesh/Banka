"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var endpointPath = '/api/v1/accounts/';
describe('Test for Endpoits', function () {
  describe('Test For endpoint', function () {
    // return 200 if you make a get request to /api/v1
    it('should return 200 and load succesfully', function (done) {
      _chai["default"].request(_index["default"]).get('/api/v1').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.property('message');
        done();
      });
    }); // return 404 if users makes request to unknown endpoint

    it('should return 404 if endpoint is unknow', function (done) {
      _chai["default"].request(_index["default"]).get('*').end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
  });
  describe('Test for all protected endpoints', function () {
    // return 401 if token is invalid
    it('should return 401 if token couldnt be verified', function (done) {
      _chai["default"].request(_index["default"]).post("".concat(endpointPath)).set('Authorization', 'invalidToken').send({
        type: 'savings',
        initialDeposit: 2345609
      }).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
    }); // return 401 if client try to access staff endpoint

    it('should return 401 if token is not from staff account', function (done) {
      var login = {
        email: 'pels@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login).end(function (logErr, logRes) {
        var token = "Bearer ".concat(logRes.body.data.token);

        _chai["default"].request(_index["default"]).patch("".concat(endpointPath, "1234567890")).set('Authorization', token).send({
          status: 'dormant'
        }).end(function (err, res) {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });
    }); // return 401 if token couldnt be Authenticated

    it('should return 401 if token couldnt be Authenticated', function (done) {
      var login = {
        email: 'ayo@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login).end(function () {
        _chai["default"].request(_index["default"]).patch("".concat(endpointPath, "1234567890")).set('Authorization', 'invalidToken').send({
          status: 'dormant'
        }).end(function (err, res) {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });
    });
  });
});