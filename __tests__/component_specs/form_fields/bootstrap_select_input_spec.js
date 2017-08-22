import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import SelectInput from '../../../app/javascript/components/form_fields/bootstrap_select_input';

describe('Bootstrap select input', () => {
    let selectInput, changeSpy = sinon.spy();

    beforeEach(() => {
        const initialProps = {
            feedbackIcon: undefined,
            input: { onChange: changeSpy },
            label: 'Basic B... label',
            options: ['first', 'second'],
            meta: { error: null, warning: null, touched: null },
            something: 'else',
        };
        selectInput = shallow(<SelectInput {...initialProps}/>);
    });

    afterEach(() => {
        selectInput.setProps({meta: { error: null, warning: null, touched: null }});
        selectInput.update();
    });

    it('has correct static elements', () => {
        expect(selectInput.find('FormGroup').length).toEqual(1);
        expect(selectInput.find('ControlLabel').length).toEqual(1);
        expect(selectInput.find('FormControl').length).toEqual(1);
    });

    it('has correct validation state initially', () => {
        expect(selectInput.find('FormGroup').props().validationState).toEqual(null)
    });

    it('has correct label displayed', () => {
        expect(selectInput.find('ControlLabel').props().children).toEqual('Basic B... label');
    });

    it('has correct onChange function as prop for FormControl', () => {
        expect(selectInput.find('FormControl').props().onChange).toBe(changeSpy);
        expect(selectInput.find('FormControl').props().componentClass).toEqual('select');
        expect(selectInput.find('FormControl').props().something).toEqual('else');
    });

    it('has correct options rendered', () => {
       expect(selectInput.find('option').length).toEqual(2);
       expect(selectInput.find('option').first().text()).toEqual('first');
       expect(selectInput.find('option').last().text()).toEqual('second');
    });

    it('shows feedbackIcon when given', () => {
        selectInput.setProps({feedbackIcon: 'Feebdack icon'});
        selectInput.update();
        expect(selectInput.find("FormControlFeedback").props().children).toEqual('Feebdack icon');
    });

    it('has validationState error on FormControl when given', () => {
        selectInput.setProps({ meta: { error: true, warning: null, touched: true }});
        selectInput.update();
        expect(selectInput.find('FormGroup').props().validationState).toEqual('error')
    });

    it('has validationState warning on FormControl when given', () => {
        selectInput.setProps({ meta: { error: null, warning: true, touched: true }});
        selectInput.update();
        expect(selectInput.find('FormGroup').props().validationState).toEqual('warning')
    });

    it('show message when error is given', () => {
        expect(selectInput.find('span').length).toEqual(0);
        selectInput.setProps({ meta: { error: 'Something here', warning: null, touched: true }});
        selectInput.update();
        expect(selectInput.find('span').length).toEqual(1);
        expect(selectInput.find('span').text()).toEqual('Something here');
    });

    it('show message when warning is given', () => {
        expect(selectInput.find('span').length).toEqual(0);
        selectInput.setProps({ meta: { error: null, warning: 'warning msg here', touched: true }});
        selectInput.update();
        expect(selectInput.find('span').length).toEqual(1);
        expect(selectInput.find('span').text()).toEqual('warning msg here');
    });

    it('show error message when both error and warning are given', () => {
        expect(selectInput.find('span').length).toEqual(0);
        selectInput.setProps({ meta: { error: 'ERROR msg here', warning: 'warning msg here', touched: true }});
        selectInput.update();
        expect(selectInput.find('span').length).toEqual(1);
        expect(selectInput.find('span').text()).toEqual('ERROR msg here');
    });
});