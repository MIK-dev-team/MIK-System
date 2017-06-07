import React from 'react';
import ReservationList from './reservation_list';

export default class ReservationsPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Varaukset</h1>
                <ReservationList />
            </div>
        )
    }
}