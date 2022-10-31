import axios from 'axios';

const LOGIN_ENDPOINT = 'http://localhost:3001/login';
const REGISTER_ENDPOINT = 'http://localhost:3001/register';
const PRODUCTS_ENDPOINT = 'http://localhost:3001/products';

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

export async function getProducts() {
  try {
    const { data } = await axios.get(PRODUCTS_ENDPOINT);
    return data;
  } catch (error) {
    return error;
  }
}
