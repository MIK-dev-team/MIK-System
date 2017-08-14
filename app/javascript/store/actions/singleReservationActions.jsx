/**
 * Created by owlaukka on 14/08/17.
 */
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

export function saveChangesToReservation(res) {
    event.preventDefault();
    console.log(res)
}

// export function setReservation(reservation) {
//     return (dispatch) => {
//         dispatch({type: "SET_RESERVATION", payload: reservation})
//     }
// }
//
// export function clearReservation() {
//     return (dispatch) => {
//         dispatch({type: "CLEAR_RESERVATION"})
//     }
// }