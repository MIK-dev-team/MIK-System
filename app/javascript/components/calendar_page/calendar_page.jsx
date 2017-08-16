import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import ReservationFetcher from "./reservation_fetcher";
import PlaneSelection from './plane_selection';
import NotifierModeSelection from "./notifier_mode_selection";
import NotifierForm from './notifier_form'
import ReservationModal from "../reservation_modal";
import Notifications from '../common/notifications';

export class CalendarPage extends React.Component {
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
                    <Notifications/>
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
        notifierMode: store.notifiers.notifierMode,
    }
})(CalendarPage)