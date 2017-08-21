import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import DatePickerInput from '../../../app/javascript/components/form_fields/datepicker_input';

const months = ['Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu', 'Kesäkuu',
        'Heinäkuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 'Marraskuu', 'Joulukuu'],
    days = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];

describe('DatePicker input', () => {
    let datepicker, changeSpy = sinon.spy();

    beforeEach(() => {
        const initialProps = {
            feedbackIcon: undefined,
            input: { value: 'some value', onChange: changeSpy },
            label: 'Basic B... label',
            meta: { error: null, warning: null, touched: null },
        };
        datepicker = shallow(<DatePickerInput {...initialProps}/>);
    });

    afterEach(() => {
        datepicker.setProps({ meta: { error: null, warning: null, touched: null } });
        datepicker.update();
    });

    it('has correct static elements', () => {
        expect(datepicker.find('FormGroup').length).toEqual(1);
        expect(datepicker.find('ControlLabel').length).toEqual(1);
        expect(datepicker.find('DatePicker').length).toEqual(1);
        expect(datepicker.find('span').length).toEqual(0);
    });

    it('has correct validation state initially', () => {
        expect(datepicker.find('FormGroup').props().validationState).toEqual(null)
    });

    it('has correct label displayed', () => {
        expect(datepicker.find('ControlLabel').props().children).toEqual('Basic B... label');
    });

    it('has correct props for DatePicker', () => {
        expect(datepicker.find('DatePicker').props().onChange).toBe(changeSpy);
        expect(datepicker.find('DatePicker').props().value).toEqual('some value');
        expect(datepicker.find('DatePicker').props().dateFormat).toEqual('DD.MM.YYYY');
        expect(datepicker.find('DatePicker').props().showClearButton).toBe(false);
        expect(datepicker.find('DatePicker').props().weekStartsOn).toEqual(1);
        expect(datepicker.find('DatePicker').props().dayLabels).toEqual(days);
        expect(datepicker.find('DatePicker').props().monthLabels).toEqual(months);
    });

    it('shows feedbackIcon when given', () => {
        datepicker.setProps({feedbackIcon: 'Feebdack icon'});
        datepicker.update();
        expect(datepicker.find("FormControlFeedback").props().children).toEqual('Feebdack icon');
    });

    it('has validationState error on FormControl when given', () => {
        datepicker.setProps({ meta: { error: true, warning: null, touched: true }});
        datepicker.update();
        expect(datepicker.find('FormGroup').props().validationState).toEqual('error')
    });

    it('has validationState warning on FormControl when given', () => {
        datepicker.setProps({ meta: { error: null, warning: true, touched: true }});
        datepicker.update();
        expect(datepicker.find('FormGroup').props().validationState).toEqual('warning')
    });

    it('show message when error is given', () => {
        expect(datepicker.find('span').length).toEqual(0);
        datepicker.setProps({ meta: { error: 'Something here', warning: null, touched: true }});
        datepicker.update();
        expect(datepicker.find('span').length).toEqual(1);
        expect(datepicker.find('span').text()).toEqual('Something here');
    });

    it('show message when warning is given', () => {
        expect(datepicker.find('span').length).toEqual(0);
        datepicker.setProps({ meta: { error: null, warning: 'warning msg here', touched: true }});
        datepicker.update();
        expect(datepicker.find('span').length).toEqual(1);
        expect(datepicker.find('span').text()).toEqual('warning msg here');
    });

    it('show error message when both error and warning are given', () => {
        expect(datepicker.find('span').length).toEqual(0);
        datepicker.setProps({ meta: { error: 'ERROR msg here', warning: 'warning msg here', touched: true }});
        datepicker.update();
        expect(datepicker.find('span').length).toEqual(1);
        expect(datepicker.find('span').text()).toEqual('ERROR msg here');
    });
});