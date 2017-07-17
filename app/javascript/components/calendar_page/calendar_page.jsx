import React from 'react';
import { Grid, Row, Col, Button, ButtonToolbar, ButtonGroup, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectPlane } from '../../store/actions/reservationsActions';

import ReservationFetcher from "./reservation_fetcher";

const kone1 = 1,
    kone2 = 2,
    kone3 = 3,
    all = undefined;

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
                    <Col md={6}>
                        <ButtonToolbar>
                            <ButtonGroup bsSize="large">
                                <Button onClick={() => this.props.dispatch(selectPlane(kone1))} className={(this.props.selectedPlane === kone1) ? "active" : ""}>Kone 1</Button>
                                <Button onClick={() => this.props.dispatch(selectPlane(kone2))} className={(this.props.selectedPlane === kone2) ? "active" : ""}>Kone 2</Button>
                                <Button onClick={() => this.props.dispatch(selectPlane(kone3))} className={(this.props.selectedPlane === kone3) ? "active" : ""}>Kone 3</Button>
                                <Button onClick={() => this.props.dispatch(selectPlane(all))} className={(this.props.selectedPlane === undefined) ? "active" : ""}>Näytä kaikki</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Col>
                    <Col md={6}>
                        <h3 style={{"textAlign": "center"}}>Tähän ohjeet</h3>
                    </Col>
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
        selectedPlane: store.reservations.plane,
        sent: store.reservations.sent,
        error: store.reservations.submitError,
    }
})(CalendarPage)