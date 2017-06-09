import React from 'react';
import { Table } from 'react-bootstrap';
import ReservationTableContent from './reservation_table_content';

export default class ReservationTable extends React.Component {
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
            <div>
                <h1>Varaukset</h1>
                <Table striped hover responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Alkamisaika</th>
                        <th>Loppumisaika</th>
                        <th>Kone</th>
                        <th>Lennon tyyppi</th>
                    </tr>
                    </thead>
                    <ReservationTableContent reservations={this.state.reservations} />
                </Table>
            </div>
        )
    }
}