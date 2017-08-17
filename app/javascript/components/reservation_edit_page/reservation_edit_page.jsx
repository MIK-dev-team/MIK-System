/**
 * Created by owlaukka on 14/08/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';


import ReservationEditForm from './reservation_edit_form';
import { saveChangesToReservation } from '../../store/actions/singleReservationActions';

export class ReservationEditPage extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={4} mdOffset={4}>
                        <h2>Muokkaa varausta</h2>
                    </Col>
                </Row>
                <Row>
                    <Col mdOffset={3} md={6} xs={12} xsOffset={0}>
                        <ReservationEditForm
                            id="edit-form"
                            onSubmit={(values) => this.props.dispatch(saveChangesToReservation(values))}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default connect((store) => {
    return {
        reservation: store.singleReservation.reservation,
        logged: store.session.loggedIn,
    }
})(ReservationEditPage)