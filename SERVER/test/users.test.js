/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

const endpointPath = '/api/v1/auth/';

describe('Test for Authentication (SignIn and SignUp) Endpoints', () => {
  // ---------USER SIGNUP TESTS--------
  describe(`POST ${endpointPath}signup`, () => {
    // return 201 if new user was succesfully created
    it('should  succesfully create a new user', (done) => {
      const user = {
        firstName: 'Pelumi',
        lastName: 'Aleshinloye',
        email: 'pelsis@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data[0].should.have.property('firstName');
          res.body.data[0].should.have.property('lastName');
          res.body.data[0].should.have.property('email');
          res.body.data[0].should.have.property('token');
          done();
        });
    });
    // return 400 if firstname field was left empty
    it('should return 401 if user ommit firstname', (done) => {
      const user = {
        lastName: 'Aleshinloye',
        email: 'pels@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.property('error');
          done();
        });
    });
    // return 400 if lastName field was left empty
    it('should return 401 if user ommit Lastname', (done) => {
      const user = {
        firstName: 'Pelumi',
        email: 'pels@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.property('error');
          done();
        });
    });
    // return 400 if email field was left empty
    it('should return 401 if user ommit email', (done) => {
      const user = {
        firstName: 'Pelumi',
        lastName: 'Aleshinloye',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.property('error');
          done();
        });
    });
    // return 400 if password field was left empty
    it('should return 401 if user ommit password', (done) => {
      const user = {
        firstName: 'Pelumi',
        email: 'pels@gmail.com',
      };
      chai
        .request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.property('error');
          done();
        });
    });
    // return 409 if email already exist
    it('should return 409 if email already exist', (done) => {
      const user = {
        firstName: 'Pelumi',
        lastName: 'Aleshinloye',
        email: 'pels@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.should.be.a('object');
          res.should.have.property('error');
          done();
        });
    });
  });
  // ------------USER SIGNIN TEST---------
  describe(`POST ${endpointPath}signin`, () => {
    // return 200 and return a token if valid credentials were provided
    it('Should login the user succesfully and return a token', (done) => {
      const loginBody = {
        email: 'pels@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post(`${endpointPath}signin`)
        .send(loginBody)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data[0].should.have.a('object');
          res.body.data[0].should.have.property('token');
          done();
        });
    });
    // return 400 if email field was left empty
    it('should return error 401 if user omit email', (done) => {
      const loginBody = {
        password: 'password',
      };
      chai
        .request(app)
        .post(`${endpointPath}signin`)
        .send(loginBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    // return 400 if password was left empty
    it('should return error 401 if user omit password', (done) => {
      const loginBody = {
        email: 'pels@gmail.com',
      };
      chai
        .request(app)
        .post(`${endpointPath}signin`)
        .send(loginBody)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.a('object');
          res.should.have.property('error');
          done();
        });
    });
    // return error 400 if password and email does not match
    it('should return error 401 if email and password does not match', (done) => {
      const loginBody = {
        email: 'wrong@gmai.bjd',
        password: 'wrong',
      };
      chai
        .request(app)
        .post(`${endpointPath}signin`)
        .send(loginBody)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Authentication Failed: Email or Password is incorrect');
          done();
        });
    });
  });
});
