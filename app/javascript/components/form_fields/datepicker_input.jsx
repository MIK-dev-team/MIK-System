/**
 * Created by owlaukka on 15/08/17.
 */
import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

const months = ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu',
        'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],
    days = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];

export default class DatePickerInput extends React.Component {
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
                <DatePicker
                    {...input}
                    value={input.value}
                    onChange={input.onChange}
                    dateFormat={'DD.MM.YYYY'}
                    showClearButton={false}
                    dayLabels={days}
                    monthLabels={months}
                    weekStartsOn={1} />
                { feedbackIcon ? <FormControl.Feedback>{ feedbackIcon }</FormControl.Feedback> :null }
                { message }
            </FormGroup>
        )
    }
};;