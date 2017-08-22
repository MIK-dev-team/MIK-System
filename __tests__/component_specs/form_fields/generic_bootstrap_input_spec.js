import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import GenericInput from '../../../app/javascript/components/form_fields/generic_bootstrap_input';

describe('GenericInput input', () => {
    let input, changeSpy = sinon.spy();

    beforeEach(() => {
        const initialProps = {
            feedbackIcon: undefined,
            input: { value: 'some value', onChange: changeSpy },
            label: 'Basic B... label',
            type: 'WEIRD',
            meta: { error: null, warning: null, touched: null },
            something: 'extra',
        };
        input = shallow(<GenericInput {...initialProps}/>);
    });

    afterEach(() => {
        input.setProps({ meta: { error: null, warning: null, touched: null } });
        input.update();
    });

    it('has correct static elements', () => {
        expect(input.find('FormGroup').length).toEqual(1);
        expect(input.find('ControlLabel').length).toEqual(1);
        expect(input.find('FormControl').length).toEqual(1);
        expect(input.find('span').length).toEqual(0);
    });

    it('has correct validation state initially', () => {
        expect(input.find('FormGroup').props().validationState).toEqual(null)
    });

    it('has correct label displayed', () => {
        expect(input.find('ControlLabel').props().children).toEqual('Basic B... label');
    });

    it('has correct props for DatePicker', () => {
        expect(input.find('FormControl').props().onChange).toBe(changeSpy);
        expect(input.find('FormControl').props().value).toEqual('some value');
        expect(input.find('FormControl').props().type).toEqual('WEIRD');
        expect(input.find('FormControl').props().something).toBe('extra');
    });

    it('shows feedbackIcon when given', () => {
        input.setProps({feedbackIcon: 'Feebdack icon'});
        input.update();
        expect(input.find("FormControlFeedback").props().children).toEqual('Feebdack icon');
    });

    it('has validationState error on FormControl when given', () => {
        input.setProps({ meta: { error: true, warning: null, touched: true }});
        input.update();
        expect(input.find('FormGroup').props().validationState).toEqual('error')
    });

    it('has validationState warning on FormControl when given', () => {
        input.setProps({ meta: { error: null, warning: true, touched: true }});
        input.update();
        expect(input.find('FormGroup').props().validationState).toEqual('warning')
    });

    it('show message when error is given', () => {
        expect(input.find('span').length).toEqual(0);
        input.setProps({ meta: { error: 'Something here', warning: null, touched: true }});
        input.update();
        expect(input.find('span').length).toEqual(1);
        expect(input.find('span').text()).toEqual('Something here');
    });

    it('show message when warning is given', () => {
        expect(input.find('span').length).toEqual(0);
        input.setProps({ meta: { error: null, warning: 'warning msg here', touched: true }});
        input.update();
        expect(input.find('span').length).toEqual(1);
        expect(input.find('span').text()).toEqual('warning msg here');
    });

    it('show error message when both error and warning are given', () => {
        expect(input.find('span').length).toEqual(0);
        input.setProps({ meta: { error: 'ERROR msg here', warning: 'warning msg here', touched: true }});
        input.update();
        expect(input.find('span').length).toEqual(1);
        expect(input.find('span').text()).toEqual('ERROR msg here');
    });
});