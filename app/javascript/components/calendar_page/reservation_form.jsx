import React from 'react';
import moment from 'moment'
import DatePicker from 'react-bootstrap-date-picker';
import TimePicker from 'react-bootstrap-time-picker';
import { Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { submitReservation, setType, setReservationStart, setReservationEnd, changeStartTime, changeEndTime } from '../../store/actions/reservationsActions';
import { selectPlane } from "../../store/actions/planesActions";

moment.locale('fi');
const months = ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu',
        'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],
    days = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];

let description;
export class ReservationForm extends React.Component {
    constructor() {
        super();
        this.handlePlaneChange = this.handlePlaneChange.bind(this)
    }

    formatTime(time) {
        if (time !== undefined && time !== "")
            return moment(time).format('HH:mm');
        else
            return undefined;
    }

    handlePlaneChange(e) {
        for (let plane of this.props.planes) {
            if (plane.id === parseInt(e.target.value)) {
                this.props.dispatch(selectPlane(plane));
                return;
            }
        }
        if (e.target.value === 'null') {
            this.props.dispatch(selectPlane(undefined))
        }
    }

    createPlaneSelect() {
        return (
            <FormControl componentClass="select"
                         value={this.props.selectedPlane !== undefined ? this.props.selectedPlane.id : 'null'}
                         onChange={this.handlePlaneChange}
            >
                <option value='null'>*** Valitse kone ***</option>
                {this.mapPlanesToOptions()}
            </FormControl>
        )
    }

    mapPlanesToOptions() {
        return this.props.planes.map((plane) =>
            <option key={plane.id} value={plane.id}>{plane.name}</option>
        )
    }

    normalizeDatePickerInput(value) {
        if (value === "") {
            return ""
        }
        const timeInSeconds = moment.duration(moment(this.props.start).format('HH:mm')).asSeconds();
        return moment(value).startOf('day').add(timeInSeconds, 'seconds').format();
    }

    normalizeDatePickerOutput(value, part) {
        if (value === "") {
            return ""
        }
        const timeInSeconds = moment.duration(moment(this.props.start).format('HH:mm')).asSeconds();
        const newValue = moment(value).startOf('day').add(timeInSeconds, 'seconds').format();

        if (part === 'start') {
            this.props.dispatch(setReservationStart(newValue, this.props.reservations))
        } else if (part === 'end') {
            this.props.dispatch(setReservationEnd(newValue, this.props.reservations))
        }
    }

    render() {
        return (
            <Panel header={<h3>Tee varaus</h3>}>
                <form onSubmit={(event) => this.props.dispatch(submitReservation(event, this.props.start, this.props.end, this.props.selectedPlane, this.props.reservation_type, description))}>
                    <FormGroup controlId="1">
                        <ControlLabel>Lennon alkupäivä</ControlLabel>
                        <DatePicker
                            id="startDate"
                            value={this.normalizeDatePickerInput(this.props.start)}
                            onChange={(date) => this.normalizeDatePickerOutput(date, 'start')}
                            dateFormat={'DD.MM.YYYY'}
                            showClearButton={false}
                            dayLabels={days}
                            monthLabels={months}
                            weekStartsOn={1}
                            placeholder="Aloituspäivämäärä" />
                    </FormGroup>
                    <FormGroup controlId="startTime">
                        <ControlLabel>Lennon alkuaika</ControlLabel>
                        <TimePicker
                            id="startTime"
                            value={this.formatTime(this.props.start)}
                            onChange={(time) => this.props.dispatch(changeStartTime(time, this.props.start, this.props.reservations))}
                            format={24}
                        />
                    </FormGroup>
                    <FormGroup controlId="2">
                        <ControlLabel>Lennon loppupäivä</ControlLabel>
                        <DatePicker
                            id="endDate"
                            value={this.normalizeDatePickerInput(this.props.end)}
                            onChange={(date) => this.normalizeDatePickerOutput(date, 'end')}
                            dateFormat={'DD.MM.YYYY'}
                            showClearButton={false}
                            dayLabels={days}
                            monthLabels={months}
                            weekStartsOn={1}
                            placeholder="Lopetuspäivämäärä" />
                    </FormGroup>
                    <FormGroup controlId="endTime">
                        <ControlLabel>Lennon loppuaika</ControlLabel>
                        <TimePicker
                            id="endTime"
                            value={this.formatTime(this.props.end)}
                            onChange={(time) => this.props.dispatch(changeEndTime(time, this.props.end, this.props.reservations))}
                            format={24}
                        />
                    </FormGroup>
                    <FormGroup id="selectPlane" controlId="selectPlane">
                        <ControlLabel>Lentokone</ControlLabel>
                        {this.createPlaneSelect()}
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
        reservations: store.reservations.reservations,
    }
})(ReservationForm)
