import React from 'react';
import { Grid, Row, Col, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import ReservationFetcher from "./reservation_fetcher";
import PlaneSelection from './plane_selection';
import NotifierModeSelection from "./notifier_mode_selection";

export class CalendarPage extends React.Component {
    render() {
        let alert;
        if (this.props.sent) {
            alert = (<Alert bsStyle="success" onDismiss={() => true}>
                <h4>Varaus tallennettu!</h4>
                <p>
                    <Button bsStyle="info">Piilota</Button>
                </p>
            </Alert>)
        } else if (this.props.error !== null && this.props.error !== undefined) {
            alert = (<Alert bsStyle="danger" onDismiss={() => true}>
                <h4>Kyseisen ajan varaaminen kyseiselle lentokoneelle ei onnistunut</h4>
                <p>
                    <Button bsStyle="info">Piilota</Button>
                </p>
            </Alert>)
        } else {
            alert = <div></div>
        }

        return (
            <Grid>
                <h1>Varauskalenteri</h1>
                <Row>
                    <PlaneSelection/>
                    <NotifierModeSelection/>
                </Row>
                <br />
                {alert}
                <br />
                <ReservationFetcher/>
                <br />
            </Grid>
        )
    }
}

export default connect((store) => {
    return {
        sent: store.reservations.sent,
        error: store.reservations.submitError,
    }
})(CalendarPage)