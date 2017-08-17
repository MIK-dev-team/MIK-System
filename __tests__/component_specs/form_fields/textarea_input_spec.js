import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TextAreaInput from '../../../app/javascript/components/form_fields/textarea_input';

describe('TextAreaInput', () => {
    let textAreaInput, changeSpy = sinon.spy();

    beforeEach(() => {
        const initialProps = {
            feedbackIcon: undefined,
            input: { value: "valui", onChange: changeSpy },
            label: 'Basic B... label',
            meta: { error: null, warning: null, touched: null },
            something: 'else',
        };
        textAreaInput = shallow(<TextAreaInput {...initialProps}/>);
    });

    afterEach(() => {
        textAreaInput.setProps({meta: { error: null, warning: null, touched: null }});
        textAreaInput.update();
    });

    it('has correct static elements', () => {
        expect(textAreaInput.find('FormGroup').length).toEqual(1);
        expect(textAreaInput.find('ControlLabel').length).toEqual(1);
        expect(textAreaInput.find('FormControl').length).toEqual(1);
        expect(textAreaInput.find('span').length).toEqual(0);
    });

    it('has correct validation state initially', () => {
        expect(textAreaInput.find('FormGroup').props().validationState).toEqual(null)
    });

    it('has correct label displayed', () => {
        expect(textAreaInput.find('ControlLabel').props().children).toEqual('Basic B... label');
    });

    it('has correct onChange function as prop for FormControl', () => {
        expect(textAreaInput.find('FormControl').props().onChange).toBe(changeSpy);
        expect(textAreaInput.find('FormControl').props().value).toEqual('valui');
        expect(textAreaInput.find('FormControl').props().something).toEqual('else');
    });

    it('shows feedbackIcon when given', () => {
        textAreaInput.setProps({feedbackIcon: 'Feebdack icon'});
        textAreaInput.update();
        expect(textAreaInput.find("FormControlFeedback").props().children).toEqual('Feebdack icon');
    });

    it('has validationState error on FormControl when given', () => {
        textAreaInput.setProps({ meta: { error: true, warning: null, touched: true }});
        textAreaInput.update();
        expect(textAreaInput.find('FormGroup').props().validationState).toEqual('error')
    });

    it('has validationState warning on FormControl when given', () => {
        textAreaInput.setProps({ meta: { error: null, warning: true, touched: true }});
        textAreaInput.update();
        expect(textAreaInput.find('FormGroup').props().validationState).toEqual('warning')
    });

    it('show message when error is given', () => {
        expect(textAreaInput.find('span').length).toEqual(0);
        textAreaInput.setProps({ meta: { error: 'Something here', warning: null, touched: true }});
        textAreaInput.update();
        expect(textAreaInput.find('span').length).toEqual(1);
        expect(textAreaInput.find('span').text()).toEqual('Something here');
    });

    it('show message when warning is given', () => {
        expect(textAreaInput.find('span').length).toEqual(0);
        textAreaInput.setProps({ meta: { error: null, warning: 'warning msg here', touched: true }});
        textAreaInput.update();
        expect(textAreaInput.find('span').length).toEqual(1);
        expect(textAreaInput.find('span').text()).toEqual('warning msg here');
    });

    it('show error message when both error and warning are given', () => {
        expect(textAreaInput.find('span').length).toEqual(0);
        textAreaInput.setProps({ meta: { error: 'ERROR msg here', warning: 'warning msg here', touched: true }});
        textAreaInput.update();
        expect(textAreaInput.find('span').length).toEqual(1);
        expect(textAreaInput.find('span').text()).toEqual('ERROR msg here');
    });
});