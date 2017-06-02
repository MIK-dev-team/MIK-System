import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ReservationFetcher from './reservation_fetcher';

export default class CalendarPage extends React.Component {
    render() {
        return (
            <Grid>
                <h1>Varauskalenteri</h1>
                    <Row>
                        <Col md={6}>
                            <h3 style={{"text-align": "center"}}>Tähän koneen valinta</h3>
                        </Col>
                        <Col md={6}>
                            <h3 style={{"text-align": "center"}}>Tähän ohjeet</h3>
                        </Col>
                    </Row>
                <br />
                <ReservationFetcher/>
                <br />
            </Grid>
        )
    }
}