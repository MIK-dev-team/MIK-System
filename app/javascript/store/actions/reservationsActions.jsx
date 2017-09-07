/**
 * Created by owlaukka on 18/06/17.
 */
import { reset } from 'redux-form';
import moment from 'moment';

import AjaxService from '../../services/ajax_service';
import { reservationTimeIsValid,
    refreshReservationListOnStartChange,
    refreshReservationListOnEndChange,
    refreshReservationList
} from "../../services/logic/reservationLogic";

moment.locale('fi');

export function fetchReservations(plane=undefined) {
    let route = '/api/v1/reservations';
    if (plane !== undefined) {
        route = `/api/v1/planes/${plane.id}/reservations`;
    }
    return function(dispatch) {
        dispatch({type: "FETCH_RESERVATIONS_PENDING"});
        AjaxService.get(
            route,
            (status, data) => {
                dispatch({type: "FETCH_RESERVATIONS_FULFILLED", payload: data})
            },
            (status, err) => {
                dispatch({type: "FETCH_RESERVATIONS_REJECTED", payload: err})
            }
        );
    }
}

export function fetchMyReservations(plane=undefined) {
    let route;
    if (plane !== undefined) {
        route = `api/v1/planes/${plane.id}/my_reservations`;
    } else {
        route = `api/v1/all_my_reservations`;
    }
    return function(dispatch) {
        dispatch({type: "FETCH_RESERVATIONS_PENDING"});
        AjaxService.get(
            route,
            (status, data) => {
                dispatch({type: "FETCH_RESERVATIONS_FULFILLED", payload: data});
            },
            (status, err) => {
                dispatch({type: "FETCH_RESERVATIONS_REJECTED", payload: err});
                dispatch({type: "SET_ERROR", payload: { header: 'Tapahtui virhe hakiessa varauksia tietokannasta', data: err } });
            }
        );
    }
}

export function submitReservation(values) {
    window.scrollTo(0, 200);
    return (dispatch) => {
        dispatch({type: "SUBMIT_RESERVATION_PENDING"});
        AjaxService.post(
            '/api/v1/reservations',
            values,
            (status, data) => {
                dispatch({type: "SUBMIT_RESERVATION_FULFILLED"});
                dispatch({type: "SET_SUCCESS", payload: { header: 'Varaus tallennettu!', text: '' }});
                dispatch({type: "RESET_NEW_RESERVATION"});
                dispatch(reset('ReservationForm'));
                dispatch(fetchReservations());
            },
            (status, err) => {
                dispatch({type: "SUBMIT_RESERVATION_REJECTED", payload: err})
                dispatch({type: "SET_ERROR", payload: { header: 'Lähetysvirhe', data: err } });
            }
        );
    }
}

export function destroyReservation(res) {
    return (dispatch) => {
        dispatch({type: "DESTROY_RESERVATION_PENDING"});
        AjaxService.destroy(
            '/api/v1/reservations/' + res.id,
            (status, data) => {
                dispatch({type: "DESTROY_RESERVATION_FULFILLED"});
                dispatch({type: "SET_SUCCESS", payload: { header: 'Varaus poistettu!', text: '' }});
                dispatch(fetchReservations());
            },
            (status, err) => {
                dispatch({type: "DESTROY_RESERVATION_REJECTED", payload: err})
                dispatch({type: "SET_ERROR", payload: { header: 'Poistovirhe', data: err } });
            }
        );
    }
}

export function massDestroyReservation(values) {
    window.scrollTo(0, 200);
    return (dispatch) => {
        dispatch({type: "MASS_DESTROY_RESERVATION_PENDING"});
        AjaxService.post(
            '/api/v1/joukkoperu/',
            values,
            (status, data) => {
                dispatch({type: "MASS_DESTROY_RESERVATION_FULFILLED"});
                dispatch({type: "SET_SUCCESS", payload: { header: 'Varaukset poistettu!', text: '' }});
                dispatch({type: "RESET_NEW_RESERVATION"});
                dispatch(reset('ReservationForm'));
                dispatch(fetchReservations());
            },
            (status, err) => {
                dispatch({type: "MASS_DESTROY_RESERVATION_REJECTED", payload: err});
                dispatch({type: "SET_ERROR", payload: { header: 'Poistovirhe', data: err } });
            }
        );
    }
}

export function setType(event) {
    return (dispatch) => {
        dispatch({type: "SET_TYPE", payload: event.target.value});
    }
}

export function setCollapsed(prev) {
    return (dispatch) => {
        dispatch({type: "SET_COLLAPSED", payload: !prev})
    }
}

export function setSidebarMod(newSelect) {
    return (dispatch) => {
        dispatch({type: "TOGGLE_SIDEBARMOD", payload: newSelect })
    }
}

export function setReservationStart(start, reservations, dispatch) {
    const updatedReservations = refreshReservationListOnStartChange(start, reservations);
    dispatch(dispatchSetReservationStart(start, updatedReservations));
}

export function setReservationEnd(end, reservations, dispatch) {
    const updatedReservations = refreshReservationListOnEndChange(end, reservations);
    dispatch(dispatchSetReservationEnd(end, updatedReservations));
}

export function fillForm(timeSlot, reservations, sidebarMod, dispatch) {
    if (!reservationTimeIsValid(timeSlot, reservations, sidebarMod)) {
        return;
    }
    let newArray = refreshReservationList(timeSlot, reservations);
    dispatch(dispatchFillForm(timeSlot, newArray));
}

// --- LOCAL FUNCTIONS HERE ---

function dispatchFillForm(timeSlot, reservations) {
    return (dispatch) => {
        dispatch({
            type: "SET_TIMESLOT",
            payload: {
                start: moment(timeSlot.start).format(),
                end: moment(timeSlot.end).format(),
            }
        });

        dispatch({type: "SET_COLLAPSED", payload: false});
        dispatch({type: "SET_RESERVATIONS", payload: reservations})
    };
}

function dispatchSetReservationStart(start, reservations) {
    return (dispatch) => {
        dispatch({type: "SET_RESERVATION_START", payload: start});
        dispatch({type: "SET_RESERVATIONS", payload: reservations});
    }
}

function dispatchSetReservationEnd(end, reservations) {
    return (dispatch) => {
        dispatch({type: "SET_RESERVATION_END", payload: end});
        dispatch({type: "SET_RESERVATIONS", payload: reservations});
    }
}