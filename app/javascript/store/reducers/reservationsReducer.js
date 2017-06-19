/**
 * Created by owlaukka on 18/06/17.
 */
export default function reducer(state = {
    reservations: [{}],
    fetching: false,
    fetched: false,
    error: null,
}, action) {

    switch(action.type) {
        case "FETCH_RESERVATIONS_PENDING": {
            return {...state, fetching: true};
        }
        case "FETCH_RESERVATIONS_REJECTED": {
            return {...state, fetching: false, error: action.payload};
        }
        case "FETCH_RESERVATIONS_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                reservations: action.payload,
            }
        }
    }

    return state;
}