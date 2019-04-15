"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var endpointPath = '/api/v1/accounts';
describe('Test for all account Endpoints', function () {
  // --------------CREATE NEW ACCOUNT-----------------
  describe('Account Creation Tests', function () {
    describe("POST ".concat(endpointPath), function () {
      // return 201 and create account succesfully
      it('should create a new account succesfully ', function (done) {
        var login = {
          email: 'pels@gmail.com',
          password: 'password'
        };

        _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login).end(function (_logErr, Res) {
          var token = "Bearer ".concat(Res.body.data.token);
          var input = {
            type: 'savings',
            initialDeposit: 2341.4
          };

          _chai["default"].request(_index["default"]).post(endpointPath).set('Authorization', token).send(input).end(function (_err, res) {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('accountNumber');
            res.body.data.should.have.property('firstName');
            res.body.data.should.have.property('lastName');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('type');
            done();
          });
        });
      }); // return 401 if token authentication fails

      it('should return 401 when the token couldnt be verified', function (done) {
        var login = {
          email: 'pels@gmail.com',
          password: 'password'
        };

        _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login) // eslint-disable-next-line no-unused-vars
        .end(function (_logErr, _Res) {
          var token = 'Bearer dfsW262gvh829Bv_hgvs#%^#';
          var input = {
            type: 'savings',
            initialDeposit: 2341.4
          };

          _chai["default"].request(_index["default"]).post(endpointPath).set('Authorization', token).send(input).end(function (_err, res) {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
        });
      });
    });
  }); // ---------------------ACCOUNT STATUS TEST--------------

  describe('Account Status change test', function () {
    describe("PATCH ".concat(endpointPath, "/:accountNumber"), function () {
      // return 200 and change account status successfully
      it('should change account status succesfully', function (done) {
        var login = {
          email: 'ayo@gmail.com',
          password: 'password'
        };
        var status = {
          status: 'dormant'
        };

        _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login).end(function (_logErr, logRes) {
          var token = "Bearer ".concat(logRes.body.data.token);

          _chai["default"].request(_index["default"]).patch("".concat(endpointPath, "/1234567890")).set('Authorization', token).send(status).end(function (_err, res) {
            res.should.have.status(200);
            res.body.should.have.property('data');
            res.body.data.should.have.property('accountNumber');
            res.body.data.should.have.property('status').eql('dormant');
            done();
          });
        });
      }); // return 400 if the new status field is left empty

      it('should return error 400 if new status is left empty', function (done) {
        _chai["default"].request(_index["default"]).patch("".concat(endpointPath, "/1234567890")).send({}).end(function (_err, res) {
          res.should.have.status(400);
          res.body.should.have.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      }); // return 400 if the new status field is invalid

      it('should return error 400 if new status in valid', function (done) {
        _chai["default"].request(_index["default"]).patch("".concat(endpointPath, "/1234567890")).send({
          status: 'actibe'
        }).end(function (_err, res) {
          res.should.have.status(400);
          res.body.should.have.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      }); // return 400 if account was not found

      it('should return error 400 if the account number could not be found', function (done) {
        _chai["default"].request(_index["default"]).patch("".concat(endpointPath, "/12345678")).send({
          status: 'active'
        }).end(function (_err, res) {
          res.should.have.status(400);
          res.body.should.have.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });
    });
  }); // ------------------DELETE ACCOUNT-------------

  describe('Delete Account Test', function () {
    describe("DELETE ".concat(endpointPath, "/:accountNumber"), function () {
      // return 200 and delete account succesfully
      it('should delete account successfully', function (done) {
        var login = {
          email: 'ayo@gmail.com',
          password: 'password'
        };

        _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login).end(function (_logErr, logRes) {
          var token = "Bearer ".concat(logRes.body.data.token);
          var accountNumber = 1234567890;

          _chai["default"].request(_index["default"])["delete"]("".concat(endpointPath, "/").concat(accountNumber)).set('Authorization', token).end(function (_err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
        });
      }); // return 404 if user tries to delete account that doesnt exist

      it('should return 404 if account does not exist', function (done) {
        var login = {
          email: 'ayo@gmail.com',
          password: 'password'
        };

        _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login).end(function (_logErr, logRes) {
          var token = "Bearer ".concat(logRes.body.data.token);
          var accountNumber = 1987634567890;

          _chai["default"].request(_index["default"])["delete"]("".concat(endpointPath, "/").concat(accountNumber)).set('Authorization', token).end(function (_err, res) {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
          });
        });
      });
    });
  });
});