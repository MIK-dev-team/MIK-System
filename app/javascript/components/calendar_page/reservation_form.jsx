import React from 'react';
import moment from 'moment'
import { Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { submitReservation, setType } from '../../store/actions/reservationsActions';

moment.locale('fi');

let description;
export class ReservationForm extends React.Component {
    formatTimes(time) {
        if (time != "")
            return (moment(time).format('lll'));
        else
            return "";
    }

    mapPlanesToOptions() {
        return (
            <FormControl disabled componentClass="select" value={this.props.selectedPlane !== undefined ? this.props.selectedPlane.id : 'null'}>
                <option value='null'>*** Valitse kone ***</option>
                {this.props.planes.map((plane) =>
                    <option key={plane.id} value={plane.id}>{plane.name}</option>
                )}
            </FormControl>
        )
    }

    render() {
        return (
            <Panel header={<h3>Tee varaus</h3>}>
                <form onSubmit={(event) => this.props.dispatch(submitReservation(event, this.props.start, this.props.end, this.props.selectedPlane, this.props.reservation_type, description))}>
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
                        {this.mapPlanesToOptions()}
                    </FormGroup>
                    <FormGroup id="selectType" controlId="selectType">
                        <ControlLabel>Lennon tyyppi</ControlLabel>
                        <FormControl componentClass="select" value={this.props.reservation_type} onChange={(event) => this.props.dispatch(setType(event))}>
                            <option value="opetus">Opetuslento</option>
                            <option value="harraste">Harrastelento</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="setDesc">
                        <ControlLabel>Lisätietoja</ControlLabel>
                        <FormControl componentClass="textarea" onChange={(event) => description = event.target.value} />
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
        reservation_type: store.reservations.reservation_type,
        selectedPlane: store.planes.selectedPlane,
        planes: store.planes.planes,
    }
})(ReservationForm)