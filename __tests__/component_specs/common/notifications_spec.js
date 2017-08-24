import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import moment from "moment";

import * as notificationsActions from '../../../app/javascript/store/actions/notificationsActions';
import { Notifications } from "../../../app/javascript/components/common/notifications";
/**
 * Created by owlaukka on 17/06/17.
 */

let notifications;
describe('Notifications', () => {
    beforeAll(() => {
        notifications = shallow(<Notifications />);
    });

    it('shows nothing when no notification exists', () => {
        expect(notifications.find('div').length).toEqual(1);
        expect(notifications.find('Alert').length).toEqual(0);
        expect(notifications.find('h4').length).toEqual(0);
        expect(notifications.find('p').length).toEqual(0);
        expect(notifications.find('Button').length).toEqual(0);
    });

    describe('with successMsg existing', () => {
        beforeAll(() => {
            notifications.setProps({success: { header: 'Some success header!', text: 'Some success text'}});
            notifications.update();
        });

        afterAll(() => {
            notifications.setProps({success: undefined});
            notifications.update();
        });

        it('has correct elements', () => {
            expect(notifications.find('div').length).toEqual(0);
            expect(notifications.find('Alert').length).toEqual(1);
            expect(notifications.find('h4').length).toEqual(1);
            expect(notifications.find('p').length).toEqual(2);
            expect(notifications.find('Button').length).toEqual(1);
        });

        it('has Alert element with correct style', () => {
            expect(notifications.find('Alert').props().bsStyle).toEqual('success');
        });

        it('has h4 element that displays correct text', () => {
            expect(notifications.find('h4').text()).toEqual('Some success header!');
        });

        it('has p element that displays correct text', () => {
            expect(notifications.find('p').first().text()).toEqual('Some success text');
        });

        it('has onDismiss prop that dispatches correct action when pressed', () => {
            const dispatchSpy = sinon.spy(),
                resetStub = sinon.stub(notificationsActions, 'resetNotifications');
            notifications.setProps({dispatch: dispatchSpy});
            notifications.update();

            expect(dispatchSpy.notCalled).toBe(true);
            expect(resetStub.notCalled).toBe(true);
            notifications.find('Alert').simulate('dismiss');
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(resetStub.calledOnce).toBe(true);
            resetStub.restore();
        });

        it('dispatches correct actions when pressing hiding button', () => {
            const dispatchSpy = sinon.spy(),
                resetStub = sinon.stub(notificationsActions, 'resetNotifications');
            notifications.setProps({dispatch: dispatchSpy});
            notifications.update();

            expect(dispatchSpy.notCalled).toBe(true);
            expect(resetStub.notCalled).toBe(true);
            notifications.find('Button').simulate('click');
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(resetStub.calledOnce).toBe(true);
            resetStub.restore();
        });
    });

    describe('with infoMsg existing', () => {
        beforeAll(() => {
            notifications.setProps({info: { header: 'Some info header!', text: 'Some success text'}});
            notifications.update();
        });

        afterAll(() => {
            notifications.setProps({info: undefined});
            notifications.update();
        });

        it('has correct elements', () => {
            expect(notifications.find('div').length).toEqual(0);
            expect(notifications.find('Alert').length).toEqual(1);
            expect(notifications.find('h4').length).toEqual(1);
            expect(notifications.find('p').length).toEqual(1);
            expect(notifications.find('Button').length).toEqual(1);
        });

        it('has Alert element with correct style', () => {
            expect(notifications.find('Alert').props().bsStyle).toEqual('info');
        });

        it('has h4 element that displays correct text', () => {
            expect(notifications.find('h4').text()).toEqual('Some info header!');
        });

        it('has onDismiss prop that dispatches correct action when pressed', () => {
            const dispatchSpy = sinon.spy(),
                resetStub = sinon.stub(notificationsActions, 'resetNotifications');
            notifications.setProps({dispatch: dispatchSpy});
            notifications.update();

            expect(dispatchSpy.notCalled).toBe(true);
            expect(resetStub.notCalled).toBe(true);
            notifications.find('Alert').simulate('dismiss');
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(resetStub.calledOnce).toBe(true);
            resetStub.restore();
        });

        it('dispatches correct actions when pressing hiding button', () => {
            const dispatchSpy = sinon.spy(),
                resetStub = sinon.stub(notificationsActions, 'resetNotifications');
            notifications.setProps({dispatch: dispatchSpy});
            notifications.update();

            expect(dispatchSpy.notCalled).toBe(true);
            expect(resetStub.notCalled).toBe(true);
            notifications.find('Button').simulate('click');
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(resetStub.calledOnce).toBe(true);
            resetStub.restore();
        });
    });

    describe('with errorMsg existing', () => {
        beforeAll(() => {
            notifications.setProps({error: { header: 'Some error header!', data: ['some', 'kinda', 'error', 'list']}});
            notifications.update();
        });

        afterAll(() => {
            notifications.setProps({error: undefined});
            notifications.update();
        });

        it('has correct elements', () => {
            expect(notifications.find('div').length).toEqual(0);
            expect(notifications.find('Alert').length).toEqual(1);
            expect(notifications.find('h4').length).toEqual(1);
            expect(notifications.find('p').length).toEqual(5);
            expect(notifications.find('Button').length).toEqual(1);
        });

        it('has Alert element with correct style', () => {
            expect(notifications.find('Alert').props().bsStyle).toEqual('danger');
        });

        it('has h4 element that displays correct text', () => {
            expect(notifications.find('h4').text()).toEqual('Some error header!');
        });

        it('has correct error text on p elements', () => {
            expect(notifications.find('p').first().text()).toEqual('some');
            expect(notifications.find('p').at(1).text()).toEqual('kinda');
            expect(notifications.find('p').at(2).text()).toEqual('error');
            expect(notifications.find('p').at(3).text()).toEqual('list');
        });

        it('has a Button element with correct text', () => {
            expect(notifications.find('Button').props().children).toEqual('Piilota');
        });

        it('has onDismiss prop that dispatches correct action when pressed', () => {
            const dispatchSpy = sinon.spy(),
                resetStub = sinon.stub(notificationsActions, 'resetNotifications');
            notifications.setProps({dispatch: dispatchSpy});
            notifications.update();

            expect(dispatchSpy.notCalled).toBe(true);
            expect(resetStub.notCalled).toBe(true);
            notifications.find('Alert').simulate('dismiss');
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(resetStub.calledOnce).toBe(true);
            resetStub.restore();
        });

        it('has Button that dispatches correct action when pressed', () => {
            const dispatchSpy = sinon.spy(),
                resetStub = sinon.stub(notificationsActions, 'resetNotifications');
            notifications.setProps({dispatch: dispatchSpy});
            notifications.update();

            expect(dispatchSpy.notCalled).toBe(true);
            expect(resetStub.notCalled).toBe(true);
            notifications.find('Button').simulate('click');
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(resetStub.calledOnce).toBe(true);
            resetStub.restore();
        });
    });
});