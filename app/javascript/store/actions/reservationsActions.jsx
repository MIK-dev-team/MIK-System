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