const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../../api/app');
const { user } = require('../../database/models');
const { userMock } = require('../mocks/models');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /login', function () {
  before(function () {
    sinon.stub(user, 'findOne').callsFake(userMock.findOne);
  });

  after(function () { return user.findOne.restore(); });

  describe('Success', function () {
    let response;

    const expectedUser = {
      name: "Cliente Zé Birita",
      email: "zebirita@email.com",
      role: "customer"
    };

    before(async function () {
      response = await chai.request(app)
      .post('/login')
      .send({
        email: 'zebirita@email.com',
        password: '$#zebirita#$',
      });
    });

    it('returns status code 200', function () {
      expect(response).to.have.status(200);
    });
    it('response contains logged user: name, email, role and token', function () {
      const { body } = response;
      
      expect(body.name).to.be.equals(expectedUser.name);
      expect(body.email).to.be.equals(expectedUser.email);
      expect(body.role).to.be.equals(expectedUser.role);
      expect(body.token).to.be.a('string');
    });
  });
/* 
  describe('Error', function () {
    let response;

    before(async function () {
      response = await chai.request(app)
      .post('/login')
      .send({
        email: 'ayrtonsenna@gmail.com',
        password: 'password',
      });
    });

    it('returns status code 400', function () {
      expect(response).to.have.status(400);
    });
    it('response contains message with value "Invalid fields"', function () {
      expect(response.body.message).to.be.equals('Invalid fields');
    });
  }); */
});