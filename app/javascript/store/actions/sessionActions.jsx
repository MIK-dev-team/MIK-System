/**
 * Created by owlaukka on 10/08/17.
 */

export function setLoggedIn(loggedIn) {
    return (dispatch) => {
        dispatch({type: "SET_LOGGED_IN", payload: loggedIn});
    };
}

export function setUserId(id) {
    return (dispatch) => {
        dispatch({type: "SET_USER_ID", payload: id});
    }
}