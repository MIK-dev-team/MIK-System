import React from 'react';
import AjaxService from '../../services/ajax_service';

export function loginUser(email, password, event) {
    event.preventDefault();
    let route = '/api/v1/kirjaudu';
    const auth_details = {
        email: email,
        password: password
    };
    return function(dispatch) {
        AjaxService.post(
            route,
            auth_details,
            (status, data) => {
                dispatch({type: "SUBMIT_LOGIN", payload: data});
                setTimeout(() => window.location.replace('/'), 5000);
            },
            (status, err) => {
                dispatch({type: "LOGIN_FAILED"})
            }
        );
    }
}

export function logOutAndRedirect() {
    const logOutPath = '/api/v1/logout';
    return (dispatch) => {
        AjaxService.destroy(
            logOutPath,
            (status, data) => {
                dispatch({type: "SET_SUCCESS", payload: { header: 'Olet kirjautunut ulos', text: '' } });
                dispatch({type: "SET_LOGGED_IN", payload: false});
                setTimeout(() => window.location.reload(), 4000);
            },
            (status, err) => {
                dispatch({type: "SET_ERROR", payload: { header: 'Jotain meni vikaan', data: [] } })
            }
        )
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
