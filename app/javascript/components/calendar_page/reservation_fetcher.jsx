import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Calendar from './calendar';

export default class ReservationFetcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [{}],
            plane: this.props.plane
        }
    }

    fetchReservations() {
        axios.get('/reservations.json', {
                params: {
                    plane_id: this.props.plane
                }
            })
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
                console.log(error);
            });
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
                console.log(error);
            });
    }

    render() {
        return(<Calendar plane={this.props.plane} reservations={this.state.reservations} />)
    }
}