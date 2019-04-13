import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../SERVER/index';

chai.should();

chai.use(chaiHttp);

const endpointPath = '/api/v1/accounts/';

describe('Test for all protected endpoints', () => {
  // return 401 if token is invalid
  it('should return 401 if token couldnt be verified', (done) => {
    chai
      .request(app)
      .post(`${endpointPath}`)
      .set('Authorization', 'invalidToken')
      .send({
        type: 'savings',
        initialDeposit: 2345609,
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });
  // return 401 if client try to access staff endpoint
  it('should return 401 if token is not from staff account', (done) => {
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
          .patch(`${endpointPath}1234567890`)
          .set('Authorization', token)
          .send({
            status: 'dormant',
          })
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
  });
});
