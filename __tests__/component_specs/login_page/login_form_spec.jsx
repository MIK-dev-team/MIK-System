import React from 'react';
import { shallow } from "enzyme";
import sinon from 'sinon';

import * as loginActions from '../../../app/javascript/store/actions/loginActions'
import { LoginForm } from "../../../app/javascript/components/login_page/login_form";

const initialProps = {
        isLoginSuccess: false,
        isLoginFailed: false,

        username: "",
        password: "",

        submitObject: {},
}

let form;
describe("Login form", () => {
    beforeEach(() => {
        form = shallow(<LoginForm {...initialProps}/>);
    });

    it("contains 1 form", () => {
        expect(form.find('form').length).toEqual(1);
    });

    it("contains correct amount of FormGroups", () => {
        expect(form.find('FormGroup').length).toEqual(2);
    });

    it("calls dispatch when form is submitted", () => {
        const spy = sinon.spy();
        form = shallow(<LoginForm
            {...initialProps}
            dispatch={spy}/>);
        expect(spy.calledOnce).toBe(false);
        form.find('form').simulate('submit', {preventDefault: () => {}});
        expect(spy.calledOnce).toBe(true);
    });

    it('calls dispatch when a field is changed', () => {
        const spy = sinon.spy();
        form = shallow(<LoginForm
            {...initialProps}
            dispatch={spy}/>);
        form.findWhere(n => n.prop('controlId') === 'username').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'password').find('FormControl').simulate('change', { target: {value: 'a'} });
        expect(spy.callCount).toEqual(2);
    });

    describe('calls correct function inside dispatch', () => {
        let actionStub;
        beforeEach(() => {
          form = shallow(<LoginForm
              {...initialProps}
              dispatch={sinon.spy()}/>);
        });

        afterEach(() => {
            actionStub.restore();
        });

        it('when changing username', () => {
            actionStub = sinon.stub(loginActions, 'handleUsernameValueChange');
            expect(actionStub.calledOnce).toBe(false)
            form.findWhere(n => n.prop('controlId') === 'username')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true)
        });

        it('when changing password', () => {
            actionStub = sinon.stub(loginActions, 'handlePasswordValueChange');
            expect(actionStub.calledOnce).toBe(false)
            form.findWhere(n => n.prop('controlId') === 'password')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true)
        });
    });
});
