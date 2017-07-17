import React from 'react';
import { connect } from 'react-redux';
import { fetchReservations } from '../../store/actions/reservationsActions';

import Calendar from './calendar';

export class ReservationFetcher extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.plane !== nextProps.plane) {
            this.props.dispatch(fetchReservations(nextProps.plane));
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchReservations(this.props.plane));
    }

    render() {
        return(
            <Calendar />
        )
    }
}

export default connect((store) => {
    return {
        plane: store.reservations.plane
    }
})(ReservationFetcher)