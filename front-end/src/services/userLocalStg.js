const USER_KEY = 'user';
// const INITIAL_VALUE = {
//   name: '',
//   email: '',
//   token: '',
//   role: '',
// };

export const getUser = () => localStorage.getItem(USER_KEY);

export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

export const logoutStg = () => localStorage.removeItem(USER_KEY);

export const getToken = () => {
  const { token } = getUser();

  return token;
};
