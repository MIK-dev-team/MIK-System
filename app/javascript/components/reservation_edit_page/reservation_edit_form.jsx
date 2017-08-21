/**
 * Created by owlaukka on 14/08/17.
 */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button } from 'react-bootstrap'

import SelectInput from '../form_fields/bootstrap_select_input';
import ObjectSelectInput from '../form_fields/object_select_input';
import TimePickerInput from '../form_fields/timepicker_input';
import DatePickerInput from '../form_fields/datepicker_input';
import TextAreaInput from '../form_fields/textarea_input';
import ConfirmDeleteButton from './confirm_delete_button';

moment.locale('fi');

const validate = values => {
    const errors = {};
    if (moment(values.start).isBefore(moment())) {
        errors.start = 'Varauksen alku ei voi olla menneisyydessä';
    }
    if (moment(values.end).isSameOrBefore(moment(values.start))) {
        errors.end = 'Varauksen loppu ei voi olla ennen sen alkua'
    }

    return errors
};

const normalizeTimePicker = value => (value, previousValue) =>
    moment(previousValue).startOf('day').add(value, 'seconds').format();

const normalizeDatePicker = value => (value, previousValue) => {
    const timeInSeconds = moment.duration(moment(previousValue).format('HH:mm')).asSeconds();
    return moment(value).startOf('day').add(timeInSeconds, 'seconds').format();
};

export class ReservationEditForm extends React.Component {
    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Field label="Alkupäivämäärä" name="start" id="start-date"  component={DatePickerInput} normalize={normalizeDatePicker()} />
                <Field label="Alkuaika" name="start" component={TimePickerInput} normalize={normalizeTimePicker()} />
                <Field label="Loppupäivämäärä" name="end" id="end-date" component={DatePickerInput} normalize={normalizeDatePicker()} />
                <Field label="Loppuaika" name="end" component={TimePickerInput} normalize={normalizeTimePicker()} />
                <Field label="Lentokone" name="plane" options={this.props.planes} component={ObjectSelectInput} />
                <Field label="Tyyppi" name="reservation_type" options={["harraste", "opetus"]} component={SelectInput} />
                <Field label="Lisätiedot" name="additional_info" componentClass="textarea" component={TextAreaInput} />
                <Button type="submit">Tallenna varaus</Button>
                <span className="pull-right" ><ConfirmDeleteButton /></span>
            </form>
        )
    }
}

ReservationEditForm = reduxForm({
    form: 'ReservationEdit',
    validate
})(ReservationEditForm);

ReservationEditForm = connect((store) => {
    return {
        initialValues: store.singleReservation.reservation,
        planes: store.planes.planes,
    }
})(ReservationEditForm);

export default ReservationEditForm;