import React from 'react';
import axios from 'axios';

let res = {};
export default class ReservationCreator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: this.props.submitted,
            msg: ""
        };

        this.submitReservation = this.submitReservation.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.reservation) !== JSON.stringify(nextProps.reservation)) {
            res = nextProps.reservation;
        }
        if (nextProps.submitted === true && this.props.submitted !== nextProps.submitted) {
            this.submitReservation();
            this.setState({
                submitted: false
            });
        }
    }

    submitReservation() {
        axios.post('/reservations.json', res)
            .then(function(response) {
                this.setState({
                    msg: "Yippii"
                });
                window.location.reload();
            }.bind(this))
            .catch(function(error) {
                this.setState({
                    msg: "vitut"
                });
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                {this.state.msg}
            </div>
        )
    }
}