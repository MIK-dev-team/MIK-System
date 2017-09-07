/**
 * Created by owlaukka on 30/08/17.
 */
import { timeIsInThePastAlert, copyEventsList, lastElementInListTemporaryType } from "./commonFunctions";

export function notifierTimeIsValid(timeSlot) {
    return !timeIsInThePastAlert(timeSlot.start)
}

export function refreshNotifiersList(timeSlot, events) {
    let newArray = copyEventsList(events);
    if (lastElementInListTemporaryType(events)) {
        newArray.pop();
    }

    const res = {
        title: "<valittu aika tarkkailijalle>",
        start: timeSlot.start,
        end: timeSlot.end,
        reservation_type: 'observer'
    };
    newArray.push(res);

    return newArray;
}