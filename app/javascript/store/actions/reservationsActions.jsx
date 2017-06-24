/**
 * Created by owlaukka on 18/06/17.
 */
import React from 'react';
import axios from 'axios';
import moment from 'moment';

export function fetchReservations() {
    return function(dispatch) {
        dispatch({type: "FETCH_RESERVATIONS_PENDING"});
        axios.get('/reservations.json')
            .then((response) => {
                dispatch({type: "FETCH_RESERVATIONS_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "FETCH_RESERVATIONS_REJECTED", payload: err})
            })
    }
}

export function submitReservation(reservation) {
    return function(dispatch) {
        dispatch({type: "SUBMIT_RESERVATION_PENDING"});
        axios.post('/reservations.json', reservation)
            .then(response => {
                dispatch({type: "SUBMIT_RESERVATION_FULFILLED"})
            })
            .catch(err => {
                dispatch({type: "SUBMIT_RESERVATION_REJECTED", payload: err})
            })
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

export function setFlightTime(timeSlot) {
    return (dispatch) => {
        dispatch({type: "SET_FLIGHT_TIME", payload: timeSlot});
    }
}

export function mapReservations(reservations) {
    return reservations.map((res) =>
        (<tr key={res.id}>
            <td>{res.id}</td>
            <td>{moment(res.start).format('lll')}</td>
            <td>{moment(res.end).format('lll')}</td>
            <td>{res.plane_id}</td>
            <td>{res.reservation_type}</td>
        </tr>)
    )
}