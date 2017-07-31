/**
 * Created by owlaukka on 28/07/17.
 */
import moment from 'moment';

import { fetchReservations } from "./reservationsActions"
import AjaxService from '../../services/ajax_service';

export function selectTimeForNotifier(timeSlot, reservations) {
    if (!timeIsValid(timeSlot)) {
        return reservations;
    }

    let newArray = refreshEventsList(timeSlot, reservations);
    return (dispatch) => {
        dispatch({type: "SET_NOTIFIER_START", payload: timeSlot.start});
        dispatch({type: "SET_NOTIFIER_END", payload: timeSlot.end});
        dispatch({type: "SET_COLLAPSED", payload: true});
        dispatch({type: "SET_RESERVATIONS", payload: newArray})
    };
}

export function submitNotifier(event, notifier) {
    event.preventDefault();

    notifier.start = moment(notifier.start).toDate();
    notifier.end = moment(notifier.end).toDate();
    return (dispatch) => {
        dispatch({type: "SUBMIT_NOTIFIER_PENDING"});
        AjaxService.post(
            '/api/v1/availability_notifiers',
            notifier,
            (status, data) => {
                dispatch({type: "SUBMIT_NOTIFIER_FULFILLED"});
                dispatch({type: "RESET_NOTIFIER"});
                dispatch(fetchReservations())
            },
            (status, err) => {
                dispatch({type: "SUBMIT_NOTIFIER_REJECTED", payload: err});
            }
        );
    }
}

export function setNotifierMode() {
    return (dispatch) => {
        dispatch({type: "SET_NOTIFIER_MODE"})
    }
}

export function setStart(start) {
    return (dispatch) => {
        dispatch({type: "SET_NOTIFIER_START", payload: start})
    }
}

export function setEnd(end) {
    return (dispatch) => {
        dispatch({type: "SET_NOTIFIER_END", payload: end})
    }
}

export function setNotifierType(type) {
    return (dispatch) => {
        dispatch({type: "SET_NOTIFIER_TYPE", payload: type})
    }
}

// --- LOCAL FUNCTIONS ---
function timeIsValid(timeSlot) {
    if (timeSlot.start < new Date()) {
        alert('Älä tarkkaile menneisyyttä!');
        return false;
    }
    return true;
}

function refreshEventsList(timeSlot, events) {
    let newArray = [];
    for (let o of events) {
        newArray.push(o);
    }
    if (events.length !== 0 &&
        (events[events.length-1].title === '<valittu aika>'
            || events[events.length-1].title === '<valittu aika tarkkailijalle>')) {
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