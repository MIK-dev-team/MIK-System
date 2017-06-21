import React from 'react';
import { mapReservations } from '../../store/actions/reservationsActions';

export default class ReservationTableContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tbody>
                {mapReservations(this.props.reservations)}
            </tbody>
        )
    }
}