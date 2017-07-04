/**
 * Created by owlaukka on 30/06/17.
 */
import React from 'react';
import moment from 'moment';

const validators = {
    username: usernameIsValid,
    email: emailIsValid,
    repeatEmail: repeatEmailIsValid,
    birthday: birthdayIsValid,
    fullName: fullNameIsValid,
    address: addressIsValid,
    postalCode: postalCodeIsValid,
    city: cityIsValid,
    phoneNumber: phoneNumberIsValid,
};

export function validationStateForForm(fieldName, ...fieldValues) {
    if (fieldValues[0].length === 0) {
        return null;
    } else if (validators[fieldName](...fieldValues)) {
        return 'success'
    } else {
        return 'error'
    }
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

function isEmpty(value) {
    if (value == undefined || value.length == 0) {
        return false;
    }
}

function usernameIsValid(username) {
    if (username === undefined) {
        return tr
    }
    if (username.indexOf(' ') > -1) {
        return false
    }
    if (username.length < 8) {
        return false;
    }
    return true;
}

function emailIsValid(email) {
    let copy = (' ' + email).slice(1);
    if (copy.replace(/[^@]/g, "").length !== 1) {
        return false;
    }
    return true;
}

function repeatEmailIsValid(email, repeat) {
    return email == repeat;
}

function birthdayIsValid(bday) {
    if (isEmpty(bday)) {
        return false;
    }
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

function fullNameIsValid(name) {
    if (isEmpty(name)) {
        return false;
    }
    return /^[a-zA-ZöäåÖÄÅ ]+$/.test(name);
}

function addressIsValid(address) {
    if (isEmpty(address)) {
        return false;
    }
    return true;
}

function postalCodeIsValid(code) {
    if (isEmpty(code)) {
        return false;
    }
    return /^[0-9]{5}$/.test(code);
}

function cityIsValid(city) {
    if (isEmpty(city)) {
        return false;
    }
    return /^[a-zA-ZöäåÖÄÅ\- ]+$/.test(city);
}

function phoneNumberIsValid(number) {
    if (isEmpty(number)) {
        return false;
    }
    return /^[0-9\+\-\(\)]+$/.test(number);
}