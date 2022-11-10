const chai = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const tokenHelper = require('../../helpers/token');
const app = require('../../api/app');
const { sale, salesProduct, user } = require('../../database/models');
const { saleMock, saleProductMock, userMock } = require('../mocks/models');

// const JWT_OPTIONS = { expiresIn: '7d', algorithm: 'HS256' };
const JWT_SECRET = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /customer/checkout', () => {
  describe('Success', () => {
    let response;

    before(async () => {
      sinon.stub(sale, 'create').callsFake(saleMock.create);
      sinon.stub(salesProduct, 'create').callsFake(saleProductMock.create);
      sinon.stub(user, 'findOne').callsFake(userMock.findOne);

      const token = jwt.sign('zebirita@email.com', JWT_SECRET);
    
      response = await chai.request(app)
        .post('/customer/checkout')
        .set('authorization', token)
        .send({
          sellerId: 2,
          totalPrice: 120,
          deliveryAddress: 'Rua de teste',
          deliveryNumber: 667,
          products: [{id: 1, quantity: 2}, {id: 3, quantity: 5}],
        });
    })
/* 
    after(() => {
      // sale.create.restore();
      // salesProduct.create.restore();
    }) */

    it('Should return expected status', () => {
      expect(response).to.have.status(201);
    });
  })
});
