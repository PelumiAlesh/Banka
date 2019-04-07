/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);

const endpointPath = '/api/v1/transactions/';

describe('Transactions Test', () => {
  describe(`POST ${endpointPath}:accountNumber/credit`, () => {
    // return 200 and succesfully credit the account
    it('should succesfully credit an account', (done) => {
      const login = {
        email: 'pels@gmail.com',
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
            .post(`${endpointPath}654321234567/credit`)
            .set('Authorization', token)
            .send({
              cashier: 101,
              amount: 9000,
            })
            .end((err, res) => {
              res.should.have.status(200);
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
    it('should return 400 if user omit amount', (done) => {
      chai
        .request(app)
        .post(`${endpointPath}654321234567/credit`)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should return 400 if user inputs non integer characters', (done) => {
      chai.request(app)
        .post(`${endpointPath}654321234567/credit`)
        .send({ amount: 'lu88' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});
