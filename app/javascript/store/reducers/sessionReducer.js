const initialState = {
    loggedIn: false,
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case "SET_LOGGED_IN": {
            return {
                ...state,
                loggedIn: action.payload,
            }
        }
    }

    return state;
}