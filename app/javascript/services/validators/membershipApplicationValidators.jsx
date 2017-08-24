/**
 * Created by owlaukka on 30/06/17.
 */
import moment from 'moment';

import { minLength, containsExactly, containsAtLeast } from "./commonValidators";

export const isLongerThan8Characters = minLength(8);

export const containsAtOnce = containsExactly('@', 1);

export const containsAtLeast1Period = containsAtLeast('.', 1);

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
        return 'Syntymäaikasi ei voi olla tulevaisuudessa'
    } else {
        return undefined
    }
};

export const nameIsValid = value =>
    /^[a-zA-ZöäåÖÄÅ\-' ]+$/.test(value) ? undefined : 'Nimi voi sisältää vain aakkosia, ääkkösiä ja välilyöntejä.'

export const postalCodeIsValid = value =>
    /^[0-9]{5}$/.test(value) ? undefined : 'Postinumerossa pitää olla tasan viisi numeroa'

export const cityIsValid = value =>
    /^[a-zA-ZöäåÖÄÅ\- ]+$/.test(value) ? undefined : 'Tarkista, että kirjoitit kaupungin oikein'

export const phoneNumberIsValid = value =>
    /^[0-9\+\-\(\) ]+$/.test(value) ? undefined : 'Tarkista, että kirjoitit puhelinnumerosi oikein'
