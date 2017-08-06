/**
 * Created by owlaukka on 25/07/17.
 */
import React from 'react';

export function setPlanes(planes) {
    return function(dispatch) {
        dispatch({type: "SET_PLANES", payload: planes});
    }
}

export function selectPlane(plane) {
    return (dispatch) => {
        dispatch({type: "SELECT_PLANE", payload: plane});
        dispatch({type: "SET_NOTIFIER_PLANE", payload: plane})
    }
}