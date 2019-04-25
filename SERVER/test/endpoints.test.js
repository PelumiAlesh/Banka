import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();

chai.use(chaiHttp);

const endpointPath = '/api/v1/accounts/';

describe('Test for Endpoints', () => {
  describe('Test For endpoint', () => {
    // return 200 if you make a get request to /api/v1
    it('should return 200 and load succesfully', (done) => {
      chai
        .request(app)
        .get('/api/v1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          done();
        });
    });
    // return 404 if users makes request to unknown endpoint
    it('should return 404 if endpoint is unknown', (done) => {
      chai
        .request(app)
        .get('/api/v1/qwe')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
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
  });
});
