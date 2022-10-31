import axios from 'axios';

const LOGIN_ENDPOINT = 'http://localhost:3001/login';
const REGISTER_ENDPOINT = 'http://localhost:3001/register';
const CHECKOUT_ENDPOINT = 'http://localhost:3001/customer/checkout';
const SELLERS_ENDPOINT = 'http://localhost:3001/seller';

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
  { productIds, sellerId, totalPrice, deliveryAddress, deliveryNumber },
) {
  try {
    const { data } = await axios.post(
      CHECKOUT_ENDPOINT,
      { productIds, sellerId, totalPrice, deliveryAddress, deliveryNumber },
      {
        headers: {
          authorization: localStorage.getItem('user.token'),
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
    const { data } = axios.get(SELLERS_ENDPOINT);

    return data;
  } catch (error) {
    return error;
  }
}
