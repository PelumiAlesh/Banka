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
          .post('/api/v1/auth/signin')
          .send(login)
          .end((_logErr, Res) => {
            const token = `Bearer ${Res.body.data.token}`;
            const input = {
              type: 'savings',
              initialDeposit: 2341.4,
            };
            chai
              .request(app)
              .post(endpointPath)
              .set('Authorization', token)
              .send(input)
              .end((_err, res) => {
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
      });
      // retunr 401 if account type is not specified
      it('should return 401 if user omit account type ', (done) => {
        const login = {
          email: 'pels@gmail.com',
          password: 'password',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(login)
          .end((_logErr, Res) => {
            const token = `Bearer ${Res.body.data.token}`;
            const input = {
              initialDeposit: 2341.4,
            };
            chai
              .request(app)
              .post(endpointPath)
              .set('Authorization', token)
              .send(input)
              .end((_err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                done();
              });
          });
      });
      // return 401 if token authentication fails
      it('should return 401 when the token couldnt be verified', (done) => {
        const login = {
          email: 'pels@gmail.com',
          password: 'password',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(login)
          // eslint-disable-next-line no-unused-vars
          .end((_logErr, _Res) => {
            const token = 'Bearer dfsW262gvh829Bv_hgvs#%^#';
            const input = {
              type: 'savings',
              initialDeposit: 2341.4,
            };
            chai
              .request(app)
              .post(endpointPath)
              .set('Authorization', token)
              .send(input)
              .end((_err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
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
          email: 'ayo@gmail.com',
          password: 'password',
        };
        const status = {
          status: 'dormant',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(login)
          .end((_logErr, logRes) => {
            const token = `Bearer ${logRes.body.data.token}`;

            chai
              .request(app)
              .patch(`${endpointPath}/1234567890`)
              .set('Authorization', token)
              .send(status)
              .end((_err, res) => {
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
          .patch(`${endpointPath}/1234567890`)
          .send({})
          .end((_err, res) => {
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
          .patch(`${endpointPath}/1234567890`)
          .send({ status: 'actibe' })
          .end((_err, res) => {
            res.should.have.status(400);
            res.body.should.have.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
      // return 400 if account was not found
      it('should return error 400 if the account number could not be found', (done) => {
        chai
          .request(app)
          .patch(`${endpointPath}/12345678`)
          .send({ status: 'active' })
          .end((_err, res) => {
            res.should.have.status(400);
            res.body.should.have.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });
  // ------------------DELETE ACCOUNT-------------
  describe('Delete Account Test', () => {
    describe(`DELETE ${endpointPath}/:accountNumber`, () => {
      // return 200 and delete account succesfully
      it('should delete account successfully', (done) => {
        const login = {
          email: 'ayo@gmail.com',
          password: 'password',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(login)
          .end((_logErr, logRes) => {
            const token = `Bearer ${logRes.body.data.token}`;
            const accountNumber = 1234567890;
            chai
              .request(app)
              .delete(`${endpointPath}/${accountNumber}`)
              .set('Authorization', token)
              .end((_err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
              });
          });
      });
      // return 404 if user tries to delete account that doesnt exist
      it('should return 404 if account does not exist', (done) => {
        const login = {
          email: 'ayo@gmail.com',
          password: 'password',
        };
        chai
          .request(app)
          .post('/api/v1/auth/signin')
          .send(login)
          .end((_logErr, logRes) => {
            const token = `Bearer ${logRes.body.data.token}`;
            const accountNumber = 1987634567890;
            chai
              .request(app)
              .delete(`${endpointPath}/${accountNumber}`)
              .set('Authorization', token)
              .end((_err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                done();
              });
          });
      });
    });
  });
});
