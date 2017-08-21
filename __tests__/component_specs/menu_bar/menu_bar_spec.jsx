/**
 * Created by owlaukka on 12/08/17.
 */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { MenuBar } from "../../../app/javascript/components/menu_bar/menu_bar";
import * as loginActions from '../../../app/javascript/store/actions/loginActions';

let menu, goToStub;
describe('MenuBar', () => {
    beforeAll(() => {
        menu = shallow(<MenuBar />);
        goToStub = sinon.stub(menu.instance(), 'goToUrl');
    });

    afterEach(() => {
        goToStub.reset();
    });

    it('has correct elements', () => {
        expect(menu.find('Jumbotron').length).toEqual(1);
        expect(menu.find('NavItem').length).toEqual(4);
        expect(menu.find('h1').text()).toEqual('Malmin Ilmailukerho');
    });

    describe('when not logged in', () => {
        it('has Nav with correct style', () => {
            expect(menu.find('Nav').first().props().bsStyle).toEqual('tabs')
        });

        it('has correct amount of NavItems', () => {
            expect(menu.find('NavItem').length).toEqual(4);
        });

        it('calls correct function when pressing first NavItem', () => {
            menu.find('NavItem').first().simulate('click');
            expect(goToStub.calledOnce).toBe(true);
            expect(goToStub.calledWithExactly("/")).toBe(true);
        });

        // second NavItem is a test button to see how the bar looks
        it('calls correct function when pressing third NavItem', () => {
            menu.find('NavItem').at(2).simulate('click');
            expect(goToStub.calledOnce).toBe(true);
            expect(goToStub.calledWithExactly("/liity")).toBe(true);
        });

        it('calls correct function when pressing fourth NavItem', () => {
            menu.find('NavItem').at(3).simulate('click');
            expect(goToStub.calledOnce).toBe(true);
            expect(goToStub.calledWithExactly("/kirjaudu")).toBe(true);
        });
    });

    describe('when logged in', () => {
        beforeAll(() => {
            menu.setProps({logged: true});
            menu.update();
        });

        it('has Nav with correct style', () => {
            expect(menu.find('Nav').first().props().bsStyle).toEqual('tabs')
        });

        it('has correct amount of NavItems', () => {
            expect(menu.find('NavItem').length).toEqual(4);
        });

        it('calls correct function when pressing first NavItem', () => {
            menu.find('NavItem').first().simulate('click');
            expect(goToStub.calledOnce).toBe(true);
            expect(goToStub.calledWithExactly("/")).toBe(true);
        });

        it('calls correct function when pressing second NavItem', () => {
            menu.find('NavItem').at(1).simulate('click');
            expect(goToStub.calledOnce).toBe(true);
            expect(goToStub.calledWithExactly("/varaukset")).toBe(true);
        });

        // third NavItem is a test button to see how the bar looks
        it('has correct props on logout NavItem', () => {
            expect(menu.find('NavItem').at(3).props().children).toEqual('Kirjaudu ulos');
        });

        it('dispatches correct action when pressing logout button', () => {
            const dispatchSpy = sinon.spy(),
                logOutStub = sinon.stub(loginActions, 'logOutAndRedirect');
            menu.setProps({dispatch: dispatchSpy});
            menu.update();

            expect(dispatchSpy.notCalled).toBe(true);
            expect(logOutStub.notCalled).toBe(true);
            menu.find('NavItem').at(3).simulate('click');
            expect(dispatchSpy.calledOnce).toBe(true);
            expect(logOutStub.calledOnce).toBe(true);
            expect(logOutStub.calledWithExactly()).toBe(true)
            logOutStub.restore();
        })
    });
});