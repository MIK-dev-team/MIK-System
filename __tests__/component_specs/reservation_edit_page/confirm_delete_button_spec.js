import React from "react";
import { shallow } from "enzyme";
import sinon from 'sinon';

import { ConfirmDeleteButton } from "../../../app/javascript/components/reservation_edit_page/confirm_delete_button";
import * as actions from '../../../app/javascript/store/actions/singleReservationActions';


describe('Confirm delete button', () => {
    let button;

    beforeAll(() => {
        button = shallow(<ConfirmDeleteButton reservation={{simulated: "reservation"}}/>);
    });

    it('has correct static elements', () => {
        expect(button.find('Confirm').length).toEqual(1);
        expect(button.find('Button').length).toEqual(1);
    });

    it('has Button with correct text and style', () => {
        expect(button.find('Button').props().bsStyle).toEqual('danger');
        expect(button.find('Button').props().children).toEqual('Poista varaus');
    })

    it('has Confirm component with correct props', () => {
        expect(button.find('Confirm').props().body).toEqual("Oletko varma, että haluat poistaa tämän varauksen?");
        expect(button.find('Confirm').props().confirmText).toEqual("Poista varaus");
        expect(button.find('Confirm').props().title).toEqual("Poista varaus");
        expect(button.find('Confirm').props().cancelText).toEqual("Peruuta");
    });

    it('has Confirm that dispatches correct function', () => {
        const dispatchSpy = sinon.spy();
        const destroyReservationAndRedirectStub = sinon.stub(actions, 'destroyReservationAndRedirect');
        button.setProps({dispatch: dispatchSpy});
        button.update();

        button.find("Confirm").simulate('confirm');
        expect(dispatchSpy.calledOnce).toBe(true);
        expect(destroyReservationAndRedirectStub.calledOnce).toBe(true);
        expect(destroyReservationAndRedirectStub.calledWithExactly({simulated: "reservation"}, '/varaukset')).toBe(true)
    });
});