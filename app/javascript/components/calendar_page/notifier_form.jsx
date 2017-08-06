/**
 * Created by owlaukka on 30/07/17.
 */
import React from 'react';
import moment from 'moment'
import { FormControl, FormGroup, ControlLabel, Button, Form, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import { submitNotifier, setStart, setEnd, setNotifierType } from '../../store/actions/notifiersActions';

moment.locale('fi');

export class NotifierForm extends React.Component {
    formatTimes(time) {
        if (time != "")
            return (moment(time).format('lll'));
        else
            return "";
    }

    render() {
        return (
                <Form inline onSubmit={(event) => this.props.dispatch(submitNotifier(event, this.props.submitObject))}>
                    {' '}
                    <FormGroup controlId="start">
                        {' '}
                        <ControlLabel>Alku</ControlLabel>
                        {' '}
                        <FormControl
                            type="text"
                            value={this.formatTimes(this.props.start)}
                            onChange={(event) => this.props.dispatch(setStart(event.target.value))}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup controlId="end">
                        <ControlLabel>Loppu</ControlLabel>
                        {' '}
                        <FormControl
                            type="text"
                            value={this.formatTimes(this.props.end)}
                            onChange={(event) => this.props.dispatch(setEnd(event.target.value))}
                        />
                    </FormGroup>
                    {' '}
                    <FormGroup id="selectType" controlId="selectType">
                        {' '}
                        <ControlLabel>Tarkkailijatyyppi</ControlLabel>
                        {' '}
                        <HelpBlock>
                            Valitse haluatko, että teille ilmoitetaan kun kaikki varaukset valitulla <br />
                            aikavälillä on peruttu, vai kun jokin varaus valitulla aikavälillä on peruttu
                        </HelpBlock>
                        {' '}
                        <FormControl componentClass="select" value={this.props.notifierType} onChange={(event) => this.props.dispatch(setNotifierType(event.target.value))}>
                            <option value="all">Kaikki varaukset peruttu</option>
                            <option value="any">Mikä tahansa varaus peruttu</option>
                        </FormControl>
                        {' '}
                    </FormGroup>
                    {' '}
                    <Button type="submit">Luo tarkkailija</Button>
                    {' '}
                </Form>
        )
    }
}

export default connect((store) => {
    return {
        start: store.notifiers.start,
        end: store.notifiers.end,
        submitObject: store.notifiers.submitObject,
        notifierType: store.notifiers.notifier_type,
    }
})(NotifierForm)