import React from 'react';
import { connect } from 'react-redux';
import { fetchReservations } from '../../store/actions/reservationsActions';

import Calendar from './calendar';

export class ReservationFetcher extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.selectedPlane !== nextProps.selectedPlane) {
            this.props.dispatch(fetchReservations(nextProps.selectedPlane));
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchReservations(this.props.selectedPlane));
    }

    render() {
        return(
            <Calendar />
        )
    }
}

export default connect((store) => {
    return {
        selectedPlane: store.planes.selectedPlane
    }
})(ReservationFetcher)