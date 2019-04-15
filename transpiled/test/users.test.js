"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable import/no-extraneous-dependencies */
_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var endpointPath = '/api/v1/auth/';
describe('Test for Authentication (SignIn and SignUp) Endpoints', function () {
  // ---------USER SIGNUP TESTS--------
  describe("POST ".concat(endpointPath, "signup"), function () {
    // return 201 if new user was succesfully created
    it('should  succesfully create a new user', function (done) {
      var user = {
        firstName: 'Pelumi',
        lastName: 'Aleshinloye',
        email: 'pelss@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post("".concat(endpointPath, "signup")).send(user).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('token');
        done();
      });
    }); // return 401 if firstName field was left empty

    it('should return 401 if user ommit firstName', function (done) {
      var user = {
        lastName: 'Aleshinloye',
        email: 'pels@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post("".concat(endpointPath, "signup")).send(user).end(function (err, res) {
        res.should.have.status(401);
        res.should.have.property('error');
        done();
      });
    }); // return 401 if lastName field was left empty

    it('should return 401 if user ommit LastName', function (done) {
      var user = {
        firstName: 'Pelumi',
        email: 'pels@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post("".concat(endpointPath, "signup")).send(user).end(function (err, res) {
        res.should.have.status(401);
        res.should.have.property('error');
        done();
      });
    }); // return 401 if email field was left empty

    it('should return 401 if user ommit email', function (done) {
      var user = {
        firstName: 'Pelumi',
        lastName: 'Aleshinloye',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post("".concat(endpointPath, "signup")).send(user).end(function (err, res) {
        res.should.have.status(401);
        res.should.have.property('error');
        done();
      });
    }); // return 401 if password field was left empty

    it('should return 401 if user ommit password', function (done) {
      var user = {
        firstName: 'Pelumi',
        email: 'pels@gmail.com'
      };

      _chai["default"].request(_index["default"]).post("".concat(endpointPath, "signup")).send(user).end(function (err, res) {
        res.should.have.status(401);
        res.should.have.property('error');
        done();
      });
    }); // return 409 if email already exist

    it('should return 409 if email already exist', function (done) {
      var user = {
        firstName: 'Pelumi',
        lastName: 'Aleshinloye',
        email: 'pels@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post("".concat(endpointPath, "signup")).send(user).end(function (err, res) {
        res.should.have.status(409);
        res.should.be.a('object');
        res.should.have.property('error');
        done();
      });
    });
  }); // ------------USER SIGNIN TEST---------

  describe("POST ".concat(endpointPath, "signin"), function () {
    // return 201 and return a token if valid credentials were provided
    it('Should login the user succesfully and return a token', function (done) {
      var loginBody = {
        email: 'pelss@gmail.com',
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post("".concat(endpointPath, "signin")).send(loginBody).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.have.a('object');
        res.body.data.should.have.property('token');
        done();
      });
    }); // return 401 if email field was left empty

    it('should return error 401 if user omit email', function (done) {
      var loginBody = {
        password: 'password'
      };

      _chai["default"].request(_index["default"]).post("".concat(endpointPath, "signin")).send(loginBody).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.a('object');
        res.body.should.have.property('error');
        done();
      });
    }); // return 401 if password was left empty

    it('should return error 401 if user omit password', function (done) {
      var loginBody = {
        email: 'pels@gmail.com'
      };

      _chai["default"].request(_index["default"]).post("".concat(endpointPath, "signin")).send(loginBody).end(function (err, res) {
        res.should.have.status(401);
        res.should.be.a('object');
        res.should.have.property('error');
        done();
      });
    }); // return error 401 if password and email does not match

    it('should return error 401 if email and password does not match', function (done) {
      var loginBody = {
        email: 'wrong@gmai.bjd',
        password: 'wrong'
      };

      _chai["default"].request(_index["default"]).post("".concat(endpointPath, "signin")).send(loginBody).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal('Authentication Failed: Email or Password is incorrect');
        done();
      });
    });
  });
});