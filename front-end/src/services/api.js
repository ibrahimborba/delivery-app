import axios from 'axios';
import { getToken } from './userLocalStg';

const LOGIN_ENDPOINT = 'http://localhost:3001/login';
const REGISTER_ENDPOINT = 'http://localhost:3001/register';
const CUSTOMER_ORDERS_ENDPOINT = 'http://localhost:3001/customer/orders';
const SELLER_PRODUCTS_ENDPOINT = 'http://localhost:3001/seller/orders';
const CHECKOUT_ENDPOINT = 'http://localhost:3001/customer/checkout';
const SELLERS_ENDPOINT = 'http://localhost:3001/seller';
const PRODUCTS_ENDPOINT = 'http://localhost:3001/customer/products';
const SALEBYID = 'http://localhost:3001/customer/sales/';
const UPDATE_SALE = 'http://localhost:3001/seller/orders/';
const ADMIN_REGISTER_ENDPOINT = 'http://localhost:3001/admin/register/';

export async function login({ email, password }) {
  try {
    const { data } = await axios.post(LOGIN_ENDPOINT, { email, password });
    return data;
  } catch (error) {
    return error;
  }
}

export async function register({ email, password, name }) {
  try {
    const { data } = await axios.post(REGISTER_ENDPOINT, { email, password, name });
    return data;
  } catch (error) {
    return error;
  }
}

export async function checkout(
  { products, sellerId, totalPrice, deliveryAddress, deliveryNumber },
) {
  try {
    const { data } = await axios.post(
      CHECKOUT_ENDPOINT,
      {
        products,
        sellerId: Number(sellerId),
        totalPrice,
        deliveryAddress,
        deliveryNumber: Number(deliveryNumber),
      },
      {
        headers: {
          authorization: getToken(),
        },
      },
    );

    return data;
  } catch (error) {
    return error;
  }
}

export async function sellers() {
  try {
    const { data } = await axios.get(SELLERS_ENDPOINT);

    return data;
  } catch (error) {
    return error;
  }
}

export async function getProducts() {
  try {
    const { data } = await axios.get(PRODUCTS_ENDPOINT);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getSalesByUserEmail(email) {
  try {
    const { data } = await axios
      .get(CUSTOMER_ORDERS_ENDPOINT, { params: { email } });
    return data;
  } catch (error) {
    return error;
  }
}

export async function getProductsSeller() {
  try {
    const { data } = await axios.get(SELLER_PRODUCTS_ENDPOINT);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getSalesById(id) {
  try {
    const { data } = await axios.get(`${SALEBYID}${id}`);
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateStatus({ id, status }) {
  try {
    const { data } = await axios.patch(`${UPDATE_SALE}${id}`, { status });
    return data;
  } catch (error) {
    return error;
  }
}

export async function adminRegister({ name, email, password, role }) {
  try {
    const { data } = await axios.post(
      ADMIN_REGISTER_ENDPOINT,
      { name, email, password, role },
      {
        headers: {
          authorization: getToken(),
        },
      },
    );

    return data;
  } catch (error) {
    return error;
  }
}
