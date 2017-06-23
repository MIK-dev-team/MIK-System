import React from "react";
import { mount, shallow } from "enzyme";
import sinon from "sinon";
import moment from "moment";
import axios from "axios";
import ReservationsPage from "../../../app/javascript/components/reservations_list/res_page";
/**
 * Created by owlaukka on 13/06/17.
 */
let page;

describe('Reservation page initially', () => {

    beforeAll(() => {
        page = shallow(<ReservationsPage/>);
    });

    it('has Grid', () => {
        expect(page.find('Grid').length).toEqual(1);
    });

    it('has ReservationTable', () => {
        expect(page.find('#table').length).toEqual(1);
    });
});