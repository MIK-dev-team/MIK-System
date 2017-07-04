import React from "react";
import { mount, shallow } from "enzyme";
import sinon from "sinon";
import moment from "moment";
import axios from "axios";
import CalendarPage from "../../../app/javascript/components/calendar_page/calendar_page";
/**
 * Created by owlaukka on 16/06/17.
 */

let page;
describe('Calendar page', () => {
    beforeAll(() => {
        page = shallow(<CalendarPage/>);
    });

    it('sets initial state correctly', () => {
        expect(page.state()).toEqual({selectedPlane: "kone1"});
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

    it('has CalendarFetcher with correct props initially', () => {
        expect(page.find('ReservationFetcher').length).toEqual(1);
        expect(page.find('ReservationFetcher').props()).toEqual({plane: "kone1"});
    });

    it('changes state when 3rd button is pressed in buttongroup to change plane', () => {
        const button = page.find('Button').at(2);
        expect(button.props().className).toEqual("");
        button.simulate('click');
        page.update();
        expect(page.find('Button').at(2).props().className).toEqual('active');
        expect(page.state()).toEqual({selectedPlane: "kone3"});
    });

    it('changes state when 1st button is pressed in buttongroup to change plane', () => {
        const button = page.find('Button').first();
        expect(button.props().className).toEqual("");
        button.simulate('click');
        page.update();
        expect(page.find('Button').first().props().className).toEqual('active');
        expect(page.state()).toEqual({selectedPlane: "kone1"});
    });

    it('changes state when 2nd button is pressed in buttongroup to change plane', () => {
        const button = page.find('Button').at(1);
        expect(button.props().className).toEqual("");
        button.simulate('click');
        page.update();
        expect(page.find('Button').at(1).props().className).toEqual('active');
        expect(page.state()).toEqual({selectedPlane: "kone2"});
    });
});