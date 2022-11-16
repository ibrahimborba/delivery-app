const users = require('./users.json');
const products = require('./products.json');
const saleById = require('./saleById.json');
const sales = require('./sales.json');
const salesProducts = require('./salesProducts.json');
const order = require('./order.json');

const mockFindOne = (Entity, where) => {
  if (!where) return Entity[0];
  if (where.id) where.id = Number(where.id);

  const options = Object.keys(where);
  const result = Entity.find((instance) => {
    return options.every((option) => where[option] === instance[option]);
  });
  return { dataValues: result};
};

const mockFindByEmail = (Entity, email) => {
  const result = Entity.find((instance) => instance.email === email);
  if(!result) return null;
  return result.id;
};

const mockFindAll = (Entity) => {
  const withoutPassword = Entity.map(({password, ...instance}) => instance);
  return withoutPassword;
};

const mockFindAllByUserId = (Entity, userId) => {
  const result = Entity.filter((instance) => instance.userId === Number(userId));
  return result;
};

const mockFindByPk = (Entity, id) => {
  const result = Entity.find((instance) => instance.id === Number(id));
  if(!result) return null;
  const withoutPassword = { ...result };
  delete withoutPassword.password;
  return withoutPassword;
};

const mockCreate = (Entity, newInstance) => {
  Entity.push(newInstance);
  return { ...newInstance, id: Entity.length };
};

const mockBulkCreate = (Entity, newInstances) => {
  newInstances.forEach((instance) => Entity.push(instance));
}

const mockUpdate = (Entity, fields, { where }) => {
  if (!where) return Entity[0];
  if (where.id) where.id = Number(where.id);

  const options = Object.keys(where);
  const result = Entity.find((instance) => {
    return options.every((option) => where[option] === instance[option]);
  });
  if(!result) return null;

  const editFields = Object.keys(fields);
  editFields.forEach((field) => result[field] = fields[field]);
  return result;
};

const mockDestroy = (Entity, where) => {
  if (!where) return Entity[0];
  if (where.id) where.id = Number(where.id);

  console.log('DESTROY', where);

  const options = Object.keys(where);
  const result = Entity.find((instance) => {
    return options.every((option) => where[option] === instance[option]);
  });
  if(!result) return null;

  return result;
};

const userMock = {
  findAll: async () => mockFindAll(users),
  findOne: async ({ where }) => mockFindOne(users, where),
  create: async (newUser) => mockCreate(users, newUser),
  destroy: async ({ where }) => mockDestroy(users, where),
};

const productMock = {
  findAll: async () => mockFindAll(products),
};

const saleByIdMock = {
  findByPk: async () => saleById,
};

const saleMock = {
  findAll: async () => mockFindAll(sales),
  findByPk: async (id) => mockFindByPk(sales, id),
  findOne: async ({ where }) => mockFindOne(sales, where),
  create: async (newSale) => mockCreate(sales, newSale),
  update: async (fields, where) => mockUpdate(sales, fields, where),
}

const saleProductMock = {
   create: async (newSale) => mockBulkCreate(salesProducts, newSale),
}

const customerOrderMock = {
  findOne: async (email) => mockFindByEmail(users, email),
  findAll: async(userId) => mockFindAllByUserId(order, userId),
};

module.exports = {
  userMock,
  productMock,
  saleByIdMock,
  saleMock,
  saleProductMock,
  customerOrderMock,
};