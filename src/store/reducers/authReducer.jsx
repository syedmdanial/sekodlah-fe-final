const initialState = {
  // Your initial state here
  isLoggedIn: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle different action types here
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
