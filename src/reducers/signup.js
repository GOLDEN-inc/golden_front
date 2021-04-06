const createUser = (state = {
    isError: false,
    user: {}
}, action) => {
    if (action.type === "CREATE_USER") {
        state = {
            ...state,
            user: action.payload
        };
    }
    console.log(state.isError)
    console.log("2) --->", state.user.error)

    return state;
};

export default createUser;
