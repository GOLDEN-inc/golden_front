const createUser = (
  state = {
    isError: false,
    user: {},
  },
  action
) => {
  if (action.type === "CREATE_USER") {
    state = {
      ...state,
      user: action.payload,
    };
  }

  return state;
};

export default createUser;
