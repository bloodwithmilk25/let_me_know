const INITIAL_STATE = {
  list: [],
  isFetched: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_NOTIFICATIONS":
      return { ...state, list: action.payload, isFetched: true };
    case "CREATE_NOTIFICATION":
      return { ...state, list: [...state.list, action.payload] };
    case "EDIT_NOTIFICATION":
      return {
        ...state,
        list: state.list.map(el =>
          el.id === action.payload.id ? action.payload : el
        )
      };
    case "DELETE_NOTIFICATION":
      return {
        ...state,
        list: state.list.filter(el => el.id !== action.payload.id)
      };
    default:
      return state;
  }
};
