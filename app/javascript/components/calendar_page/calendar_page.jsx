import React from 'react';
import { Grid, Row, Col, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import Calendar from "./calendar";

const kone1 = "kone1",
      kone2 = "kone2",
      kone3 = "kone3";
let selected = kone1;

export default class CalendarPage extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedPlane: kone1
        };

        this.selectPlane = this.selectPlane.bind(this);
    }

    selectPlane(plane) {
        selected = plane;
        this.setState({
            selectedPlane: plane
        });
    }

    render() {

        return (
            <Grid>
                <h1>Varauskalenteri</h1>
                    <Row>
                        <Col md={6}>
                            <ButtonToolbar>
                                <ButtonGroup bsSize="large">
                                    <Button onClick={() => this.selectPlane(kone1)} className={(selected === kone1) ? "active" : ""}>Kone 1</Button>
                                    <Button onClick={() => this.selectPlane(kone2)} className={(selected === kone2) ? "active" : ""}>Kone 2</Button>
                                    <Button onClick={() => this.selectPlane(kone3)} className={(selected === kone3) ? "active" : ""}>Kone 3</Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </Col>
                        <Col md={6}>
                            <h3 style={{"textAlign": "center"}}>Tähän ohjeet</h3>
                        </Col>
                    </Row>
                <br />
                <Calendar plane={this.state.selectedPlane}/>
                <br />
            </Grid>
        )
    }
}