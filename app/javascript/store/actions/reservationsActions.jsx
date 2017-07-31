/**
 * Created by owlaukka on 18/06/17.
 */
import React from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';

import AjaxService from '../../services/ajax_service';

moment.locale('fi');

export function fetchReservations(plane=undefined) {
    let route = '/api/v1/reservations';
    if (plane !== undefined) {
        route = `api/v1/planes/${plane.id}/reservations`;
    }
    return function(dispatch) {
        dispatch({type: "FETCH_RESERVATIONS_PENDING"});
        AjaxService.get(
            route,
            (status, data) => {
                data.map((res) => {
                    res.key = res.id;
                    res.title = res.reservation_type;
                    res.start = moment(res.start).toDate();
                    res.end = moment(res.end).toDate();
                });
                dispatch({type: "FETCH_RESERVATIONS_FULFILLED", payload: data})
            },
            (status, err) => {
                dispatch({type: "FETCH_RESERVATIONS_REJECTED", payload: err})
            }
        );
    }
}

export function submitReservation(event, start, end, plane, type, desc) {
    event.preventDefault();
    if (plane === undefined) {
        return (dispatch) => {
            dispatch({type: "SUBMIT_RESERVATION_REJECTED", payload: "Valitse kone"});
        }
    }
    const reservation = {
        start: start,
        end: end,
        plane_id: plane.id,
        reservation_type: type,
        description: desc,
    };
    return function(dispatch) {
        dispatch({type: "SUBMIT_RESERVATION_PENDING"});
        AjaxService.post(
            '/api/v1/reservations',
            reservation,
            (status, data) => {
                dispatch({type: "SUBMIT_RESERVATION_FULFILLED"});
                dispatch({type: "RESET_NEW_RESERVATION"});
                dispatch(fetchReservations());
            },
            (status, err) => {
                dispatch({type: "SUBMIT_RESERVATION_REJECTED", payload: err})
            }
        );
    }
}

export function destroyReservation(res) {
    console.log(res.id)
    return function(dispatch) {
        dispatch({type: "DESTROY_RESERVATION_PENDING"});
        AjaxService.destroy(
            '/api/v1/reservations/' + res.id,
            (status, data) => {
                dispatch({type: "DESTROY_RESERVATION_FULFILLED"});
                dispatch(fetchReservations());
            },
            (status, err) => {
                dispatch({type: "DESTROY_RESERVATION_REJECTED", payload: err})
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

export function fillForm(timeSlot, reservations) {
    if (!timeIsValid(timeSlot, reservations)) {
        return reservations;
    }

    let newArray = refreshReservationList(timeSlot, reservations);
    return (dispatch) => {
        dispatch({
            type: "SET_TIMESLOT",
            payload: {
                start: moment(timeSlot.start).toDate(),
                end: moment(timeSlot.end).toDate(),
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
                <td>{res.id}</td>
                <td>{moment(res.start).format('lll')}</td>
                <td>{moment(res.end).format('lll')}</td>
                <td>{res.plane.name}</td>
                <td>{res.reservation_type}</td>
                <td><Button onClick={() => dispatch(destroyReservation(res))} bsStyle="danger" bsSize="small">Poista</Button></td>
            </tr>
        )
    }
}

// --- LOCAL FUNCTIONS HERE ---

function timeIsValid(timeSlot, reservations) {
    if (timeSlot.start < new Date()) {
        alert('Älä varaa aikaa menneisyydestä!');
        return false;
    }

    for (let res of reservations) {
        if ((timeSlot.end > res.start && timeSlot.end <= res.end) ||
            (timeSlot.start >= res.start && timeSlot.start < res.end) ||
            (timeSlot.start <= res.start && timeSlot.end >= res.end)) {
            alert("Et voi varata jo varattua aikaa");
            return false;
        }
    }
    return true;
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
        end: timeSlot.end,
        reservation_type: 'selected',
    };
    newArray.push(res);
    return newArray;
}