const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../../api/app');
const { sale } = require('../../database/models');
const { saleMock } = require('../mocks/models');
const expectedSales = require('../mocks/models/sales.json');


chai.use(chaiHttp);
const { expect } = chai;

describe('GET /seller/orders', () => {
  describe('Success', () => {
    let response;

    before(async () => {
      sinon.stub(sale, 'findAll').callsFake(saleMock.findAll);

      response = await chai.request(app)
      .get('/seller/orders');
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
    describe('Orders not found', () => {
      let response;
      const ERROR_MESSAGE = 'Not found';

      before(async () => {
        sinon.stub(sale, 'findAll').resolves(null);

        response = await chai.request(app)
        .get('/seller/orders');
      });

      after(() => { sale.findAll.restore(); });

      it('returns expected status', () => {
        expect(response).to.have.status(404);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals(ERROR_MESSAGE);
      });
    });
  
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

describe('GET /seller/orders/:id', () => {
  describe('Success', () => {
    let response;

    before(async () => {
      sinon.stub(sale, 'findOne').callsFake(saleMock.findOne);

      response = await chai.request(app)
      .get('/seller/orders/1');
    });

    after(() => { sale.findOne.restore(); });

    it('returns expected status', () => {
      expect(response).to.have.status(200);
    });
    it('response contains order', function () {
      expect(response.body).to.be.eql({ dataValues:expectedSales[0] });
    });
  });

  describe('Error', () => {
    describe('Order not found', () => {
      let response;
      const ERROR_MESSAGE = 'Expired or invalid token';

      before(async () => {
        sinon.stub(sale, 'findOne').resolves(null);

        response = await chai.request(app)
        .get('/seller/orders/1');
      });

      after(() => { sale.findOne.restore(); });

      it('returns expected status', () => {
        expect(response).to.have.status(404);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals(ERROR_MESSAGE);
      });
    });
  
    describe('Throws an error', () => {
      let response;
      const INTERNAL_SERVER_ERROR = 'Internal server error';

      before(async () => {
        sinon.stub(sale, 'findOne').throws(INTERNAL_SERVER_ERROR);

        response = await chai.request(app)
        .get('/seller/orders/1');
      });

      after(() => { sale.findOne.restore(); });

      it('returns expected status', () => {
        expect(response).to.have.status(500);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals(INTERNAL_SERVER_ERROR);
      });
    });
  })
});

describe('PATCH /seller/orders/:id', () => {
  describe('Success', () => {
    let response;

    before(async () => {
      sinon.stub(sale, 'update').callsFake(saleMock.update);
      sinon.stub(sale, 'findByPk').callsFake(saleMock.findByPk);

      response = await chai.request(app)
      .patch('/seller/orders/1')
      .send({ status: 'Preparando' });
    });

    after(() => {
      sale.update.restore();
      sale.findByPk.restore();
    });

    it('returns expected status', () => {
      expect(response).to.have.status(200);
    });
    it('response contains order', function () {
      expect(response.body).to.be.eql(expectedSales[0]);
    });
    it('response contains order with updated status', function () {
      expect(response.body.status).to.be.equal('Preparando');
    });
  });

  describe('Error', () => {
    describe('Throws an error', () => {
      let response;
      const INTERNAL_SERVER_ERROR = 'Internal server error';

      before(async () => {
        sinon.stub(sale, 'update').throws(INTERNAL_SERVER_ERROR);

        response = await chai.request(app)
        .patch('/seller/orders/1')
        .send({ status: 'Preparando' });
      });

      after(() => { sale.update.restore(); });

      it('returns expected status', () => {
        expect(response).to.have.status(500);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals(INTERNAL_SERVER_ERROR);
      });
    });
  })
});