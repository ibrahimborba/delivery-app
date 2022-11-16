const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../../api/app');
const { user } = require('../../database/models');
const { userMock } = require('../mocks/models');
// const expectedUsers = require('../mocks/models/users.json');

chai.use(chaiHttp);
const { expect } = chai;

const expectedUser = {
  id: 2,
  name: "Fulana Pereira",
  email: "fulana@deliveryapp.com",
  role: "seller"
};

describe('GET /admin/manage', () => {
  describe('Success', () => {
    let response;

    before(async () => {
      sinon.stub(user, 'findAll').callsFake(userMock.findAll);

      response = await chai.request(app)
        .get('/admin/manage');
    });

    after(() => { user.findAll.restore(); });

    it('returns expected status', () => {
      expect(response).to.have.status(200);
    });
    it('response contains users', () => {
      expect(response.body[1]).to.be.eql(expectedUser);
    });
  });

  describe('Error', () => {
    describe('Throws an error', () => {
      let response;
      const INTERNAL_SERVER_ERROR = 'Internal Server Error';

      before(async () => {
        sinon.stub(user, 'findAll').throws(INTERNAL_SERVER_ERROR);

        response = await chai.request(app)
          .get('/admin/manage');
      });

      after(() => { user.findAll.restore(); });

      it('returns expected status', () => {
        expect(response).to.have.status(500);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals(INTERNAL_SERVER_ERROR);
      });
    });
  })
});

describe('POST /admin/register', () => {
  let loginResponse;

  before(async () => {  
    loginResponse = await chai.request(app)
      .post('/login')
      .send({
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
      });
  });

  describe('Success', () => {
    let response;

    const expectedUser = {
      name: "Nome Sobrenome",
      email: "nome.sobrenome@email.com",
      role: "customer"
    };

    before(async () => {
      sinon.stub(user, 'create').callsFake(userMock.create);
      sinon.stub(user, 'findOne').resolves(null);

      response = await chai.request(app)
      .post('/admin/register')
      .send({
        name: "Nome Sobrenome",
        email: "nome.sobrenome@email.com",
        password: 'senha_nome',
        role: "customer"
      })
      .set('authorization', loginResponse.body.token);
    });

    after(() => {
      user.create.restore();
      user.findOne.restore();
    });

    it('returns expected status', () => {
      expect(response).to.have.status(201);
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
    describe('User already exists', () => {
      let response;  
      before(async () => {
        sinon.stub(user, 'create').callsFake(userMock.create);
        sinon.stub(user, 'findOne').callsFake(userMock.findOne);

        response = await chai.request(app)
        .post('/admin/register')
        .send({
          name: "Cliente Zé Birita",
          email: 'zebirita@email.com',
          password: 'password',
          role: "customer"
        })
        .set('authorization', loginResponse.body.token);
      });

      after(() => {
        user.create.restore();
        user.findOne.restore();
      });
  
      it('returns expected status', () => {
        expect(response).to.have.status(409);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals('Conflict');
      });
    });

    describe('Throws an error', () => {
      let response;
      const INTERNAL_SERVER_ERROR = 'Internal Server Error';

      before(async () => {
        sinon.stub(user, 'create').throws(INTERNAL_SERVER_ERROR);
        sinon.stub(user, 'findOne').throws(INTERNAL_SERVER_ERROR);

        response = await chai.request(app)
        .post('/admin/register')
        .send({
          name: "Nome Sobrenome",
          email: "nome.sobrenome@email.com",
          password: 'senha_nome',
          role: "customer"
        })
        .set('authorization', loginResponse.body.token);
      });

      after(() => {
        user.create.restore();
        user.findOne.restore();
      });

      it('returns expected status', () => {
        expect(response).to.have.status(500);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals(INTERNAL_SERVER_ERROR);
      });
    });
  });
});

describe('DELETE /admin/manage/:email', () => {
  describe('Success', () => {
    let response;

    before(async () => {
      sinon.stub(user, 'destroy').callsFake(userMock.destroy);
      sinon.stub(user, 'findOne').resolves(userMock.findOne);

      response = await chai.request(app)
      .delete('/admin/manage/zebirita@email.com');
    });

    after(() => {
      user.destroy.restore();
      user.findOne.restore();
    });

    it('returns expected status', () => {
      expect(response).to.have.status(204);
    });
  });

  describe('Error', () => {
    describe('User does not exist', () => {
      let response;  
      before(async () => {
        sinon.stub(user, 'create').callsFake(userMock.create);
        sinon.stub(user, 'findOne').callsFake(null);

        response = await chai.request(app)
        .delete('/admin/manage/user@email.com');
      });

      after(() => {
        user.create.restore();
        user.findOne.restore();
      });
  
      it('returns expected status', () => {
        expect(response).to.have.status(404);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals('Not Found');
      });
    });

    describe('Throws an error', () => {
      let response;
      const INTERNAL_SERVER_ERROR = 'Internal Server Error';

      before(async () => {
        sinon.stub(user, 'create').throws(INTERNAL_SERVER_ERROR);
        sinon.stub(user, 'findOne').throws(INTERNAL_SERVER_ERROR);

        response = await chai.request(app)
        .delete('/admin/manage/zebirita@email.com');
      });

      after(() => {
        user.create.restore();
        user.findOne.restore();
      });

      it('returns expected status', () => {
        expect(response).to.have.status(500);
      });
      it('response contains expected message', () => {
        expect(response.body.message).to.be.equals(INTERNAL_SERVER_ERROR);
      });
    });
  });
});