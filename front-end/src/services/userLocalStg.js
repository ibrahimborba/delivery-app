const USER_KEY = 'user';
const INITIAL_VALUE = {
  name: '',
  email: '',
  token: '',
  role: '',
};

export const getUser = () => {
  if (!localStorage.getItem(USER_KEY)) {
    localStorage.setItem(USER_KEY, JSON.stringify(INITIAL_VALUE));
  }

  return JSON.parse(localStorage.getItem(USER_KEY));
};

export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

export const logoutStg = () => localStorage.removeItem(USER_KEY);

export const getToken = () => {
  const { token } = getUser();

  return token;
};
