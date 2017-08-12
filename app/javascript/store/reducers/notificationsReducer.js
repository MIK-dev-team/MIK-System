const initialState = {
    errorMsg: null,
    successMsg: null,
    infoMsg: null,
};

export default function reducer(state = initialState, action) {

    switch(action.type) {
        case "SET_ERROR": {
            return {
                ...initialState,
                errorMsg: action.payload,
            }
        }
        case "SET_SUCCESS": {
            return {
                ...initialState,
                successMsg: action.payload,
            }
        }
        case "SET_NOTIFICATION": {
            return {
                ...initialState,
                infoMsg: action.payload,
            }
        }
        case "RESET_NOTIFICATIONS": {
            return {
                ...initialState,
            }
        }
    }

    return state;
}