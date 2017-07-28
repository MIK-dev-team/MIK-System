/**
 * Created by owlaukka on 18/06/17.
 */
export default function reducer(state = {
    reservations: [],
    fetching: false,
    fetched: false,
    fetchError: null,
    sending: false,
    sent: false,
    submitError: null,
    reservation_type: "harraste",
    start: "",
    end: "",
    desc: "",
    collapsed: true,
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


        case "SET_TYPE": {
            return {
                ...state,
                reservation_type:  action.payload
            }
        }
        case "SET_TIMESLOT": {
            return {
                ...state,
                start: action.payload.start,
                end: action.payload.end,
            }
        }
        case "SET_COLLAPSED": {
            return {...state, collapsed: action.payload}
        }
        case "SET_DESCRIPTION": {
            return {...state, desc: action.payload}
        }
        case "RESET_NEW_RESERVATION": {
            return {
                ...state,
                submitError: null,
                reservation_type: "harraste",
                start: "",
                end: "",
                desc: "",
                collapsed: true,
            }
        }
        case "SET_RESERVATIONS": {
            return {
                ...state,
                reservations: action.payload,
            }
        }
    }

    return state;
}