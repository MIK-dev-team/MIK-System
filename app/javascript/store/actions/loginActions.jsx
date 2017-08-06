import React from 'react';
import AjaxService from '../../services/ajax_service';

export function loginUser(email, password, event) {
    event.preventDefault();
    let route = '/kirjaudu';
    const auth_details = {
        email: email,
        password: password
    };
    return function(dispatch) {
        AjaxService.post(
            route,
            auth_details,
            (status, data) => {
                dispatch({type: "SUBMIT_LOGIN", payload: data})
            },
            (status, err) => {
                dispatch({type: "LOGIN_FAILED"})
            }
        );
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
