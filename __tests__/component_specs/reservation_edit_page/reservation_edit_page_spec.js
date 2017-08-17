import React from "react";
import { shallow } from "enzyme";
import sinon from 'sinon';

import { ReservationEditPage } from "../../../app/javascript/components/reservation_edit_page/reservation_edit_page";
import * as actions from '../../../app/javascript/store/actions/singleReservationActions';


describe('Reservation edit page initially', () => {
    let page;

    beforeAll(() => {
        page = shallow(<ReservationEditPage/>);
    });

    it('has correct static elements', () => {
        expect(page.find('Grid').length).toEqual(1);
        expect(page.find('Row').length).toEqual(2);
        expect(page.find('Col').length).toEqual(2);
    });

    it('has ReservationEditForm', () => {
        expect(page.find('#edit-form').length).toEqual(1);
    });

    it('has ReservationEditForm to which is passed a correct function inside dispatch', () => {
        const dispatchSpy = sinon.spy();
        const saveChangesToReservationStub = sinon.stub(actions, 'saveChangesToReservation');
        page.setProps({dispatch: dispatchSpy});
        page.update();

        page.find("#edit-form").simulate('submit');
        expect(dispatchSpy.calledOnce).toBe(true);
        expect(saveChangesToReservationStub.calledOnce).toBe(true);
    });
});