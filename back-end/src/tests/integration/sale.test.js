const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../../api/app');
const { sale } = require('../../database/models');
const { saleByIdMock, saleMock } = require('../mocks/models');
const expectedSale = require('../mocks/models/saleById.json');
const expectedSales = require('../mocks/models/sales.json');


chai.use(chaiHttp);
const { expect } = chai;

describe('GET /sales/:id', () => {
  describe('Success', () => {
    let response;

    before(async () => {
      sinon.stub(sale, 'findByPk').callsFake(saleByIdMock.findByPk);

      response = await chai.request(app)
      .get('/customer/sales/1');
    });

    after(() => { sale.findByPk.restore(); });

    it('returns expected status', () => {
      expect(response).to.have.status(200);
    });
    it('response contains products and seller', function () {
      expect(response.body.products).to.be.eql(expectedSale.products);
      expect(response.body.seller).to.be.eql(expectedSale.seller);
    });
  });


  describe('Error', () => {
    describe('Throws an error', () => {
      let response;
      const INTERNAL_SERVER_ERROR = 'Internal server error';

      before(async () => {
        sinon.stub(sale, 'findByPk').throws(INTERNAL_SERVER_ERROR);

        response = await chai.request(app)
        .get('/customer/sales/1');
      });

      after(() => { sale.findByPk.restore(); });

      it('returns expected status', () => {
        expect(response).to.have.status(500);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals(INTERNAL_SERVER_ERROR);
      });
    });
  })
});

describe('GET /sales', () => {
  describe('Success', () => {
    let response;

    before(async () => {
      sinon.stub(sale, 'findAll').callsFake(saleMock.findAll);

      response = await chai.request(app)
      .get('/customer/sales');
    });

    after(() => { sale.findAll.restore(); });

    it('returns expected status', () => {
      expect(response).to.have.status(200);
    });
    it('response contains orders', function () {
      expect(response.body).to.be.eql(expectedSales);
    });
  });

  describe('Error', () => {
    describe('Throws an error', () => {
      let response;
      const INTERNAL_SERVER_ERROR = 'Internal server error';

      before(async () => {
        sinon.stub(sale, 'findAll').throws(INTERNAL_SERVER_ERROR);

        response = await chai.request(app)
        .get('/seller/orders');
      });

      after(() => { sale.findAll.restore(); });

      it('returns expected status', () => {
        expect(response).to.have.status(500);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals(INTERNAL_SERVER_ERROR);
      });
    });
  })
});

describe('POST /customer/sales Failure', () => {
  let response;
  let loginResponse;
  const INTERNAL_SERVER_ERROR = 'Internal Server Error';

  before(async () => {
    sinon.stub(sale, 'create').throws(INTERNAL_SERVER_ERROR);

    loginResponse = await chai.request(app)
    .post('/login')
    .send({
      email: 'zebirita@email.com',
      password: '$#zebirita#$',
    });

    response = await chai.request(app)
      .post('/customer/checkout')
      .send({}).set('authorization', loginResponse.body.token);
  });

  after(() => {
    sale.create.restore();
  })

  it('returns expected status', () => {
    expect(response).to.have.status(500);
  });
  it('response contains expected message', () => {
    expect(response.body.message).to.be.equals(INTERNAL_SERVER_ERROR);
  });
})