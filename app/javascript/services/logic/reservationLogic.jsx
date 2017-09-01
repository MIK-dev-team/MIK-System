/**
 * Created by owlaukka on 29/08/17.
 */
import React from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';

import { showModal } from "../../store/actions/singleReservationActions";
import { destroyReservation } from "../../store/actions/reservationsActions";
import { timeIsInThePastAlert, lastElementInListTemporaryType, copyEventsList, overlappingReservationsExistForTimeSlot } from "./commonFunctions";

export function reservationTimeIsValid(timeSlot, reservations, sidebarMod) {
    const overlapping = overlappingReservationsExistForTimeSlot(timeSlot, reservations);
    return !timeIsInThePastAlert(timeSlot.start) || (sidebarMod && overlapping)
}

export function refreshReservationListOnStartChange(start, reservations) {
    let newArray = copyEventsList(reservations);
    if (lastElementInListTemporaryType(reservations)) {
        newArray[newArray.length-1].start = start;
    }
    return newArray;
}

export function refreshReservationListOnEndChange(end, reservations) {
    let newArray = copyEventsList(reservations);
    if (lastElementInListTemporaryType(reservations)) {
        newArray[newArray.length-1].end = end;
    }

    return newArray;
}

export function refreshReservationList(timeSlot, reservations) {
    let newArray = copyEventsList(reservations);
    if (lastElementInListTemporaryType(reservations)) {
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