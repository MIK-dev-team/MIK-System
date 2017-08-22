import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TimePickerInput from '../../../app/javascript/components/form_fields/timepicker_input';

describe('TimePickerInput', () => {
    let timepicker, changeSpy = sinon.spy();

    beforeEach(() => {
        const initialProps = {
            feedbackIcon: undefined,
            input: { value: '2017-05-05T12:12:12Z', onChange: changeSpy },
            label: 'Basic B... label',
            meta: { error: null, warning: null, touched: null },
        };
        timepicker = shallow(<TimePickerInput {...initialProps}/>);
    });

    afterEach(() => {
        timepicker.setProps({ meta: { error: null, warning: null, touched: null } });
        timepicker.update();
    });

    it('has correct static elements', () => {
        expect(timepicker.find('FormGroup').length).toEqual(1);
        expect(timepicker.find('ControlLabel').length).toEqual(1);
        expect(timepicker.find('#edit-form-timepicker').length).toEqual(1);
        expect(timepicker.find('span').length).toEqual(0);
    });

    it('has correct validation state initially', () => {
        expect(timepicker.find('FormGroup').props().validationState).toEqual(null)
    });

    it('has correct label displayed', () => {
        expect(timepicker.find('ControlLabel').props().children).toEqual('Basic B... label');
    });

    it('has correct props for TimePicker', () => {
        expect(timepicker.find('#edit-form-timepicker').props().onChange).toBe(changeSpy);
        expect(timepicker.find('#edit-form-timepicker').props().value).toEqual('12:12');
        expect(timepicker.find('#edit-form-timepicker').props().format).toEqual(24);
    });

    it('shows feedbackIcon when given', () => {
        timepicker.setProps({feedbackIcon: 'Feebdack icon'});
        timepicker.update();
        expect(timepicker.find("FormControlFeedback").props().children).toEqual('Feebdack icon');
    });

    it('has validationState error on FormControl when given', () => {
        timepicker.setProps({ meta: { error: true, warning: null, touched: true }});
        timepicker.update();
        expect(timepicker.find('FormGroup').props().validationState).toEqual('error')
    });

    it('has validationState warning on FormControl when given', () => {
        timepicker.setProps({ meta: { error: null, warning: true, touched: true }});
        timepicker.update();
        expect(timepicker.find('FormGroup').props().validationState).toEqual('warning')
    });

    it('show message when error is given', () => {
        expect(timepicker.find('span').length).toEqual(0);
        timepicker.setProps({ meta: { error: 'Something here', warning: null, touched: true }});
        timepicker.update();
        expect(timepicker.find('span').length).toEqual(1);
        expect(timepicker.find('span').text()).toEqual('Something here');
    });

    it('show message when warning is given', () => {
        expect(timepicker.find('span').length).toEqual(0);
        timepicker.setProps({ meta: { error: null, warning: 'warning msg here', touched: true }});
        timepicker.update();
        expect(timepicker.find('span').length).toEqual(1);
        expect(timepicker.find('span').text()).toEqual('warning msg here');
    });

    it('show error message when both error and warning are given', () => {
        expect(timepicker.find('span').length).toEqual(0);
        timepicker.setProps({ meta: { error: 'ERROR msg here', warning: 'warning msg here', touched: true }});
        timepicker.update();
        expect(timepicker.find('span').length).toEqual(1);
        expect(timepicker.find('span').text()).toEqual('ERROR msg here');
    });
});