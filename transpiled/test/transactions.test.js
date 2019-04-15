"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/no-extraneous-dependencies */
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var endpointPath = '/api/v1/transactions/';
describe('Transactions Test', function () {
  // -----------CREDIT ACCOUNT--------------
  describe("POST ".concat(endpointPath, ":accountNumber/credit"), function () {
    // return 201 and succesfully credit the account
    it('should succesfully credit an account', function (done) {
      var login = {
        email: 'ayo@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login).end(function (logErr, logRes) {
        var token = "Bearer ".concat(logRes.body.data.token);

        _chai["default"].request(_index["default"]).post("".concat(endpointPath, "9987654321/credit")).set('Authorization', token).send({
          cashier: 101,
          amount: 9000
        }).end(function (err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('amount');
          res.body.data.should.have.property('accountNumber');
          res.body.data.should.have.property('cashier');
          res.body.data.should.have.property('transactionType');
          res.body.data.should.have.property('accountBalance');
          done();
        });
      });
    }); // return 400 if amount wasnt specified

    it('should return 400 if user omit amount', function (done) {
      var login = {
        email: 'ayo@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login).end(function (logErr, logRes) {
        var token = "Bearer ".concat(logRes.body.data.token);

        _chai["default"].request(_index["default"]).post("".concat(endpointPath, "9987654321/credit")).set('Authorization', token).send({}).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });
    }); // return 404 if accountNumber was not be found

    it('should return 404 if account number was not found', function (done) {
      var login = {
        email: 'ayo@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login).end(function (logErr, logRes) {
        var token = "Bearer ".concat(logRes.body.data.token);

        _chai["default"].request(_index["default"]).post("".concat(endpointPath, "99874321/credit")).set('Authorization', token).send({}).end(function (err, res) {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });
    });
  }); // -----------DEBIT ACCOUNT--------------

  describe("POST ".concat(endpointPath, ":accountNumber/debit"), function () {
    // return 201 and succesfully debit the account
    it('should succefully debit an account', function (done) {
      var login = {
        email: 'ayo@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login).end(function (logErr, logRes) {
        var token = "Bearer ".concat(logRes.body.data.token);

        _chai["default"].request(_index["default"]).post("".concat(endpointPath, "9987654321/debit")).send({
          amount: 1233
        }).set('Authorization', token).end(function (err, res) {
          res.should.have.status(201);
          res.should.be.a('object');
          res.body.should.have.a.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('amount');
          res.body.data.should.have.property('transactionId');
          res.body.data.should.have.property('transactionType');
          res.body.data.should.have.property('transactionType');
          done();
        });
      });
    }); // return 400 if amount wasnt specified

    it('should return 400 if user omit amount', function (done) {
      var login = {
        email: 'ayo@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post('/api/v1/auth/signin').send(login).end(function (logErr, logRes) {
        var token = "Bearer ".concat(logRes.body.data.token);

        _chai["default"].request(_index["default"]).post("".concat(endpointPath, "9987654321/debit")).set('Authorization', token).send({}).end(function (err, res) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
      });
    });
  });
});