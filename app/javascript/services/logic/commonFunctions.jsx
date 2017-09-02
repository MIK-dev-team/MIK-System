/**
 * Created by owlaukka on 30/08/17.
 */
import moment from 'moment';

import { timeIsNotInThePast } from "../validators/commonValidators";

export function copyEventsList(events) {
    let newArray = [];
    let i;
    for (i = 0; i < events.length; i++) {
        newArray.push(events[i]);
    }
    return newArray;
}

export function lastElementInListTemporaryType(events) {
    return events.length !== 0 &&
        (events[events.length-1].reservation_type === 'selected'
            || events[events.length-1].reservation_type === 'observer')
}

export function timeIsInThePastAlert(start) {
    if (!timeIsNotInThePast(start)) {
        alert('Älä varaa aikaa menneisyydestä!');
        return true;
    }
    return false;
}

export function overlappingReservationsExistForTimeSlot(timeSlot, reservations) {
    let i;
    for (i = 0; i < reservations.length; i++) {
        if ((reservations[i].reservation_type !== 'selected' && reservations[i].reservation_type !== 'observer') &&
            ((moment(timeSlot.end).isAfter(reservations[i].start) && moment(timeSlot.end).isSameOrBefore(reservations[i].end)) ||
                (moment(timeSlot.start).isSameOrAfter(reservations[i].start) && moment(timeSlot.start).isBefore(reservations[i].end)) ||
                (moment(timeSlot.start).isSameOrBefore(reservations[i].start) && moment(timeSlot.end).isSameOrAfter(reservations[i].end)))) {
            alert("Et voi varata jo varattua aikaa");
            return true;
        }
    }
    return false;
}