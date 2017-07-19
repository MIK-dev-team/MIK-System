import React from 'react';
//import AjaxService from '../../services/ajax_service';

export function loginUser(email, password, event) {
    event.preventDefault();

    return function(dispatch) {
        dispatch({type: "LOGIN_USER"});
        axios.get('/reservations.json')
            .then((response) => {
                dispatch({type: "LOGIN_SUCCESSFUL", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "LOGIN_REJECTED", payload: err})
            })
    }
}
