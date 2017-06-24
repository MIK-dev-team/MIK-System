/**
 * Created by owlaukka on 18/06/17.
 */
export default function reducer(state = {
    reservations: [{}],
    fetching: false,
    fetched: false,
    fetchError: null,
    sending: false,
    sent: false,
    submitError: null,
    toBeReservation: {
        plane: "kone 1",
        flightType: "harraste",
        start: "",
        end: "",
    }
}, action) {

    switch(action.type) {
        case "FETCH_RESERVATIONS_PENDING": {
            return {...state, fetching: true};
        }
        case "FETCH_RESERVATIONS_REJECTED": {
            return {...state, fetching: false, fetchError: action.payload};
        }
        case "FETCH_RESERVATIONS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                reservations: action.payload,
            }
        }
        case "SUBMIT_RESERVATION_PENDING": {
            return {
                ...state,
                sending: true,
            }
        }
        case "SUBMIT_RESERVATION_REJECTED": {
            return {
                ...state,
                sending: false,
                submitError: action.payload,
            }
        }
        case "SUBMIT_RESERVATION_FULFILLED": {
            return {
                ...state,
                sending: false,
                sent: true,
            }
        }
        case "SELECT_PLANE": {
            return {
                ...state,
                toBeReservation: {
                    plane: action.payload
                }
            }
        }
        case "SET_TYPE": {
            return {
                ...state,
                toBeReservation: {
                    flightType: action.payload
                }
            }
        }
        case "SET_FLIGHT_TIME": {
            return {
                ...state,
                toBeReservation: {
                    start: action.payload.start,
                    end: action.payload.end
                }
            }
        }
    }

    return state;
}