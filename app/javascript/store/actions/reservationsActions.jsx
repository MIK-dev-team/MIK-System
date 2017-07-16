/**
 * Created by owlaukka on 18/06/17.
 */
import React from 'react';
import moment from 'moment';

import AjaxService from '../../services/ajax_service';

moment.locale('fi');

export function fetchReservations() {
    return function(dispatch) {
        dispatch({type: "FETCH_RESERVATIONS_PENDING"});
        AjaxService.get(
            '/reservations.json',
            (status, data) => {
                data.map((res) => {
                    res.key = res.id;
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
    const reservation = {
        start: start,
        end: end,
        plane_id: plane,
        reservation_type: type,
        description: desc,
    };
    event.preventDefault();
    return function(dispatch) {
        dispatch({type: "SUBMIT_RESERVATION_PENDING"});
        AjaxService.post(
            '/reservations.json',
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

export function selectPlane(plane) {
    return (dispatch) => {
        dispatch({type: "SELECT_PLANE", payload: plane});
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

export function fillForm(timeSlot) {
    return (dispatch) => {
        dispatch({
            type: "SET_TIMESLOT",
            payload: {
                start: moment(timeSlot.start).toDate(),
                end: moment(timeSlot.end).toDate(),
            }
        });

        dispatch({type: "SET_COLLAPSED", payload: false});
    }
}

export function mapReservations(reservations) {
    if (reservations === undefined || reservations[0].id === undefined) {
        return <tr key="empty"></tr>
    } else {
        return reservations.map((res) =>
            <tr key={res.id}>
                <td>{res.id}</td>
                <td>{moment(res.start).format('lll')}</td>
                <td>{moment(res.end).format('lll')}</td>
                <td>{res.plane_id}</td>
                <td>{res.reservation_type}</td>
            </tr>
        )
    }
}