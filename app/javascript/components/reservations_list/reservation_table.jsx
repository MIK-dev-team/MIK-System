import React from 'react';
import { Table } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import { connect } from 'react-redux';
import { fetchReservations } from '../../store/actions/reservationsActions';

import ReservationTableContent from './reservation_table_content';

export class ReservationTable extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchReservations());
    }

    render() {
        let body;
        const header =
            <thead>
            <tr>
                <th>#</th>
                <th>Alkamisaika</th>
                <th>Loppumisaika</th>
                <th>Kone</th>
                <th>Lennon tyyppi</th>
            </tr>
            </thead>

        if (this.props.fetching === true && this.props.fetched === false) {
            body =
                <div>
                    <Table striped hover responsive>
                        {header}
                    </Table>
                    <ReactLoading id="load" type="balls" color="#444" />
                </div>
        } else {
            body =
                <div>
                    <Table striped hover responsive>
                        {header}
                        <ReservationTableContent
                            reservations={this.props.reservations}
                            dispatch={this.props.dispatch}
                        />
                    </Table>
                </div>
        }

        return (
            <div>
                <h1>Varaukset</h1>
                {body}
            </div>
        )
    }
}
export default connect((store) => {
    return {
        reservations: store.reservations.reservations,
        fetched: store.reservations.fetched,
        fetching: store.reservations.fetching
    }
})(ReservationTable);