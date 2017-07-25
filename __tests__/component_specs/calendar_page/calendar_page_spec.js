import React from "react";
import { mount, shallow } from "enzyme";
import sinon from 'sinon';

import * as actions from '../../../app/javascript/store/actions/reservationsActions'
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
        expect(page.find('Col').length).toEqual(1);
    });

    it('has no buttongroup', () => {
        expect(page.find('ButtonGroup').length).toEqual(0);
    });

    it('has ReservationFetcher', () => {
        expect(page.find('Connect(ReservationFetcher)').length).toEqual(1);
    });

    it("doesn't have Alert box initially", () => {
        page.update();
        expect(page.find('Alert').length).toEqual(0);
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
});