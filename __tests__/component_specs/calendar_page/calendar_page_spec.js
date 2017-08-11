import React from "react";
import { shallow } from "enzyme";

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

    it('has no buttongroup', () => {
        expect(page.find('ButtonGroup').length).toEqual(0);
    });

    it('has ReservationFetcher', () => {
        expect(page.find('Connect(ReservationFetcher)').length).toEqual(1);
    });

    it('has PlaneSelection child', () => {
        expect(page.find('Connect(PlaneSelection)').length).toEqual(1);
    });

    it("doesn't have Alert box initially", () => {
        page.update();
        expect(page.find('Alert').length).toEqual(0);
    });

    it('notifierIndicationStyle returns correct style object', () => {
        const returnedValue = page.instance().notifierIndicationStyle();
        expect(returnedValue).toEqual({});
    });
    
    describe("with notifierMode on", () => {
        beforeAll(() => {
            page.setProps({notifierMode: true});
            page.update();
        });

        afterAll(() => {
            page.setProps({notifierMode: undefined});
            page.update();
        });

        it('has NotifierForm component', () => {
            expect(page.find('Connect(NotifierForm)').length).toEqual(1);
        });

        it('notifierIndicationStyle returns correct style object', () => {
            const returnedValue = page.instance().notifierIndicationStyle();
            expect(returnedValue).toEqual({
                backgroundColor: "#90FF4480"
            });
        });
    })
});