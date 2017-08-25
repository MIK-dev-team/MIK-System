const initialState = {
    loggedIn: false,
    user_id: null,
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case "SET_LOGGED_IN": {
            return {
                ...state,
                loggedIn: action.payload,
            }
        }
        case "SET_USER_ID": {
            return {
                ...state,
                user_id: action.payload,
            }
        }
    }

    return state;
}