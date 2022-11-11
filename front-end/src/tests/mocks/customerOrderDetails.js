const orderDetails = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '4.40',
  deliveryAddress: 'Moraes Avenida',
  deliveryNumber: '7',
  saleDate: '2022-11-07T20:50:45.000Z',
  status: 'Em Trânsito',
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      salesProduct: {
        saleId: 1,
        productId: 1,
        quantity: 2,
      },
    },
  ],
  seller: {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  },
};

export default orderDetails;
