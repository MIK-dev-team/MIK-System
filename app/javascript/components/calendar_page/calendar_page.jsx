import React from 'react';
import { Grid, Row, Col, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import ReservationFetcher from "./reservation_fetcher";
import PlaneSelection from './plane_selection';
import NotifierModeSelection from "./notifier_mode_selection";
import NotifierForm from './notifier_form'
import ReservationModal from "../reservation_modal";

let alert, notifierForm;
export class CalendarPage extends React.Component {
    setAlertFrame() {
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
    }

    notifierIndicationStyle() {
        if (this.props.notifierMode) {
            return {
                backgroundColor: "#90FF4480"
            }
        } else {
            return {}
        }
    }

    notifierForm() {
        if (this.props.notifierMode) {
            return <NotifierForm/>
        } else {
            return <div></div>
        }
    }

    render() {
        this.setAlertFrame();
        return (
            <Grid>
                <ReservationModal/>
                <h1>Varauskalenteri</h1>
                <div id="calendarWrapper" style={this.notifierIndicationStyle()}>
                    <Row>
                        <PlaneSelection/>
                        <NotifierModeSelection/>
                    </Row>
                    <br />
                    {alert}
                    <br />
                    {this.notifierForm()}
                    <ReservationFetcher/>
                </div>
                <br />
            </Grid>
        )
    }
}

export default connect((store) => {
    return {
        sent: store.reservations.sent,
        error: store.reservations.submitError,
        notifierMode: store.notifiers.notifierMode,
    }
})(CalendarPage)