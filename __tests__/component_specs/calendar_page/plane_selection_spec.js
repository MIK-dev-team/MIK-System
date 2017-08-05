import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import moment from "moment";

import * as planeActions from '../../../app/javascript/store/actions/planesActions';
import { PlaneSelection } from "../../../app/javascript/components/calendar_page/plane_selection";
/**
 * Created by owlaukka on 17/06/17.
 */

let planeSelection;
describe('PlaneSelection', () => {
    beforeAll(() => {
        planeSelection = shallow(<PlaneSelection planes={[]} />);
    });

    afterEach(() => {
        planeSelection.setProps({planes: [], selectedPlane: undefined});
        planeSelection.update();
    });

    it('shows correct amount of buttons with no planes set', () => {
        expect(planeSelection.find('Button').length).toEqual(1);
    });

    it('has Col and ButtonToolbar', () => {
        expect(planeSelection.find('Col').length).toEqual(1);
        expect(planeSelection.find('ButtonToolbar').length).toEqual(1);
    });

    it('has ButtonGroup with correct size', () => {
        expect(planeSelection.find('ButtonGroup').props().bsSize).toEqual('large');
    });

    describe('with existing planes', () => {
        beforeEach(() => {
            planeSelection.setProps({planes: [{ id: 1, name: "first" }, { id: 2, name: "second" }]});
            planeSelection.update();
        });

        it('correct amount of buttons', () => {
            planeSelection.setProps({planes: [{ id: 1, name: "first" }, { id: 2, name: "second" }]});
            planeSelection.update();
            expect(planeSelection.find('Button').length).toEqual(3);
        });

        it('has correct button active initially', () => {
            expect(planeSelection.find('Button').first().props().className).toEqual('');
            expect(planeSelection.find('Button').at(1).props().className).toEqual('');
            expect(planeSelection.find('Button').last().props().className).toEqual('active');
        });

        it('has correct button as active when selectedPlane changes', () => {
            planeSelection.setProps({selectedPlane: 1});
            planeSelection.update();
            expect(planeSelection.find('Button').first().props().className).toEqual('active');
            expect(planeSelection.find('Button').at(1).props().className).toEqual('');
            expect(planeSelection.find('Button').last().props().className).toEqual('');
        });

        describe('pressing buttons', () => {
            let dispatch, actionStub;
            beforeEach(() => {
                dispatch = sinon.spy();
                planeSelection.setProps({dispatch: dispatch})
                planeSelection.update();
            });

            afterEach(() => {
                actionStub.restore();
                dispatch.reset();
            });

            it('pressing first button triggers dispatch with correct action', () => {
                actionStub = sinon.stub(planeActions, 'selectPlane');

                expect(dispatch.calledOnce).toBe(false);
                expect(actionStub.calledOnce).toBe(false);
                planeSelection.find('Button').first().simulate('click');
                expect(dispatch.calledOnce).toBe(true);
                expect(actionStub.calledOnce).toBe(true);
            });

            it('pressing last button triggers dispatch with correct action', () => {
                actionStub = sinon.stub(planeActions, 'selectPlane');

                expect(dispatch.calledOnce).toBe(false);
                expect(actionStub.calledOnce).toBe(false);
                planeSelection.find('Button').first().simulate('click');
                expect(dispatch.calledOnce).toBe(true);
                expect(actionStub.calledOnce).toBe(true);
            });
        });
    });
});