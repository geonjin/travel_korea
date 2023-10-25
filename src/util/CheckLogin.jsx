export const CheckLogin = () => {
  let state;

  localStorage.getItem("token") ? (state = true) : (state = false);

  return state;
};

export default CheckLogin;