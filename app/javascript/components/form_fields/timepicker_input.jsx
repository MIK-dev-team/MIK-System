/**
 * Created by owlaukka on 15/08/17.
 */
import React from 'react';
import moment from 'moment';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

export default class TimePickerInput extends React.Component {
    render() {
        const {
            feedbackIcon,
            input,
            label,
            meta: { error, warning, touched },
            ...props
        } = this.props;

        let message;
        const validationState = touched && ( error && "error" ) || ( warning && "warning" ) || null;

        if (touched && ( error || warning )) {
            message = <span className="help-block">{ error || warning }</span>;
        }

        return (
            <FormGroup validationState={ validationState }>
                <ControlLabel>{ label }</ControlLabel>
                <TimePicker
                    id="edit-form-timepicker"
                    {...input}
                    value={moment(input.value).format('HH:mm') || undefined}
                    format={24} />
                { feedbackIcon ? <FormControl.Feedback>{ feedbackIcon }</FormControl.Feedback> :null }
                { message }
            </FormGroup>
        )
    }
};