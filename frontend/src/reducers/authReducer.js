export default (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    case "FETCH_USER":
      return action.payload;
    case "REGISTER":
      return action.payload;
    case "CHANGE_PASSWORD":
      return state;
    case "RESET_PASSWORD":
      return state;
    default:
      return state;
  }
};
