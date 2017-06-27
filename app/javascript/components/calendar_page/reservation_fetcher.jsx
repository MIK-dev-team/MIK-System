import React from 'react';
import { connect } from 'react-redux';
import { fetchReservations } from '../../store/actions/reservationsActions';

import Calendar from './calendar';

export class ReservationFetcher extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchReservations());
    }

    render() {
        return(
            <Calendar />
        )
    }
}

export default connect((store) => {
    return {}
})(ReservationFetcher)