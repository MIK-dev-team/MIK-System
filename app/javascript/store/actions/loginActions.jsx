import React from 'react';
//import AjaxService from '../../services/ajax_service';

export function loginUser(email, password, event) {
    event.preventDefault();

    return function(dispatch) {
        dispatch({type: "SUBMIT_LOGIN"});
    }
}

export function handleUsernameValueChange(event) {
    return function (dispatch) {
        dispatch({type: "USERNAME_CHANGED", payload: event.target.value});
    }
}

export function handlePasswordValueChange(event) {
    return function (dispatch) {
        dispatch({type: "PASSWORD_CHANGED", payload: event.target.value});
    }
}
