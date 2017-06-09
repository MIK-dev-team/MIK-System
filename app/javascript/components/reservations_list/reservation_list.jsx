import React from 'react';

export default class ReservationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reservations: this.props.reservations
        }
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.reservations) !== JSON.stringify(nextProps.reservations)) {
            this.setState({
                reservations: nextProps.reservations
            });
        }
    }

    render() {
        return (
            <p>Something and {this.state.reservations[0].start}</p>
        )
    }
}