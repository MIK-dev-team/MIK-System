import React from 'react';
import AjaxService from '../../services/ajax_service';

export function loginUser(values) {
    let route = '/api/v1/kirjaudu';
    return (dispatch) => {
        AjaxService.post(
            route,
            values,
            (status, data) => {
                dispatch({type: "SUBMIT_LOGIN", payload: data});
                dispatch({type: "SET_SUCCESS", payload: { header: 'Olet kirjautunut sisään'}});
                dispatch({type: "SET_LOGGED_IN", payload: false});
                setTimeout(() => window.location.replace('/'), 2000);
            },
            (status, err) => {
                dispatch({type: "SET_ERROR", payload: { header: 'Kirjautumistiedoissa on virhe', data: [] } })
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
                setTimeout(() => window.location.reload(), 2000);
            },
            (status, err) => {
                dispatch({type: "SET_ERROR", payload: { header: 'Jotain meni vikaan', data: [] } })
            }
        );
    }
}
