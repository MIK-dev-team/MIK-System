import React from 'react';
import moment from 'moment'
import { Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

moment.locale('fi');

export default class ReservationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "harraste"
        }

        this.submitReservation = this.submitReservation.bind(this);
        this.setType = this.setType.bind(this);
    }

    submitReservation(event) {
        console.log("start: " + this.props.timeSlot.start +
                    "\nend: " + this.props.timeSlot.end +
                    "\nplanetype: " + this.props.plane +
                    "\ntype: " + this.state.type);

        // TODO: LÄHETÄ TÄMÄ DATA PALVELIMELLE ASYNKRONISESTI JA LATAA ONNISTUESSA ETUSIVU JA ONNISTUMISVIESTI. MUUTEN NÄYTÄ VIRHE TÄLLÄ SIVULLA
        event.preventDefault();
    }

    formatTimes(time) {
        if (time != "")
            return (moment(time).format('lll'));
        else
            return "";
    }

    setType(event) {
        this.setState({
            type: event.target.value
        });
    }

    render() {
        return (
            <Panel header={<h3>Tee varaus</h3>}>
                <form onSubmit={this.submitReservation}>
                    <FormGroup controlId="1">
                        <ControlLabel>Lennon alku</ControlLabel>
                        <FormControl disabled type="text" value={this.formatTimes(this.props.timeSlot.start)} />
                    </FormGroup>
                    <FormGroup controlId="2">
                        <ControlLabel>Lennon loppu</ControlLabel>
                        <FormControl disabled type="text" value={this.formatTimes(this.props.timeSlot.end)} />
                    </FormGroup>
                    <FormGroup controlId="selectPlane">
                        <ControlLabel>Lentokone</ControlLabel>
                        <FormControl disabled componentClass="select" value={this.props.plane}>
                            <option value="kone1">Kone 1</option>
                            <option value="kone2">Kone 2</option>
                            <option value="kone3">Kone 3</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="selectPlane">
                        <ControlLabel>Lentokone</ControlLabel>
                        <FormControl componentClass="select" value={this.state.type} onChange={this.setType}>
                            <option value="opetus">Opetuslento</option>
                            <option value="harraste">Harrastelento</option>
                        </FormControl>
                    </FormGroup>
                    <Button type="submit">Tee varaus</Button>
                </form>
            </Panel>
        )
    }
}