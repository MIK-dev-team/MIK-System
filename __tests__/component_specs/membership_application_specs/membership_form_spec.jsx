/**
 * Created by owlaukka on 30/06/17.
 */
import React from 'react';
import { shallow } from "enzyme";
import sinon from 'sinon';

import * as applicationActions from '../../../app/javascript/store/actions/applicationActions'
import { MembershipForm } from "../../../app/javascript/components/membership_application/membership_form";

const initialProps = {
    membershipTypes: [
        {id: 1, name: 'Täysjäsen'},
        {id: 2, name: 'Nuorisojäsen (alle 18v)'},
        {id: 3, name: 'Kannatusjäsen'}
    ],
    applications: {
        membershipTypes: [
            {id: 1, name: 'Täysjäsen'},
            {id: 2, name: 'Nuorisojäsen (alle 18v)'},
            {id: 3, name: 'Kannatusjäsen'}
        ],
        sending: false,
        sent: false,
        submitError: null,
        successMsg: null,

        username: "",
        email: "",
        repeatEmail: "",
        birthday: "",
        member_type: "",
        full_name: "",
        address: "",
        phone: "",
        postal_code: "",
        city: "",

        submitObject: {}
    },
    submitObject: {},
};

let form;
describe("Membership form", () => {
    beforeEach(() => {
        form = shallow(<MembershipForm {...initialProps}/>);
    });

    it("contains 1 form", () => {
        expect(form.find('form').length).toEqual(1);
    });

    it("contains correct amount of FormGroups", () => {
        expect(form.find('FormGroup').length).toEqual(17);
    });

    it("contains correct amount of glyphicons that signal mandatory fields", () => {
        expect(form.find('Glyphicon').length).toEqual(9);
    })

    it("contains correct options for selecting member_type", () => {
        expect(form.find('option').first().text()).toEqual("** Valitse jäsenlaji **");
        expect(form.find('option').at(1).text()).toEqual("Täysjäsen");
        expect(form.find('option').at(2).text()).toEqual("Nuorisojäsen (alle 18v)");
        expect(form.find('option').at(3).text()).toEqual("Kannatusjäsen");
    });

    it("calls dispatch when form is submitted", () => {
        const spy = sinon.spy();
        form = shallow(<MembershipForm
            {...initialProps}
            dispatch={spy}/>);
        expect(spy.calledOnce).toBe(false);
        form.find('form').simulate('submit', {preventDefault: () => {}});
        expect(spy.calledOnce).toBe(true);
    });

    it("calls dispatch when changing membership type", () => {
        const spy = sinon.spy();
        form = shallow(<MembershipForm
            {...initialProps}
            dispatch={spy}/>);
        expect(spy.calledOnce).toBe(false);
        expect(form.find('FormGroup#memberType > InputGroup > FormControl').length).toEqual(1);
        form.find('FormGroup#memberType > InputGroup > FormControl').simulate('change', {target: {
            value: 3
        }});
        expect(spy.calledOnce).toBe(true);
    });

    it('has no validation state on mandatory fields initially', () => {
        expect(form.findWhere(n => n.prop('controlId') === 'username').props().validationState).toBe(null);
        expect(form.findWhere(n => n.prop('controlId') === 'email').props().validationState).toBe(null);
        expect(form.findWhere(n => n.prop('controlId') === 'repeatEmail').props().validationState).toBe(null);
        expect(form.findWhere(n => n.prop('controlId') === 'birthday').props().validationState).toBe(null);
        expect(form.findWhere(n => n.prop('controlId') === 'fullName').props().validationState).toBe(null);
        expect(form.findWhere(n => n.prop('controlId') === 'address').props().validationState).toBe(null);
        expect(form.findWhere(n => n.prop('controlId') === 'postalCode').props().validationState).toBe(null);
        expect(form.findWhere(n => n.prop('controlId') === 'city').props().validationState).toBe(null);
        expect(form.findWhere(n => n.prop('controlId') === 'phoneNumber').props().validationState).toBe(null);
    });

    it('has error validation state when mandatory fields are wrong', () => {
        const applicationProps = {
            ...initialProps.applications,
            username: "s",
            email: "s",
            repeatEmail: "d",
            birthday: "f",
            full_name: "3",
            address: "",
            phone: "s",
            postal_code: "s",
            city: "s1",
        };
        form = shallow(<MembershipForm
            {...initialProps}
            applications={applicationProps}/>);

        expect(form.findWhere(n => n.prop('controlId') === 'username').props().validationState).toBe('error');
        expect(form.findWhere(n => n.prop('controlId') === 'email').props().validationState).toBe('error');
        expect(form.findWhere(n => n.prop('controlId') === 'repeatEmail').props().validationState).toBe('error');
        expect(form.findWhere(n => n.prop('controlId') === 'birthday').props().validationState).toBe('error');
        expect(form.findWhere(n => n.prop('controlId') === 'fullName').props().validationState).toBe('error');
        expect(form.findWhere(n => n.prop('controlId') === 'address').props().validationState).toBe(null);
        expect(form.findWhere(n => n.prop('controlId') === 'postalCode').props().validationState).toBe('error');
        expect(form.findWhere(n => n.prop('controlId') === 'city').props().validationState).toBe('error');
        expect(form.findWhere(n => n.prop('controlId') === 'phoneNumber').props().validationState).toBe('error');
    });

    it('has success validation state when mandatory fields are correct', () => {
        const applicationProps = {
            ...initialProps.applications,
            username: "asfdasdf",
            email: "asdf@asdf.fi",
            repeatEmail: "asdf@asdf.fi",
            birthday: "12.12.12",
            full_name: "Some Name",
            address: "Coolstreet 45",
            phone: "0800123123",
            postal_code: "12345",
            city: "Yli-Ii",
        };
        form = shallow(<MembershipForm
            {...initialProps}
            applications={applicationProps}/>);

        expect(form.findWhere(n => n.prop('controlId') === 'username').props().validationState).toBe('success');
        expect(form.findWhere(n => n.prop('controlId') === 'email').props().validationState).toBe('success');
        expect(form.findWhere(n => n.prop('controlId') === 'repeatEmail').props().validationState).toBe('success');
        expect(form.findWhere(n => n.prop('controlId') === 'birthday').props().validationState).toBe('success');
        expect(form.findWhere(n => n.prop('controlId') === 'fullName').props().validationState).toBe('success');
        expect(form.findWhere(n => n.prop('controlId') === 'address').props().validationState).toBe('success');
        expect(form.findWhere(n => n.prop('controlId') === 'postalCode').props().validationState).toBe('success');
        expect(form.findWhere(n => n.prop('controlId') === 'city').props().validationState).toBe('success');
        expect(form.findWhere(n => n.prop('controlId') === 'phoneNumber').props().validationState).toBe('success');
    });

    it('calls dispatch when a field is changed', () => {
        const spy = sinon.spy();
        form = shallow(<MembershipForm
            {...initialProps}
            dispatch={spy}/>);
        form.findWhere(n => n.prop('controlId') === 'username').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'email').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'repeatEmail').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'memberType').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'birthday').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'fullName').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'address').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'postalCode').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'city').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'phoneNumber').find('FormControl').simulate('change', { target: {value: 'a'} });

        form.findWhere(n => n.prop('controlId') === 'licences').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'expWithEngine').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'otherExp').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'otherMemberships').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'silMembership').find('FormControl').simulate('change', { target: {value: 'willNot'} });
        form.findWhere(n => n.prop('controlId') === 'silNumber').find('FormControl').simulate('change', { target: {value: 'a'} });
        form.findWhere(n => n.prop('controlId') === 'additionalInfo').find('FormControl').simulate('change', { target: {value: 'a'} });
        expect(spy.callCount).toEqual(17);
    });

    it('sets success msg correctly when one exists', () => {
        expect(form.find('Alert').length).toEqual(0);
        form.setProps({successMsg: "Success!"});
        form.update();
        expect(form.find('Alert').length).toEqual(1);
        expect(form.find('Alert > p').text())
            .toContain('Vahvistussähköposti on lähetetty antamaanne sähköpostiosoitteeseen.');
        form.setProps({successMsg: null});
        form.update();
    });

    it('sets error msg correctly when one exists', () => {
        form.setProps({submitError: ['Some error']});
        form.update();
        expect(form.find('Alert').length).toEqual(1);
        expect(form.find('Alert > p').text())
            .toContain('Some error');
        form.setProps({submitError: null});
        form.update();
    });

    it('shows all error msgs correctly when there are several', () => {
        form.setProps({submitError: ['Some error', 'Another error']});
        form.update();
        expect(form.find('Alert').length).toEqual(1);
        expect(form.find('Alert > p').length).toEqual(2);
        expect(form.find('Alert > p').first().text()).toEqual('Some error');
        expect(form.find('Alert > p').at(1).text()).toEqual('Another error');
        form.setProps({submitError: null});
        form.update();
    });

    describe('calls correct function inside dispatch', () => {
        let actionStub;
        beforeEach(() => {
            form = shallow(<MembershipForm
                membershipTypes={initialProps.membershipTypes}
                applications={initialProps.applications}
                submitObject={initialProps.submitObject}
                dispatch={sinon.spy()}/>);
        });

        afterEach(() => {
            actionStub.restore();
        });

        it('when changing username', () => {
            actionStub = sinon.stub(applicationActions, 'setUsername');
            expect(actionStub.calledOnce).toBe(false)
            form.findWhere(n => n.prop('controlId') === 'username')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true)
        });

        it('when changing email', () => {
            actionStub = sinon.stub(applicationActions, 'setEmail');
            expect(actionStub.calledOnce).toBe(false)
            form.findWhere(n => n.prop('controlId') === 'email')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true)
        });

        it('when changing repeatEmail', () => {
            actionStub = sinon.stub(applicationActions, 'setRepeatEmail');
            expect(actionStub.calledOnce).toBe(false)
            form.findWhere(n => n.prop('controlId') === 'repeatEmail')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true)
        });

        it('when changing member_type', () => {
            actionStub = sinon.stub(applicationActions, 'setMemberType');
            expect(actionStub.calledOnce).toBe(false)
            form.findWhere(n => n.prop('controlId') === 'memberType')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true)
        });

        it('when changing birthday', () => {
            actionStub = sinon.stub(applicationActions, 'setBirthday');
            expect(actionStub.calledOnce).toBe(false)
            form.findWhere(n => n.prop('controlId') === 'birthday')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true)
        });

        it('when changing full name', () => {
            actionStub = sinon.stub(applicationActions, 'setFullName');
            expect(actionStub.calledOnce).toBe(false)
            form.findWhere(n => n.prop('controlId') === 'fullName')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true)
        });

        it('when changing address', () => {
            actionStub = sinon.stub(applicationActions, 'setAddress');
            expect(actionStub.calledOnce).toBe(false)
            form.findWhere(n => n.prop('controlId') === 'address')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true)
        });

        it('when changing postal code', () => {
            actionStub = sinon.stub(applicationActions, 'setPostalCode');
            expect(actionStub.calledOnce).toBe(false)
            form.findWhere(n => n.prop('controlId') === 'postalCode')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true)
        });

        it('when changing city', () => {
            actionStub = sinon.stub(applicationActions, 'setCity');
            expect(actionStub.calledOnce).toBe(false)
            form.findWhere(n => n.prop('controlId') === 'city')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true)
        });

        it('when changing phone', () => {
            actionStub = sinon.stub(applicationActions, 'setPhoneNumber');
            expect(actionStub.calledOnce).toBe(false);
            form.findWhere(n => n.prop('controlId') === 'phoneNumber')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true);
        });

        it('when changing licences', () => {
            actionStub = sinon.stub(applicationActions, 'setLicences');
            expect(actionStub.calledOnce).toBe(false);
            form.findWhere(n => n.prop('controlId') === 'licences')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true);
        });

        it('when changing exp with engine planes', () => {
            actionStub = sinon.stub(applicationActions, 'setEngineExp');
            expect(actionStub.calledOnce).toBe(false);
            form.findWhere(n => n.prop('controlId') === 'expWithEngine')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true);
        });

        it('when changing other exp', () => {
            actionStub = sinon.stub(applicationActions, 'setOtherExp');
            expect(actionStub.calledOnce).toBe(false);
            form.findWhere(n => n.prop('controlId') === 'otherExp')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true);
        });

        it('when changing other memberships', () => {
            actionStub = sinon.stub(applicationActions, 'setOtherMemberships');
            expect(actionStub.calledOnce).toBe(false);
            form.findWhere(n => n.prop('controlId') === 'otherMemberships')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true);
        });

        it('when changing SIL membership', () => {
            actionStub = sinon.stub(applicationActions, 'setSilMembership');
            expect(actionStub.calledOnce).toBe(false);
            form.findWhere(n => n.prop('controlId') === 'silMembership')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true);
        });

        it('when changing sil number', () => {
            actionStub = sinon.stub(applicationActions, 'setSilNumber');
            expect(actionStub.calledOnce).toBe(false);
            form.findWhere(n => n.prop('controlId') === 'silNumber')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true);
        });

        it('when changing additional info', () => {
            actionStub = sinon.stub(applicationActions, 'setAdditionalInfo');
            expect(actionStub.calledOnce).toBe(false);
            form.findWhere(n => n.prop('controlId') === 'additionalInfo')
                .find('FormControl')
                .simulate('change', { target: {value: 'a'} });
            expect(actionStub.calledOnce).toBe(true);
        });
    });
});