import React from 'react';
import axios from 'axios';
import ReservationList from './reservation_list';

export default class ReservationsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            reservations: [{}]
        };

    }

    componentDidMount() {
        axios.get('/reservations.json')
            .then(function (response) {
                this.setState({
                    reservations: response.data
                });
            }.bind(this))
            .catch(function (error) {
                console.log("errormessage: " + error);
            });
    }

    render() {
        console.log(this.state.reservations);
        return (
            <div>
                <h1>Varaukset</h1>
                <ReservationList reservations={this.state.reservations} />
            </div>
        )
    }
}