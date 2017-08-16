/**
 * Created by owlaukka on 14/08/17.
 */

import AjaxService from '../../services/ajax_service';

export function showModal(res) {
    return (dispatch) => {
        dispatch({type: "SHOW_MODAL", payload: res});
    }
}

export function hideModal() {
    return (dispatch) => {
        dispatch({type: "HIDE_MODAL"})
    }
}

export function saveChangesToReservation(values) {
    values.plane_id = values.plane;
    // TODO: make a notice when that branch is merged
    return (dispatch) => {
        dispatch({type: "UPDATE_RESERVATION_PENDING"});
        AjaxService.patch(
            '/api/v1/reservations/' + values.id,
            values,
            (status, data) => {
                console.log(status, data)
                dispatch({type: "UPDATE_RESERVATION_FULFILLED"});
                setTimeout(() => window.location.replace('/varaukset'), 5000);
            },
            (status, err) => {
                dispatch({type: "UPDATE_RESERVATION_REJECTED", payload: err})
            }
        );
    }
}

export function setReservation(reservation) {
    return (dispatch) => {
        dispatch({type: "SET_RESERVATION", payload: reservation})
    }
}

export function destroyReservationAndRedirect(res, path) {
    return (dispatch) => {
        dispatch({type: "DESTROY_RESERVATION_PENDING"});
        AjaxService.destroy(
            '/api/v1/reservations/' + res.id,
            (status, data) => {
                dispatch({type: "DESTROY_RESERVATION_FULFILLED"});
                setTimeout(() => window.location.replace(path), 5000);
            },
            (status, err) => {
                dispatch({type: "DESTROY_RESERVATION_REJECTED", payload: err})
            }
        );
    }
}