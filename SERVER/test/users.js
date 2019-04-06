import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

const endpointPath = '/api/v1/auth/';

describe('Test for Authentication(SignIn and SignUp) Endpoints', () => {
  describe(`POST ${endpointPath}signup`, () => {
    // return 201 if new user was succesfully created
    it('should  succesfully create a new user', (done) => {
      const user = {
        firstName: 'Pelumi',
        lastName: 'Aleshinloye',
        email: 'pels@gmail.com',
        password: 'password',
        type: 'user',
      };
      chai.request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('password');
          res.body.data.should.have.property('type');
          done();
        });
    });
    // return 401 if firstName field was left empty
    it('should return 401 if user ommit firstName', () => {
      const user = {
        lastName: 'Aleshinloye',
        email: 'pels@gmail.com',
        password: 'password',
        type: 'user',
      };
      chai.request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => (done) => {
          res.should.have.status(401);
          res.should.have.property('error');
          done();
        });
    });
    // return 401 if lastName field was left empty
    it('should return 401 if user ommit LastName', () => {
      const user = {
        firstName: 'Pelumi',
        email: 'pels@gmail.com',
        password: 'password',
        type: 'user',
      };
      chai.request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => (done) => {
          res.should.have.status(401);
          res.should.have.property('error');
          done();
        });
    });
    // return 401 if email field was left empty
    it('should return 401 if user ommit email', () => {
      const user = {
        firstName: 'Pelumi',
        lastName: 'Aleshinloye',
        password: 'password',
        type: 'user',
      };
      chai.request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => (done) => {
          res.should.have.status(401);
          res.should.have.property('error');
          done();
        });
    });
    // return 401 if password field was left empty
    it('should return 401 if user ommit password', () => {
      const user = {
        firstName: 'Pelumi',
        email: 'pels@gmail.com',
        type: 'user',
      };
      chai.request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => (done) => {
          res.should.have.status(401);
          res.should.have.property('error');
          done();
        });
    });
    // return 422 if email already exist
    it('should return 422 if email already exist', () => {
      const user = {
        firstName: 'Pelumi',
        lastName: 'Aleshinloye',
        email: 'pels@gmail.com',
        password: 'password',
        type: 'user',
      };
      chai.request(app)
        .post(`${endpointPath}signup`)
        .send(user)
        .end((err, res) => (done) => {
          res.should.have.status(422);
          res.should.be.a('object');
          res.should.have.property('error');
          done();
        });
    });
  });
});
