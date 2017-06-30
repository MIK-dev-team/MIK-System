/**
 * Created by owlaukka on 30/06/17.
 */
import React from 'react';

export function usernameIsValid(username) {
    return username.length > 7;
}

export function emailIsValid(email) {
    return true;
}

export function birthdayIsValid(bday) {
    return true;
}

export function fullNameIsValid(name) {
    return true;
}

export function addressIsValid(address) {
    return true;
}

export function postalCodeIsValid(code) {
    return true;
}

export function cityIsValid(city) {
    return true;
}