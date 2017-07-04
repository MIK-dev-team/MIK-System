/**
 * Created by owlaukka on 30/06/17.
 */
import React from 'react';
import axios from 'axios';

import { allFieldsValid } from './applicationValidationActions';

export function submitApplication(app, event) {
    event.preventDefault();
    return function(dispatch) {
        if (!allFieldsValid(app)) {
            dispatch({type: "SUBMIT_APPLICATION_REJECTED", payload: ["Tarkasta täyttämäsi kentät"]});
            return;
        }

        dispatch({type: "RESET_ERROR_MSG"});
        dispatch({type: "SUBMIT_APPLICATION_PENDING"});
        window.scrollTo(0, 0);
        axios.post('/membership_applications.json', app)
            .then(() => {
                const success = "Hakemuksenne on lähetetty onnistuneesti."
                dispatch({type: "SUBMIT_APPLICATION_FULFILLED", payload: success});
                setTimeout(() => window.location.replace('/'), 5000);
            })
            .catch((err) => {
                dispatch({type: "SUBMIT_APPLICATION_REJECTED", payload: err.response.data});
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

export function setRepeatEmail(repeatEmail) {
    return (dispatch) => {
        dispatch({type: "SET_REPEAT_EMAIL", payload: repeatEmail})
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

export function setPhoneNumber(number) {
    return (dispatch) => {
        dispatch({type: "SET_PHONE_NUMBER", payload: number})
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