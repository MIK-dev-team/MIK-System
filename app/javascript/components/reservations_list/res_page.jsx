import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Grid } from 'react-bootstrap';
import ReservationTable from './reservation_table';

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
                response.data.map(function(res) {
                    res.start = moment(res.start).toDate();
                    res.end = moment(res.end).toDate();
                });

                this.setState({
                    reservations: response.data
                });
            }.bind(this))
            .catch(function (error) {
                console.log("errormessage: " + error);
            });
    }

    render() {
        return (
            <Grid>
                <ReservationTable reservations={this.state.reservations} />
            </Grid>
        )
    }
}