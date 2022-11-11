const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../../api/app');
const { product } = require('../../database/models');
const { productMock } = require('../mocks/models');
const expectedProducts = require('../mocks/models/products.json');


chai.use(chaiHttp);
const { expect } = chai;

describe('GET /products', () => {
  describe('Success', () => {
    let response;

    before(async () => {
      sinon.stub(product, 'findAll').callsFake(productMock.findAll);

      response = await chai.request(app)
      .get('/customer/products');
    });

    after(() => { product.findAll.restore(); });

    it('returns expected status', () => {
      expect(response).to.have.status(200);
    });
    it('response is an array of products', function () {
      expect(response.body).to.be.an('array');
      expect(response.body).to.be.eql(expectedProducts);
    });
  });

  describe('Error', () => {
    describe('Throws an error', () => {
      let response;
      const INTERNAL_SERVER_ERROR = 'Internal server error';

      before(async () => {
        sinon.stub(product, 'findAll').throws(INTERNAL_SERVER_ERROR);

        response = await chai.request(app)
        .get('/customer/products');
      });

      after(() => { product.findAll.restore(); });

      it('returns expected status', () => {
        expect(response).to.have.status(500);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals(INTERNAL_SERVER_ERROR);
      });
    });
  })
});