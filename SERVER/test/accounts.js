/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();

chai.use(chaiHttp);

const endpointPath = '/api/v1/accounts';

describe('Test for all account Endpoints', () => {
  // --------------CREATE NEW ACCOUNT-----------------
  describe('Account Creation Tests', () => {
    describe(`POST ${endpointPath}`, () => {
      // return 201 and create account succesfully
      it('should create a new account succesfully ', (done) => {
        const login = {
          email: 'pels@gmail.com',
          password: 'password',
        };
        chai
          .request(app)
          .post(endpointPath)
          .send(login)
          .end((logErr, logRes) => {
            const token = `Bearer ${logRes.body.data.token}`;
            const input = {
              type: 'current',
              initialDeposit: 2341.4,
            };
            chai
              .request(app)
              .post(endpointPath)
              .set('Authorization', token)
              .send(input)
              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('firstName');
                res.body.data.should.have.property('secondName');
                res.body.data.should.have.property('type').eql('current');
                done();
              });
          });
      });
    });
  });
  // ---------------------ACCOUNT STATUS TEST--------------
  describe('Account Status change test', () => {
    describe(`PATCH ${endpointPath}/:accountNumber`, () => {
      // return 200 and change account status successfully
      it('should change account status succesfully', (done) => {
        const login = {
          email: 'pels@gmail.com',
          password: 'password',
        };
        const status = {
          status: 'dormant',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(login)
          .end((logErr, logRes) => {
            const token = `Bearer ${logRes.body.data.token}`;

            chai
              .patch(`${endpointPath}/:accountNumber`)
              .set('Authorization', token)
              .send(status)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('data');
                res.body.data.should.have.property('accountNumber');
                res.body.data.should.have.property('status').eql('dormant');
                done();
              });
          });
      });
      // return 400 if the new status field is left empty
      it('should return error 400 if new status is left empty', (done) => {
        chai
          .request(app)
          .patch(`${endpointPath}/:accountNumber`)
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      // return 400 if the new status field is invalid
      it('should return error 400 if new status in valid', (done) => {
        chai
          .request(app)
          .patch(`${endpointPath}/:accountNumber`)
          .send({ status: 'actibe' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      // return error 404 if email does not exist
      it('should return error 201 if email and password does not match', (done) => {
        const loginBody = {
          email: 'wrong@gmai.bjd',
          password: 'wrong',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(loginBody)
          .end((logErr, logRes) => {
            const token = `Bearer ${logRes.body.data.token}`;
            const accountNumber = 654321234567;
            chai
              .request(app)
              .patch(`${endpointPath}/${accountNumber}`)
              .set('Authorizainr', token)
              .send({ status: 'dormant' })
              .end((err, res) => {
                res.should.have.status(404);
                done();
              });
          });
      });
    });
  });
  // ------------------DELETE ACCOUNT-------------
  describe('Delete Account Test', () => {
    // ----------------DELETE ACCOUNT--------------
    describe(`DELETE ${endpointPath}/:accountNumber`, () => {
      // return 200 and create account succesfully
      it('should delete account successfully', (done) => {
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
            const accountNumber = 654321234567;
            chai
              .request(app)
              .delete(`${endpointPath}/${accountNumber}`)
              .set('Authorization', token)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
              });
          });
      });
      // return 400 if user tries to delete account that doesnt exist
      it('should return 404 if account does not exist', (done) => {
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
            const accountNumber = 654321234567;
            chai
              .delete(`${endpointPath}/${accountNumber}`)
              .set('Authorization', token)
              .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
              });
          });
      });
    });
  });
});
