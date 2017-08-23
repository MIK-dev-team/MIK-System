/**
 * Created by owlaukka on 30/06/17.
 */
import React from 'react';
import moment from 'moment';

export const required = value =>
    value ? undefined : 'Ei voi olla tyhjä'

export const doesNotContainSpaces = value =>
    value && value.indexOf(' ') > -1 ? 'Ei voi sisältää välilyöntejä' : undefined

export const isLongerThan8Characters = value =>
    value && value.length < 8 ? 'Pitää olla enemmän kuin 8 merkkiä pitkä.' : undefined

export const containsAt = value => {
    let copy = (' ' + value).slice(1);
    return copy.replace(/[^@]/g, "").length !== 1 ? 'Anna kunnollinen sähköpostiosoite' : undefined
};

export const containsPeriod = value => {
    let copy = (' ' + value).slice(1);
    return copy.replace(/[^.]/g, "").length !== 1 ? 'Anna kunnollinen sähköpostiosoite' : undefined
};

export const valuesMatch = original => value =>
    value !== original ? 'Sähköpostiosoitteet eivät täsmää' : undefined

const dateFormat = date => {
    let dateFormat1 = "D.M.YYYY",
        dateFormat2 = "D.M.YY",
        correctFormat = null;
    if (moment(date, dateFormat1, true).isValid()) {
        correctFormat = dateFormat1;
    } else if (moment(date, dateFormat2, true).isValid()) {
        correctFormat = dateFormat2;
    }
    return correctFormat;
};

export const birthdayIsInCorrectFormat = value =>
    dateFormat(value) === null ? 'Päivämäärä on väärässä muodossa' : undefined

export const birthdayIsNotTooOld = value => {
    const correctFormat = dateFormat(value)
    if (correctFormat !== null && moment(value, correctFormat).format('YYYY') < 1900) {
        return 'Syntymäaikasi ei taida olla ennen 1900-lukua'
    } else {
        return undefined
    }
};

export const birthdayIsNotInTheFuture = value => {
    const correctFormat = dateFormat(value)
    if (correctFormat !== null && moment(value, correctFormat) >= moment()) {
        return 'Syntymäaikasi ei taida olla ennen 1900-lukua'
    } else {
        return undefined
    }
};

export const nameIsValid = value =>
    /^[a-zA-ZöäåÖÄÅ' ]+$/.test(value) ? undefined : 'Nimi voi sisältää vain aakkosia, ääkkösiä ja välilyöntejä.'

export const postalCodeIsValid = value =>
    /^[0-9]{5}$/.test(value) ? undefined : 'Postinumerossa pitää olla tasan viisi numeroa'

export const cityIsValid = value =>
    /^[a-zA-ZöäåÖÄÅ\- ]+$/.test(value) ? undefined : 'Tarkista, että kirjoitit kaupungin oikein'

export const phoneNumberIsValid = value =>
    /^[0-9\+\-\(\) ]+$/.test(value) ? undefined : 'Tarkista, että kirjoitit puhelinnumerosi oikein'
