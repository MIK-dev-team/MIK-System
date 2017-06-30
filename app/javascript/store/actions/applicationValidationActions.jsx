/**
 * Created by owlaukka on 30/06/17.
 */
import React from 'react';
import moment from 'moment';

export function usernameIsValid(username) {
    if (username.indexOf(' ') > -1) {
        return false
    }
    if (username.length < 8) {
        return false;
    }
    return true;
}

export function emailIsValid(email) {
    let copy = (' ' + email).slice(1);
    if (copy.replace(/[^@]/g, "").length !== 1) {
        return false;
    }
    return true;
}

export function repeatEmailIsValid(email, repeat) {
    return email === repeat;
}

export function birthdayIsValid(bday) {
    let dateFormat1 = "D.M.YYYY",
        dateFormat2 = "D.M.YY",
        correctFormat = null;
    if (moment(bday, dateFormat1, true).isValid()) {
        correctFormat = dateFormat1;
    } else if (moment(bday, dateFormat2, true).isValid()) {
        correctFormat = dateFormat2;
    }


    if (correctFormat === null) {
        return false;
    }
    if (moment(bday, correctFormat).format('YYYY') < 1900) {
        return false;
    }
    if (moment(bday, correctFormat) >= moment()) {
        return false;
    }
    return true;
}

export function fullNameIsValid(name) {
    return /^[a-zA-ZöäåÖÄÅ ]+$/.test(name);
}

export function addressIsValid(address) {
    if (address.length < 1) {
        return false;
    }
    return true;
}

export function postalCodeIsValid(code) {
    return /^[0-9]{5}$/.test(code);
}

export function cityIsValid(city) {
    return /^[a-zA-ZöäåÖÄÅ\- ]+$/.test(city);
}

export function allFieldsValid(submitObject) {
    return usernameIsValid(submitObject.username) &&
            emailIsValid(submitObject.email) &&
            birthdayIsValid(submitObject.birthday) &&
            fullNameIsValid(submitObject.full_name) &&
            addressIsValid(submitObject.address) &&
            postalCodeIsValid(submitObject.postal_code) &&
            cityIsValid(submitObject.city)

}