/**
 * Created by owlaukka on 18/06/17.
 */
import React from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';

import AjaxService from '../../services/ajax_service';
import { showModal } from './singleReservationActions';

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

export function submitReservation(event, start, end, plane, type, desc) {
    event.preventDefault();
    if (plane === undefined) {
        return (dispatch) => {
            // dispatch({type: "SUBMIT_RESERVATION_REJECTED", payload: "Valitse kone"});
            dispatch({type: "SET_ERROR", payload: {header: 'Lähetysvirhe', data: ['Valitse kone']}})
        }
    }
    const reservation = {
        start: moment(start).toDate(),
        end: moment(end).toDate(),
        plane_id: plane.id,
        reservation_type: type,
        additional_info: desc,
    };
    return function(dispatch) {
        dispatch({type: "SUBMIT_RESERVATION_PENDING"});
        AjaxService.post(
            '/api/v1/reservations',
            reservation,
            (status, data) => {
                dispatch({type: "SUBMIT_RESERVATION_FULFILLED"});
                dispatch({type: "RESET_NEW_RESERVATION"});
                dispatch({type: "SET_SUCCESS", payload: { header: 'Varaus tallennettu!', text: '' }});
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
    return function(dispatch) {
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

export function massDestroyReservation(event, start, end, plane, desc) {
    event.preventDefault();

    const cancellation = {
        start: moment(start).toDate(),
        end: moment(end).toDate(),
        plane_id: plane.id,
        description: desc,
    };

    return function(dispatch) {
        dispatch({type: "MASS_DESTROY_RESERVATION_PENDING"});
        AjaxService.post(
            '/api/v1/joukkoperu/',
            cancellation,
            (status, data) => {
                dispatch({type: "MASS_DESTROY_RESERVATION_FULFILLED"});
                dispatch({type: "SET_SUCCESS", payload: { header: 'Varaukset poistettu!', text: '' }});
                dispatch(fetchReservations());
            },
            (status, err) => {
                dispatch({type: "MASS_DESTROY_RESERVATION_REJECTED", payload: err})
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

export function setReservationStart(start, reservations) {
    let updatedReservations = refreshReservationListOnStartChange(start, reservations);
    return (dispatch) => {
        dispatch({type: "SET_RESERVATION_START", payload: start});
        dispatch({type: "SET_RESERVATIONS", payload: updatedReservations});
    }
}

export function setReservationEnd(end, reservations) {
    let updatedReservations = refreshReservationListOnEndChange(end, reservations);
    return (dispatch) => {
        dispatch({type: "SET_RESERVATION_END", payload: end});
        dispatch({type: "SET_RESERVATIONS", payload: updatedReservations});
    }
}

export function changeStartTime(time, previousTime, reservations) {
    const newTime = moment(previousTime).startOf('day').add(time, 'seconds');
    let updatedReservations = refreshReservationListOnStartChange(newTime, reservations);
    return (dispatch) => {
        dispatch({type: "SET_RESERVATION_START", payload: newTime});
        dispatch({type: "SET_RESERVATIONS", payload: updatedReservations});
    }
}

export function changeEndTime(time, previousTime, reservations) {
    const newTime = moment(previousTime).startOf('day').add(time, 'seconds');
    const updatedReservations = refreshReservationListOnEndChange(newTime, reservations);
    return (dispatch) => {
        dispatch({type: "SET_RESERVATION_END", payload: newTime});
        dispatch({type: "SET_RESERVATIONS", payload: updatedReservations});
    }
}

export function fillForm(timeSlot, reservations, sidebarMod) {
    if (!timeIsValid(timeSlot, reservations, sidebarMod)) {
        return reservations;
    }
    let newArray = refreshReservationList(timeSlot, reservations);
    return (dispatch) => {
        dispatch({
            type: "SET_TIMESLOT",
            payload: {
                start: moment(timeSlot.start).format(),
                end: moment(timeSlot.end).format(),
            }
        });

        dispatch({type: "SET_COLLAPSED", payload: false});
        dispatch({type: "SET_RESERVATIONS", payload: newArray})
    };
}

export function mapReservations(reservations, dispatch) {
    if (reservations === undefined || reservations.length === 0 || reservations[0].id === undefined) {
        return <tr key="empty"></tr>
    } else {
        return reservations.map((res) =>
            <tr key={res.id}>
                <td onClick={() => dispatch(showModal(res))}>{res.id}</td>
                <td onClick={() => dispatch(showModal(res))}>{moment(res.start).format('lll')}</td>
                <td onClick={() => dispatch(showModal(res))}>{moment(res.end).format('lll')}</td>
                <td onClick={() => dispatch(showModal(res))} >{res.plane.name}</td>
                <td onClick={() => dispatch(showModal(res))}>{res.reservation_type}</td>
                <td><Button onClick={() => dispatch(destroyReservation(res))} bsStyle="danger" bsSize="small">Poista</Button></td>
            </tr>
        )
    }
}

// --- LOCAL FUNCTIONS HERE ---

function timeIsValid(timeSlot, reservations, sidebarMod) {
    // if (moment(timeSlot.start).toDate() < moment().toDate()) {
    if (moment(timeSlot.start).isBefore(moment())) {
        alert('Älä varaa aikaa menneisyydestä!');
        return false;
    }

    for (let res of reservations) {
      if(sidebarMod === true) {
        if ((moment(timeSlot.end).isAfter(res.start) && moment(timeSlot.end).isSameOrBefore(res.end)) ||
            (moment(timeSlot.start).isSameOrAfter(res.start) && moment(timeSlot.start).isBefore(res.end)) ||
            (moment(timeSlot.start).isSameOrBefore(res.start) && moment(timeSlot.end).isSameOrAfter(res.end))) {
            alert("Et voi varata jo varattua aikaa");
            return false;
        }
    }}
    return true;
}

function refreshReservationListOnStartChange(start, reservations) {
    let newArray = [];
    for (let o of reservations) {
        newArray.push(o);
    }
    if (reservations.length !== 0 &&
        (reservations[reservations.length-1].reservation_type === 'selected'
            || reservations[reservations.length-1].reservation_type === 'observer')) {
        newArray[newArray.length-1].start = start;
    }
    return newArray;
}

function refreshReservationListOnEndChange(end, reservations) {
    let newArray = [];
    for (let o of reservations) {
        newArray.push(o);
    }
    if (reservations.length !== 0 &&
        (reservations[reservations.length-1].reservation_type === 'selected'
            || reservations[reservations.length-1].reservation_type === 'observer')) {
        newArray[newArray.length-1].end = end;
    }

    return newArray;
}

function refreshReservationList(timeSlot, reservations) {
    let newArray = [];
    for (let o of reservations) {
        newArray.push(o);
    }
    if (reservations.length !== 0 &&
        (reservations[reservations.length-1].title === '<valittu aika>'
            || reservations[reservations.length-1].title === '<valittu aika tarkkailijalle>')) {
        newArray.pop();
    }

    const res = {
        title: "<valittu aika>",
        start: timeSlot.start,
        end:timeSlot.end,
        reservation_type: 'selected',
    };
    newArray.push(res);
    return newArray;
}
