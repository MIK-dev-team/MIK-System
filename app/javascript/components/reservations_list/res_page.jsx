import React from 'react';
import { Grid } from 'react-bootstrap';

import ReservationTable from './reservation_table';
export default class ReservationsPage extends React.Component {
    render() {
        return (
            <Grid>
                <ReservationTable id="table"/>
            </Grid>
        )
    }
}