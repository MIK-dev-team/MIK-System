import React from 'react';
import moment from 'moment'
import { Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { submitReservation, setType } from '../../store/actions/reservationsActions';

moment.locale('fi');

export class ReservationForm extends React.Component {
    formatTimes(time) {
        if (time != "")
            return (moment(time).format('lll'));
        else
            return "";
    }

    render() {
        return (
            <Panel header={<h3>Tee varaus</h3>}>
                <form onSubmit={(event) => this.props.dispatch(submitReservation(event, this.props.start, this.props.end, this.props.plane, this.props.reservation_type))}>
                    <FormGroup controlId="1">
                        <ControlLabel>Lennon alku</ControlLabel>
                        <FormControl disabled type="text" value={this.formatTimes(this.props.start)} />
                    </FormGroup>
                    <FormGroup controlId="2">
                        <ControlLabel>Lennon loppu</ControlLabel>
                        <FormControl disabled type="text" value={this.formatTimes(this.props.end)} />
                    </FormGroup>
                    <FormGroup id="selectPlane" controlId="selectPlane">
                        <ControlLabel>Lentokone</ControlLabel>
                        <FormControl disabled componentClass="select" value={this.props.plane}>
                            <option value={1}>Kone 1</option>
                            <option value={2}>Kone 2</option>
                            <option value={3}>Kone 3</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup id="selectType" controlId="selectType">
                        <ControlLabel>Lennon tyyppi</ControlLabel>
                        <FormControl componentClass="select" value={this.props.reservation_type} onChange={(event) => this.props.dispatch(setType(event))}>
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

export default connect((store) => {
    return {
        start: store.reservations.start,
        end: store.reservations.end,
        plane: store.reservations.plane,
        reservation_type: store.reservations.reservation_type,
    }
})(ReservationForm)