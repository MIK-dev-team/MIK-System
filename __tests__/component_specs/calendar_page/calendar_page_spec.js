import React from "react";
import { mount, shallow } from "enzyme";
import sinon from 'sinon';
import { CalendarPage } from "../../../app/javascript/components/calendar_page/calendar_page";
/**
 * Created by owlaukka on 16/06/17.
 */

let page;
describe('Calendar page', () => {
    beforeAll(() => {
        page = shallow(<CalendarPage />);
    });

    it('contains Grid', () => {
        expect(page.find('Grid').length).toEqual(1);
    });

    it('contains correect header', () => {
        expect(page.find('h1').text()).toEqual('Varauskalenteri');
    });

    it('has correct amount of rows', () => {
        expect(page.find('Row').length).toEqual(1);
    });

    it('has correct mount of columns', () => {
        expect(page.find('Col').length).toEqual(2);
    });

    it('has buttongroup', () => {
        expect(page.find('ButtonGroup').length).toEqual(1);
    });

    it('has buttongroup with correct amount of buttons', () => {
        expect(page.find('ButtonGroup > Button').length).toEqual(3);
    });

    it('has ReservationFetcher', () => {
        expect(page.find('Connect(ReservationFetcher)').length).toEqual(1);
    });

    it("doesn't have Alert box initially", () => {
        page.update();
        expect(page.find('Alert').length).toEqual(0);
    });

    it('triggers onclick function when button pressed', () => {
        let spy = sinon.spy();
        page = shallow(<CalendarPage dispatch={spy}/>);
        page.find('ButtonGroup > Button').first().simulate('click');
        page.find('ButtonGroup > Button').at(1).simulate('click');
        page.find('ButtonGroup > Button').last().simulate('click');

        expect(spy.calledThrice).toBe(true);
        page.setProps({dispatch: undefined});
    });

    describe("with sent props set", () => {
        beforeAll(() => {
            page.setProps({sent: true});
            page.update();
        });

        afterAll(() => {
            page.setProps({sent: undefined})
            page.update();
        });

        it('shows alert when has sent props', () => {
            expect(page.find('Alert').length).toEqual(1);
        });

        it("shows correct alert", () => {
            expect(page.find('Alert').props().bsStyle).toEqual('success');
            expect(page.find('Alert > h4').text()).toEqual('Varaus tallennettu!');
        });
    });

    describe("with error set", () => {
        beforeAll(() => {
            page.setProps({error: "something"})
            page.update();
        });

        afterAll(() => {
            page.setProps({error: undefined})
            page.update();
        });

        it('shows error Alert', () => {
            expect(page.find('Alert').props().bsStyle).toEqual('danger');
            expect(page.find('Alert > h4').text()).toEqual('Kyseisen ajan varaaminen kyseiselle lentokoneelle ei onnistunut');
        });
    });

    describe("with selectedPlane set", () => {
        afterAll(() => {
            page.setProps({selectedPlane: undefined});
            page.update();
        });

        it("has correct Button as active initially", () => {
            page.setProps({selectedPlane: 1});
            page.update();
            expect(page.find('ButtonGroup > Button').first().props().className).toEqual('active');
            expect(page.find('ButtonGroup > Button').at(1).props().className).toEqual('');
            expect(page.find('ButtonGroup > Button').last().props().className).toEqual('');
        });

        it("has correct Button as active when selected plane changes to 2", () => {
            page.setProps({selectedPlane: 2});
            page.update();
            expect(page.find('ButtonGroup > Button').first().props().className).toEqual('');
            expect(page.find('ButtonGroup > Button').at(1).props().className).toEqual('active');
            expect(page.find('ButtonGroup > Button').last().props().className).toEqual('');
        });

        it("has correct Button as active when selected plane changes to 3", () => {
            page.setProps({selectedPlane: 3});
            page.update();
            expect(page.find('ButtonGroup > Button').first().props().className).toEqual('');
            expect(page.find('ButtonGroup > Button').at(1).props().className).toEqual('');
            expect(page.find('ButtonGroup > Button').last().props().className).toEqual('active');
        });
    });
});