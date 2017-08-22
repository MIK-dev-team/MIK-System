/**
 * Created by owlaukka on 15/08/17.
 */
import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class ObjectSelectInput extends React.Component {
    render() {
        const {
            feedbackIcon,
            input,
            label,
            options,
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
                <FormControl { ...input }
                             componentClass='select'
                             { ...props } >
                    {options.map((op) =>
                        <option key={op.id} value={op.id}>{op.name}</option>
                    )}
                </FormControl>
                { feedbackIcon ? <FormControl.Feedback>{ feedbackIcon }</FormControl.Feedback> :null }
                { message }
            </FormGroup>
        )
    }
}