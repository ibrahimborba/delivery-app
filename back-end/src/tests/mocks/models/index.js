const users = require('./users.json');
const products = require('./products.json');
const saleById = require('./saleById.json');
const sales = require('./sales.json');
const salesProducts = require('./salesProducts.json');

const mockFindOne = (Entity, where) => {
  if (!where) return Entity[0];
  if (where.id) where.id = Number(where.id);

  const options = Object.keys(where);
  const result = Entity.find((instance) => {
    return options.every((option) => where[option] === instance[option]);
  });
  return { dataValues: result};
};

const mockFindAll = (Entity) => {
  const withoutPassword = Entity.map(({password, ...instance}) => instance);
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

const userMock = {
  findOne: async ({ where }) => mockFindOne(users, where),
  create: async (newUser) => mockCreate(users, newUser),
};

const productMock = {
  findAll: async () => mockFindAll(products),
};

const saleByIdMock = {
  findByPk: async () => saleById,
  update: async (fields, where) => mockUpdate(BlogPosts, fields, where),
};

const saleMock = {
  create: async (newSale) => mockCreate(sales, newSale),
}

const saleProductMock = {
   create: async (newSale) => mockBulkCreate(salesProducts, newSale),
}

module.exports = {
  userMock,
  productMock,
  saleByIdMock,
  saleMock,
  saleProductMock
};