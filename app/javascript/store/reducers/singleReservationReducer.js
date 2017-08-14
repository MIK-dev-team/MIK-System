const initialState = {
    showModal: false,
    reservation: null,
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case "SHOW_MODAL": {
            return {
                ...state,
                showModal: true,
                reservation: action.payload,
            }
        }
        case "HIDE_MODAL": {
            return {
                ...state,
                showModal: false,
                reservation: null,
            }
        }
        // case "SET_RESERVATION": {
        //     return {
        //         ...state,
        //         reservation: action.payload,
        //     }
        // }
        // case "CLEAR_RESERVATION": {
        //     return {
        //         ...state,
        //         reservation: null,
        //     }
        // }
    }

    return state;
}