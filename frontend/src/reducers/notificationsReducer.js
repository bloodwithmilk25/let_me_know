export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_NOTIFICATIONS":
      return action.payload;
    case "CREATE_NOTIFICATION":
      return [...state, action.payload];
    case "EDIT_NOTIFICATION":
      return state.map(el =>
        el.id === action.payload.id ? action.payload : el
      );
    case "DELETE_NOTIFICATION":
      return state.filter(el => el.id !== action.payload.id);
    default:
      return state;
  }
};
