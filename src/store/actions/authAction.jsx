export const setLoginSuccess = (res) => (dispatch) => {
  console.log(res);
  dispatch({
    type: "LOGIN_SUCCESS",
    payload: res,
  });
};

export const logoutUser = () => ({
  type: "LOGOUT",
  payload: {},
});
