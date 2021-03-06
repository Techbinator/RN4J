const tokenReducer = (state = {
    token: {},
    loading: true,
    error: null,
}, action) => {
    switch (action.type) {
        case "GET_TOKEN":
            return { ...state, token: action.token };
        case "SAVE_TOKEN":
            console.log('saveToken reducer', action.token);
            return { ...state, token: action.token };
        case "REMOVE_TOKEN":
            return { ...state, token: action.token };
        case "LOADING":
            console.log('setting loading ', action.isLoading);
            return { ...state, loading: action.isLoading };
        case "ERROR":
            return { ...state, error: action.error };
        default:
            return state;
    }
};

module.exports = tokenReducer;