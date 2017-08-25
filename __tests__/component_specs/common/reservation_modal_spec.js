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


describe('ReservationModal', () => {
    let modal;
    const reservation = {
        start: "2017-05-05T12:12:12Z",
        end: "2017-05-05T15:12:12Z",
        reservation_type: 'opetus',
        additional_info: 'Some additional info',
        user_id: 1,
    };

    beforeAll(() => {
        modal = shallow(<ReservationModal reservation={null} showModal={false} />);
    });

    it('has correct static elements when reservation is null', () => {
        expect(modal.find('Modal').length).toEqual(1);
        expect(modal.find('Button').length).toEqual(1);
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
            modal.setProps({dispatch: dispatchSpy, reservation: reservation, user_id: 1});
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

    describe('with reservation not null and user logged looking at their own reservation', () => {

        beforeAll(() => {
            modal.setProps({reservation: reservation, user_id: 1});
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

        it('displays two Buttons', () => {
            expect(modal.find('Button').length).toEqual(2);
        });
    });
});