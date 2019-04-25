
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

const endpointPath = '/api/v1/transactions/';
const login = {
  email: 'ayo@gmail.com',
  password: 'password',
};

describe('Transactions Test', () => {
  // -----------CREDIT ACCOUNT--------------
  describe(`POST ${endpointPath}:accountNumber/credit`, () => {
    // return 201 and succesfully credit the account
    it('should succesfully credit an account', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((logErr, logRes) => {
          const token = `Bearer ${logRes.body.data[0].token}`;
          chai
            .request(app)
            .post(`${endpointPath}1234565434/credit`)
            .set('Authorization', token)
            .send({
              cashier: 101,
              amount: 9000,
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data[0].should.have.property('amount');
              res.body.data[0].should.have.property('cashier');
              res.body.data[0].should.have.property('accountNumber');
              res.body.data[0].should.have.property('transactionType');
              res.body.data[0].should.have.property('accountBalance');
              done();
            });
        });
    });
    // return 400 if amount wasnt specified
    it('should return 400 if user omit amount', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((logErr, logRes) => {
          const token = `Bearer ${logRes.body.data[0].token}`;
          chai
            .request(app)
            .post(`${endpointPath}1234565434/credit`)
            .set('Authorization', token)
            .send({})
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
    // return 404 if accountNumber was not be found
    it('should return 404 if account number was not found', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((logErr, logRes) => {
          const token = `Bearer ${logRes.body.data[0].token}`;
          chai
            .request(app)
            .post(`${endpointPath}123456434/credit`)
            .set('Authorization', token)
            .send({})
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
  });
  // -----------DEBIT ACCOUNT--------------
  describe(`POST ${endpointPath}:accountNumber/debit`, () => {
    // return 201 and succesfully debit the account
    it('should succefully debit an account', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((logErr, logRes) => {
          const token = `Bearer ${logRes.body.data[0].token}`;
          chai
            .request(app)
            .post(`${endpointPath}1234565434/debit`)
            .send({ amount: 1233 })
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(201);
              res.should.be.a('object');
              res.body.should.have.a.property('data');
              res.body.data[0].should.be.a('object');
              res.body.data[0].should.have.property('amount');
              res.body.data[0].should.have.property('transactionId');
              res.body.data[0].should.have.property('transactionType');
              done();
            });
        });
    });
    // return 400 if amount wasnt specified
    it('should return 400 if user omit amount', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((logErr, logRes) => {
          const token = `Bearer ${logRes.body.data[0].token}`;
          chai
            .request(app)
            .post(`${endpointPath}1234565434/debit`)
            .set('Authorization', token)
            .send({})
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
  });

  // -----------Get Transactions--------------
  describe(`GET ${endpointPath}:id`, () => {
    // should return 200 and get transaction succesfully
    it('should get transaction succesfully', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((logErr, logRes) => {
          const token = `Bearer ${logRes.body.data[0].token}`;
          chai
            .request(app)
            .get(`${endpointPath}1`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data[0].should.have.property('status');
              res.body.data[0].should.have.property('data');
            });
          done();
        });
    });
  });
});
