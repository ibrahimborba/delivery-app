const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../../api/app');
const { user } = require('../../database/models');
const { userMock } = require('../mocks/models');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /login', () => {
  describe('Success', () => {
    let response;

    const expectedUser = {
      name: "Cliente Zé Birita",
      email: "zebirita@email.com",
      role: "customer"
    };

    before(async () => {
      sinon.stub(user, 'findOne').callsFake(userMock.findOne);

      response = await chai.request(app)
      .post('/login')
      .send({
        email: 'zebirita@email.com',
        password: '$#zebirita#$',
      });
    });

    after(() => { return user.findOne.restore(); });

    it('returns expected status', () => {
      expect(response).to.have.status(200);
    });
    it('response contains logged user', () => {
      const { body } = response;
      
      expect(body.name).to.be.equals(expectedUser.name);
      expect(body.email).to.be.equals(expectedUser.email);
      expect(body.role).to.be.equals(expectedUser.role);
      expect(body.token).to.be.a('string');
    });
  });

  describe('Error', () => {
    describe('Invalid input', () => {
      let response;  
      before(async () => {
        sinon.stub(user, 'findOne').resolves(null);

        response = await chai.request(app)
        .post('/login')
        .send({
          email: 'zebirita@email.com',
          password: 'password',
        });
      });

      after(() => { return user.findOne.restore(); });
  
      it('returns expected status', () => {
        expect(response).to.have.status(404);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals('Not found');
      });
    });

    describe('Throws an error', () => {
      let response;
      const INTERNAL_SERVER_ERROR = 'Internal Server Error';

      before(async () => {
        sinon.stub(user, 'findOne').throws(INTERNAL_SERVER_ERROR);

        response = await chai.request(app)
        .post('/login')
        .send({
          email: 'zebirita@email.com',
          password: 'password',
        });
      });

      after(() => { return user.findOne.restore(); });

      it('returns expected status', () => {
        expect(response).to.have.status(500);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals(INTERNAL_SERVER_ERROR);
      });
    });
  })
});