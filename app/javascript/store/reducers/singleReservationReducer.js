const initialState = {
    sending: false,
    sent: false,
    updateError: null,

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
        case "SET_RESERVATION": {
            return {
                ...state,
                reservation: action.payload,
            }
        }
        case "UPDATE_RESERVATION_PENDING": {
            return {
                ...state,
                sending: true,
            }
        }
        case "UPDATE_RESERVATION_REJECTED": {
            return {
                ...state,
                sending: false,
                updateError: action.payload,
            }
        }
        case "UPDATE_RESERVATION_FULFILLED": {
            return {
                ...state,
                sending: false,
                sent: true,
                updateError: null
            }
        }
    }

    return state;
}