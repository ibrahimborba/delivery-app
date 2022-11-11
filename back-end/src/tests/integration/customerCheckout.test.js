const chai = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../../api/app');
const { sale, salesProduct, user } = require('../../database/models');
const { saleMock, saleProductMock, userMock } = require('../mocks/models');

// const JWT_OPTIONS = { expiresIn: '7d', algorithm: 'HS256' };
// const JWT_SECRET = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /customer/checkout', () => {
  let loginResponse;

  before(async () => {
    // sinon.stub(user, 'findOne').callsFake(userMock.findOne);
    
    loginResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'zebirita@email.com',
        password: '$#zebirita#$',
      });
    
    // user.findOne.restore();
    // console.log(loginResponse);
  })

  describe('Success', () => {
    let response;

    before(async () => {
      sinon.stub(sale, 'create').callsFake(saleMock.create);
      sinon.stub(salesProduct, 'bulkCreate').callsFake(saleProductMock.create);
      // sinon.stub(user, 'findOne').callsFake(userMock.findOne);

      // const token = jwt.sign({ email: 'zebirita@email.com' }, JWT_SECRET, JWT_OPTIONS);
    
      response = await chai.request(app)
        .post('/customer/checkout')
        .send({
          sellerId: 2,
          totalPrice: 120,
          deliveryAddress: 'Rua de teste',
          deliveryNumber: 667,
          products: [{ id: 1, quantity: 2 }, { id: 3, quantity: 5 }],
        }).set('authorization', loginResponse.body.token);
      
    });

    after(() => {
      sale.create.restore();
      salesProduct.bulkCreate.restore();
    })

    it('Should return expected status', async () => {
      expect(response).to.have.status(201);
    });
  });

  describe('Failure', () => {
    let response;

    before(async () => {
      sinon.stub(sale, 'create').callsFake(saleMock.create);
      sinon.stub(salesProduct, 'bulkCreate').callsFake(saleProductMock.create);

      response = await chai.request(app)
        .post('/customer/checkout')
        .send({
          sellerId: 2,
          totalPrice: 120,
          deliveryAddress: 'Rua de teste',
          deliveryNumber: 667,
          products: [{ id: 1, quantity: 2 }, { id: 3, quantity: 5 }],
        })
    });

    after(() => {
      sale.create.restore();
      salesProduct.bulkCreate.restore();
    })

    it('Should return expected status', async () => {
      expect(response).to.have.status(401);
    });

    it('response contains expected message', () => {
        expect(response.body.message).to.be.equals('Token not found');
      });
  })
});