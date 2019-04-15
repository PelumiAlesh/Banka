
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

const endpointPath = '/api/v1/transactions/';

describe('Transactions Test', () => {
  // -----------CREDIT ACCOUNT--------------
  describe(`POST ${endpointPath}:accountNumber/credit`, () => {
    // return 201 and succesfully credit the account
    it('should succesfully credit an account', (done) => {
      const login = {
        email: 'ayo@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((logErr, logRes) => {
          const token = `Bearer ${logRes.body.data.token}`;
          chai
            .request(app)
            .post(`${endpointPath}9987654321/credit`)
            .set('Authorization', token)
            .send({
              cashier: 101,
              amount: 9000,
            })
            .end((err, res) => {
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
    });
    // return 400 if amount wasnt specified
    it('should return 400 if user omit amount', (done) => {
      const login = {
        email: 'ayo@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((logErr, logRes) => {
          const token = `Bearer ${logRes.body.data.token}`;
          chai
            .request(app)
            .post(`${endpointPath}9987654321/credit`)
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
      const login = {
        email: 'ayo@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((logErr, logRes) => {
          const token = `Bearer ${logRes.body.data.token}`;
          chai
            .request(app)
            .post(`${endpointPath}99874321/credit`)
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
      const login = {
        email: 'ayo@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((logErr, logRes) => {
          const token = `Bearer ${logRes.body.data.token}`;
          chai
            .request(app)
            .post(`${endpointPath}9987654321/debit`)
            .send({ amount: 1233 })
            .set('Authorization', token)
            .end((err, res) => {
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
    });
    // return 400 if amount wasnt specified
    it('should return 400 if user omit amount', (done) => {
      const login = {
        email: 'ayo@gmail.com',
        password: 'password',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(login)
        .end((logErr, logRes) => {
          const token = `Bearer ${logRes.body.data.token}`;
          chai
            .request(app)
            .post(`${endpointPath}9987654321/debit`)
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
});
