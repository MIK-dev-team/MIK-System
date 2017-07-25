/**
 * Created by owlaukka on 25/07/17.
 */

export default function reducer(state = {
    planes: [],
    selectedPlane: undefined,
}, action) {

    switch(action.type) {
        case "SET_PLANES": {
            return {...state, planes: action.payload};
        }
        case "SELECT_PLANE": {
            return {...state, selectedPlane: action.payload}
        }
    }

    return state;
}