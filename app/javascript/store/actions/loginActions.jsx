import React from 'react';
import axios from 'axios';
import moment from 'moment';

export function loginUser() {
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
