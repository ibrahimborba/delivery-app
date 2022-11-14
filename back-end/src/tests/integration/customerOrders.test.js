const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../../api/app');
const { user } = require('../../database/models');
const { sale } = require('../../database/models');
const { customerOrderMock } = require('../mocks/models');


chai.use(chaiHttp);
const { expect } = chai;

describe('GET /customer/orders/email', () => {
  describe('Success', () => {
    let response;

    before(async () => {
      sinon.stub(user, 'findOne').callsFake(customerOrderMock.findOne);
      sinon.stub(sale, 'findAll').callsFake(customerOrderMock.findAll);

      response = await chai.request(app)
      .get('/customer/orders/')
      .query({ email: 'zebirita@email.com' });
    });

    after(() => { user.findOne.restore(); sale.findAll.restore(); });

    it('returns expected status', () => {
      expect(response).to.have.status(200);
    });
    it('returns an array', () => {
      expect(response.body).to.be.an('array');
    });

  });

  describe('Error', () => {});

  describe('Throws an error', () => {});
});