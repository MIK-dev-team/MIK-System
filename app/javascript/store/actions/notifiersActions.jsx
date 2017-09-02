/**
 * Created by owlaukka on 28/07/17.
 */
import moment from 'moment';

import { fetchReservations } from "./reservationsActions"
import AjaxService from '../../services/ajax_service';
import { notifierTimeIsValid, refreshNotifiersList } from "../../services/logic/notifierLogic";

export function fetchNotifiers(user=undefined) {
    user = { id: 1 }; // TODO: remove this when user is supported. allow user to be undefied only for admin
    let route = '/api/v1/notifiers';
    if (user !== undefined) {
        route = `api/v1/user/${user.id}/notifiers`;
    }
    return function(dispatch) {
        dispatch({type: "FETCH_NOTIFIERS_PENDING"});
        AjaxService.get(
            route,
            (status, data) => {
                dispatch({type: "FETCH_NOTIFIERS_FULFILLED", payload: data});
            },
            (status, err) => {
                dispatch({type: "FETCH_NOTIFIERS_REJECTED", payload: err});
                dispatch({type: "SET_ERROR", payload: { header: 'Tapahtui virhe hakiessa tarkkailijoita tietokannasta', data: [] } });
            }
        );
    }
}

export function selectTimeForNotifier(timeSlot, reservations, dispatch) {
    if (!notifierTimeIsValid(timeSlot)) {
        return;
    }

    let newArray = refreshNotifiersList(timeSlot, reservations);
    dispatch(dispatchSelectTimeForNotifier(timeSlot, newArray));
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
                dispatch({type: "SET_SUCCESS", payload: { header: 'Tarkkailija luotu!', text: '' }});
                dispatch(fetchReservations())
            },
            (status, err) => {
                dispatch({type: "SUBMIT_NOTIFIER_REJECTED", payload: err});
                dispatch({type: "SET_ERROR", payload: { header: 'Lähetysvirhe', data: err } });
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
function dispatchSelectTimeForNotifier(timeSlot, events) {
    return (dispatch) => {
        dispatch({type: "SET_NOTIFIER_START", payload: timeSlot.start});
        dispatch({type: "SET_NOTIFIER_END", payload: timeSlot.end});
        dispatch({type: "SET_COLLAPSED", payload: true});
        dispatch({type: "SET_RESERVATIONS", payload: events})
    };
}