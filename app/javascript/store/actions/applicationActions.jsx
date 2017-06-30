/**
 * Created by owlaukka on 30/06/17.
 */
import React from 'react';
import axios from 'axios';

export function submitApplication(app) {
    return (dispatch) => {
        dispatch({type: "SUBMIT_APPLICATION_PENDING"})
        axios.post('liity', app)
            .then((response) => {
                dispatch({type: "SUBMIT_APPLICATION_FULFILLED"})
                console.log(response);
            })
            .catch((err) => {
                dispatch({type: "SUBMIT_APPLICATION_REJECTED", payload: err.response});
                console.log(err);
            });
    }
}

export function setUsername(username) {
    return (dispatch) => {
        dispatch({type: "SET_USERNAME", payload: username})
    }
}

export function setEmail(email) {
    return (dispatch) => {
        dispatch({type: "SET_EMAIL", payload: email})
    }
}

export function setBirthday(bday) {
    return (dispatch) => {
        dispatch({type: "SET_BIRTHDAY", payload: bday})
    }
}

export function setMemberType(type) {
    return (dispatch) => {
        dispatch({type: "SET_MEMBER_TYPE", payload: type})
    }
}

export function setFullName(name) {
    return (dispatch) => {
        dispatch({type: "SET_FULL_NAME", payload: name})
    }
}

export function setAddress(address) {
    return (dispatch) => {
        dispatch({type: "SET_ADDRESS", payload: address})
    }
}

export function setPostalCode(code) {
    return (dispatch) => {
        dispatch({type: "SET_POSTAL_CODE", payload: code})
    }
}

export function setCity(city) {
    return (dispatch) => {
        dispatch({type: "SET_CITY", payload: city})
    }
}

export function setLicences(licences) {
    return (dispatch) => {
        dispatch({type: "SET_LICENCES", payload: licences})
    }
}

export function setEngineExp(exp) {
    return (dispatch) => {
        dispatch({type: "SET_ENGINE_EXP", payload: exp})
    }
}

export function setOtherExp(exp) {
    return (dispatch) => {
        dispatch({type: "SET_OTHER_EXP", payload: exp})
    }
}

export function setOtherMemberships(memberships) {
    return (dispatch) => {
        dispatch({type: "SET_OTHER_MEMBERSHIPS", payload: memberships})
    }
}

export function setSilMembership(membership) {
    return (dispatch) => {
        dispatch({type: "SET_SIL_MEMBERSHIP", payload: membership})
    }
}

export function setSilNumber(number) {
    return (dispatch) => {
        dispatch({type: "SET_SIL_NUMBER", payload: number})
    }
}

export function setAdditionalInfo(info) {
    return (dispatch) => {
        dispatch({type: "SET_ADDITIONAL_INFO", payload: info})
    }
}