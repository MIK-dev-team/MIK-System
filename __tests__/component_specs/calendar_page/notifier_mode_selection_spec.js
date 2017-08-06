import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";

import * as notifierActions from '../../../app/javascript/store/actions/notifiersActions';
import { NotifierModeSelection } from "../../../app/javascript/components/calendar_page/notifier_mode_selection";
/**
 * Created by owlaukka on 17/06/17.
 */

let notifierModeSelection;
describe('Notifier mode selection', () => {
    beforeAll(() => {
        notifierModeSelection = shallow(<NotifierModeSelection notifierMode={false} />);
    });

    afterEach(() => {
        notifierModeSelection.setProps({notifierMode: false});
        notifierModeSelection.update();
    });

    it('shows correct amount of buttons with no planes set', () => {
        expect(notifierModeSelection.find('Button').length).toEqual(1);
    });

    it('has Button with correct props initially', () => {
        expect(notifierModeSelection.find('Button').props().bsSize).toEqual('large');
        expect(notifierModeSelection.find('Button').props().className).toEqual('');
    });

    it('has Col', () => {
        expect(notifierModeSelection.find('Col').length).toEqual(1);
        expect(notifierModeSelection.find('Row').length).toEqual(0);
    });

    it('has button that calls correct function inside dispatch when pressed', () => {
        const dispatchSpy = sinon.spy();
        const setNotifierModeStub = sinon.stub(notifierActions, 'setNotifierMode');
        notifierModeSelection.setProps({dispatch: dispatchSpy});
        notifierModeSelection.update();

        notifierModeSelection.find('Button').simulate('click');

        expect(dispatchSpy.calledOnce).toBe(true);
        expect(setNotifierModeStub.calledOnce).toBe(true);
    });

    describe('with notifierMode on', () => {
        beforeEach(() => {
            notifierModeSelection.setProps({notifierMode: true});
            notifierModeSelection.update();
        });

        it('Button is active', () => {
            expect(notifierModeSelection.find('Button').props().className).toEqual('active');
        });
    });
});