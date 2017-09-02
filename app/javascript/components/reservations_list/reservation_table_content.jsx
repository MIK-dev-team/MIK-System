import React from 'react';
import { mapReservations } from "../../services/logic/reservationLogic";

export default class ReservationTableContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tbody>
                {mapReservations(this.props.reservations, this.props.dispatch)}
            </tbody>
        )
    }
}