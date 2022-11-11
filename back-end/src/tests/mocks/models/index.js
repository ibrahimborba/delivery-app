const users = require('./users.json');
const products = require('./products.json');
<<<<<<< HEAD
const saleById = require('./saleById.json');
=======
const sales = require('./sales.json');
const salesProducts = require('./salesProducts.json');
>>>>>>> 6a0fc85cf803c40151bbb6790b6b466b7f09e61e

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

const mockFindByPk = (Entity, id) => {
  const result = Entity.find((instance) => instance.id === Number(id));
  if(!result) return null;
  const withoutPassword = { ...result };
  delete withoutPassword.password;
  return withoutPassword;
};

const mockCreate = (Entity, newInstance) => {
  Entity.push(newInstance);
  return newInstance;
};

const mockFindAndCountAll = (Entity, where) => {
  if (!where) return Entity[0];
  const options = Object.keys(where);
  const result = Entity.filter((instance) => {
    return options.every((option) => where[option]
      .some((whereOption) => whereOption === instance[option]));
  });
  return { count: result.length, rows: result };
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
  findByPk: async (id) => mockFindByPk(users, id),
  create: async (newUser) => mockCreate(users, newUser),
  destroy: async ({ where }) => mockDestroy(users, where),
};

const productMock = {
  findAll: async () => mockFindAll(products),
};

<<<<<<< HEAD
const saleByIdMock = {
  findByPk: async () => saleById,
  update: async (fields, where) => mockUpdate(BlogPosts, fields, where),
};
=======
const saleMock = {
  create: async (newSale) => mockCreate(sales, newSale),
}

const saleProductMock = {
   create: async (newSale) => mockCreate(salesProducts, newSale),
}
>>>>>>> 6a0fc85cf803c40151bbb6790b6b466b7f09e61e

module.exports = {
  userMock,
  productMock,
<<<<<<< HEAD
  saleByIdMock,
=======
  saleMock,
  saleProductMock
>>>>>>> 6a0fc85cf803c40151bbb6790b6b466b7f09e61e
};