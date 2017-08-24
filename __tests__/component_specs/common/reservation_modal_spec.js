import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import moment from "moment";

moment.locale('fi')

import * as actions from '../../../app/javascript/store/actions/singleReservationActions';
import { ReservationModal } from "../../../app/javascript/components/common/reservation_modal";
/**
 * Created by owlaukka on 17/06/17.
 */

let modal;
describe('ReservationModal', () => {
    beforeAll(() => {
        modal = shallow(<ReservationModal reservation={null} showModal={false} />);
    });

    it('has correct static elements when reservation is null', () => {
        expect(modal.find('Modal').length).toEqual(1);
        expect(modal.find('Button').length).toEqual(2);
        expect(modal.find('div').length).toEqual(1);
        expect(modal.find('h4').length).toEqual(0);
        expect(modal.find('p').length).toEqual(0);
    });

    it('has Modal with prop show as false', () => {
        expect(modal.find('Modal').props().show).toBe(false)
    });

    describe('calls correct function', () => {
        let dispatchSpy, functionSpy;
        beforeAll(() => {
            dispatchSpy = sinon.spy();
            modal.setProps({dispatch: dispatchSpy});
        });

        afterEach(() => {
            functionSpy.restore();
            dispatchSpy.reset();
        });

        it('hideModal and dispatch when hiding the modal', () => {
            functionSpy = sinon.spy(actions, 'hideModal');

            modal.find('Modal').simulate('hide');
            expect(functionSpy.calledOnce).toBe(true);
            expect(dispatchSpy.calledOnce).toBe(true);
        });

        it('this.goToEditPage when clicking edit button', () => {
            functionSpy = sinon.stub(modal.instance(), 'goToEditPage');

            modal.find('Button').first().simulate('click');
            expect(functionSpy.calledOnce).toBe(true);
            expect(dispatchSpy.notCalled).toBe(true);
        });

        it('hideModal and dispatch when clicking button to hide modal', () => {
            functionSpy = sinon.stub(actions, 'hideModal');

            modal.find('Button').last().simulate('click');
            expect(functionSpy.calledOnce).toBe(true);
            expect(dispatchSpy.calledOnce).toBe(true);
        });
    });

    describe('with reservation not null', () => {
        const reservation = {
            start: "2017-05-05T12:12:12Z",
            end: "2017-05-05T15:12:12Z",
            reservation_type: 'opetus',
            additional_info: 'Some additional info'
        };

        beforeAll(() => {
            modal.setProps({reservation: reservation});
            modal.update();
        });

        it('has no div', () => {
            expect(modal.find('div').length).toEqual(0);
        });

        it('has correct elements', () => {
            expect(modal.find('h4').length).toEqual(4);
            expect(modal.find('p').length).toEqual(4);
        });

        it('has correct headers', () => {
            expect(modal.find('h4').first().text()).toEqual('Varauksen tyyppi');
            expect(modal.find('h4').at(1).text()).toEqual('Alkuaika');
            expect(modal.find('h4').at(2).text()).toEqual('Loppuaika');
            expect(modal.find('h4').last().text()).toEqual('Lisätiedot');
        });

        it('displays reservation info correctly', () => {
            expect(modal.find('p').first().text()).toEqual(reservation.reservation_type);
            expect(modal.find('p').at(1).text()).toEqual("5. toukokuuta 2017, klo 12.12");
            expect(modal.find('p').at(2).text()).toEqual("5. toukokuuta 2017, klo 15.12");
            expect(modal.find('p').last().text()).toEqual(reservation.additional_info);
        });
    });

    // describe('with successMsg existing', () => {
    //     beforeAll(() => {
    //         modal.setProps({success: { header: 'Some success header!', text: 'Some success text'}});
    //         modal.update();
    //     });
    //
    //     afterAll(() => {
    //         modal.setProps({success: undefined});
    //         modal.update();
    //     });
    //
    //     it('has correct elements', () => {
    //         expect(modal.find('div').length).toEqual(0);
    //         expect(modal.find('Alert').length).toEqual(1);
    //         expect(modal.find('h4').length).toEqual(1);
    //         expect(modal.find('p').length).toEqual(2);
    //         expect(modal.find('Button').length).toEqual(1);
    //     });
    //
    //     it('has Alert element with correct style', () => {
    //         expect(modal.find('Alert').props().bsStyle).toEqual('success');
    //     });
    //
    //     it('has h4 element that displays correct text', () => {
    //         expect(modal.find('h4').text()).toEqual('Some success header!');
    //     });
    //
    //     it('has p element that displays correct text', () => {
    //         expect(modal.find('p').first().text()).toEqual('Some success text');
    //     });
    //
    //     it('has onDismiss prop that dispatches correct action when pressed', () => {
    //         const dispatchSpy = sinon.spy(),
    //             resetStub = sinon.stub(notificationsActions, 'resetNotifications');
    //         modal.setProps({dispatch: dispatchSpy});
    //         modal.update();
    //
    //         expect(dispatchSpy.notCalled).toBe(true);
    //         expect(resetStub.notCalled).toBe(true);
    //         modal.find('Alert').simulate('dismiss');
    //         expect(dispatchSpy.calledOnce).toBe(true);
    //         expect(resetStub.calledOnce).toBe(true);
    //         resetStub.restore();
    //     });
    // });
    //
    // describe('with infoMsg existing', () => {
    //     beforeAll(() => {
    //         modal.setProps({info: { header: 'Some info header!', text: 'Some success text'}});
    //         modal.update();
    //     });
    //
    //     afterAll(() => {
    //         modal.setProps({info: undefined});
    //         modal.update();
    //     });
    //
    //     it('has correct elements', () => {
    //         expect(modal.find('div').length).toEqual(0);
    //         expect(modal.find('Alert').length).toEqual(1);
    //         expect(modal.find('h4').length).toEqual(1);
    //         expect(modal.find('p').length).toEqual(1);
    //         expect(modal.find('Button').length).toEqual(1);
    //     });
    //
    //     it('has Alert element with correct style', () => {
    //         expect(modal.find('Alert').props().bsStyle).toEqual('info');
    //     });
    //
    //     it('has h4 element that displays correct text', () => {
    //         expect(modal.find('h4').text()).toEqual('Some info header!');
    //     });
    //
    //     it('has onDismiss prop that dispatches correct action when pressed', () => {
    //         const dispatchSpy = sinon.spy(),
    //             resetStub = sinon.stub(notificationsActions, 'resetNotifications');
    //         modal.setProps({dispatch: dispatchSpy});
    //         modal.update();
    //
    //         expect(dispatchSpy.notCalled).toBe(true);
    //         expect(resetStub.notCalled).toBe(true);
    //         modal.find('Alert').simulate('dismiss');
    //         expect(dispatchSpy.calledOnce).toBe(true);
    //         expect(resetStub.calledOnce).toBe(true);
    //         resetStub.restore();
    //     });
    // });
    //
    // describe('with errorMsg existing', () => {
    //     beforeAll(() => {
    //         modal.setProps({error: { header: 'Some error header!', data: ['some', 'kinda', 'error', 'list']}});
    //         modal.update();
    //     });
    //
    //     afterAll(() => {
    //         modal.setProps({error: undefined});
    //         modal.update();
    //     });
    //
    //     it('has correct elements', () => {
    //         expect(modal.find('div').length).toEqual(0);
    //         expect(modal.find('Alert').length).toEqual(1);
    //         expect(modal.find('h4').length).toEqual(1);
    //         expect(modal.find('p').length).toEqual(5);
    //         expect(modal.find('Button').length).toEqual(1);
    //     });
    //
    //     it('has Alert element with correct style', () => {
    //         expect(modal.find('Alert').props().bsStyle).toEqual('danger');
    //     });
    //
    //     it('has h4 element that displays correct text', () => {
    //         expect(modal.find('h4').text()).toEqual('Some error header!');
    //     });
    //
    //     it('has correct error text on p elements', () => {
    //         expect(modal.find('p').first().text()).toEqual('some');
    //         expect(modal.find('p').at(1).text()).toEqual('kinda');
    //         expect(modal.find('p').at(2).text()).toEqual('error');
    //         expect(modal.find('p').at(3).text()).toEqual('list');
    //     });
    //
    //     it('has a Button element with correct text', () => {
    //         expect(modal.find('Button').props().children).toEqual('Piilota');
    //     });
    //
    //     it('has onDismiss prop that dispatches correct action when pressed', () => {
    //         const dispatchSpy = sinon.spy(),
    //             resetStub = sinon.stub(notificationsActions, 'resetNotifications');
    //         modal.setProps({dispatch: dispatchSpy});
    //         modal.update();
    //
    //         expect(dispatchSpy.notCalled).toBe(true);
    //         expect(resetStub.notCalled).toBe(true);
    //         modal.find('Alert').simulate('dismiss');
    //         expect(dispatchSpy.calledOnce).toBe(true);
    //         expect(resetStub.calledOnce).toBe(true);
    //         resetStub.restore();
    //     });
    //
    //     it('has Button that dispatches correct action when pressed', () => {
    //         const dispatchSpy = sinon.spy(),
    //             resetStub = sinon.stub(notificationsActions, 'resetNotifications');
    //         modal.setProps({dispatch: dispatchSpy});
    //         modal.update();
    //
    //         expect(dispatchSpy.notCalled).toBe(true);
    //         expect(resetStub.notCalled).toBe(true);
    //         modal.find('Button').simulate('click');
    //         expect(dispatchSpy.calledOnce).toBe(true);
    //         expect(resetStub.calledOnce).toBe(true);
    //         resetStub.restore();
    //     });
    // });
});