/**
 * Created by owlaukka on 01/09/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { FormNavigation } from "../../../app/javascript/components/calendar_page/form_nav";
import * as reservationActions from '../../../app/javascript/store/actions/reservationsActions';

describe('FormNavigation', () => {
    let nav, dispatchSpy;

    beforeAll(() => {
        dispatchSpy = sinon.spy();
        nav = shallow(<FormNavigation dispatch={dispatchSpy} sidebarMod={false} collapsed={false} />);
    });

    afterEach(() => {
        dispatchSpy.reset();
    });

    it('has correct static elements', () => {
        expect(nav.find('Col').length).toEqual(1);
        expect(nav.find('Nav').length).toEqual(1);
        expect(nav.find('NavItem').length).toEqual(2);
        expect(nav.find('Panel').length).toEqual(1);
    });

    it('has correct ReservationForm with sidebarMod false', () => {
        expect(nav.find('#mass-cancel-res-form').length).toEqual(1);
        expect(nav.find('#add-res-form').length).toEqual(0);
    });

    it('has correct class on Col when collapsed', () => {
        nav.setProps({collapsed: true});
        nav.update();

        expect(nav.find('Col').props().className).toEqual('collapsed');

        nav.setProps({collapsed: false});
        nav.update();
    });

    it('has correct props on static elements', () => {
        expect(nav.find('Col').props().id).toEqual('sidebar');
        expect(nav.find('Col').props().className).toEqual('col-lg-4');
        expect(nav.find('Panel').props().header).toEqual(<h3>Peru varaukset</h3>)
    });

    it('dispatches correct action when mass deletion form is submitted', () => {
        const submitStub = sinon.stub(reservationActions, 'massDestroyReservation');

        nav.find('#mass-cancel-res-form').simulate('submit');
        expect(dispatchSpy.calledOnce).toBe(true);
        expect(submitStub.calledOnce).toBe(true);
        expect(dispatchSpy.calledWithExactly(submitStub));
        submitStub.restore();
    });

    it('calls correct function when selecting between adding and deleting res', () => {
        const toggleStub = sinon.stub(nav.instance(), 'toggleSidebarMod');

        expect(toggleStub.notCalled).toBe(true);
        nav.find('Nav').simulate('select', 2);
        expect(toggleStub.calledOnce).toBe(true);
        expect(toggleStub.calledWithExactly(2)).toBe(true);
        toggleStub.restore();
    });

    describe('when sidebarMod is true', () => {
        beforeAll(() => {
            nav.setProps({sidebarMod: true});
            nav.update();
        });

        it('has Panel with correct props', () => {
            expect(nav.find('Panel').props().header).toEqual(<h3>Luo varaus</h3>)
            expect(nav.find('Panel').props().bsStyle).toEqual('primary')
        });

        it('has correct ReservationForm with sidebarMod false', () => {
            expect(nav.find('#mass-cancel-res-form').length).toEqual(0);
            expect(nav.find('#add-res-form').length).toEqual(1);
        });

        it('dispatches correct action when add reservation form is submitted', () => {
            const submitStub = sinon.stub(reservationActions, 'submitReservation');

            nav.find('#add-res-form').simulate('submit');
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(submitStub.calledOnce).toBe(true);
            expect(dispatchSpy.calledWithExactly(submitStub));
            submitStub.restore();
        });
    });

    describe('has function toggleSidebarMod', () => {
        let setSidebarModStub;

        beforeEach(() => {
            setSidebarModStub = sinon.stub(reservationActions, 'setSidebarMod');
        });

        afterEach(() => {
            setSidebarModStub.restore();
            nav.setProps({sidebarMod: false});
            nav.update();
        });

        it('that dispatches correct action when called with 2 and sidebarMod is true', () => {
            nav.setProps({sidebarMod: true});
            nav.update();
            nav.instance().toggleSidebarMod(2);

            expect(dispatchSpy.calledOnce).toBe(true);
            expect(setSidebarModStub.calledOnce).toBe(true);
            expect(setSidebarModStub.calledWithExactly(2)).toBe(true);
        });

        it('that dispatches correct action when called with 1 and sidebarMod is false', () => {
            nav.setProps({sidebarMod: false});
            nav.update();
            nav.instance().toggleSidebarMod(1);

            expect(dispatchSpy.calledOnce).toBe(true);
            expect(setSidebarModStub.calledOnce).toBe(true);
            expect(setSidebarModStub.calledWithExactly(1)).toBe(true);
        });

        it('does nothing when called with 2 and sidebarMod is false', () => {
            nav.setProps({sidebarMod: false});
            nav.update();
            nav.instance().toggleSidebarMod(2);

            expect(dispatchSpy.notCalled).toBe(true);
            expect(setSidebarModStub.notCalled).toBe(true);
        });

        it('does nothing when called with 1 and sidebarMod is true', () => {
            nav.setProps({sidebarMod: true});
            nav.update();
            nav.instance().toggleSidebarMod(1);

            expect(dispatchSpy.notCalled).toBe(true);
            expect(setSidebarModStub.notCalled).toBe(true);
        });

        it('does nothing when called with something wrong and sidebarMod is true', () => {
            nav.setProps({sidebarMod: true});
            nav.update();
            nav.instance().toggleSidebarMod(45);

            expect(dispatchSpy.notCalled).toBe(true);
            expect(setSidebarModStub.notCalled).toBe(true);
        });

        it('does nothing when called with something wrong and sidebarMod is false', () => {
            nav.setProps({sidebarMod: false});
            nav.update();
            nav.instance().toggleSidebarMod(45);

            expect(dispatchSpy.notCalled).toBe(true);
            expect(setSidebarModStub.notCalled).toBe(true);
        });
    });
});