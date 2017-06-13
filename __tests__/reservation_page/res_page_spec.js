import React from "react";
import { mount, shallow } from "enzyme";
import sinon from "sinon";
import moment from "moment";
import axios from "axios";
import ReservationsPage from "../../app/javascript/components/reservations_list/res_page";
/**
 * Created by owlaukka on 13/06/17.
 */

let page;
describe('Reservation page initially', () => {

    beforeAll(() => {
        page = shallow(<ReservationsPage/>);
    });

    it('sets state correctly', () => {
        expect(page.state().reservations).toEqual([{}]);
    });

    it('has Grid', () => {
        expect(page.find('Grid').length).toEqual(1);
    });

    it('has ReservationTable', () => {
        expect(page.find('ReservationTable').length).toEqual(1);
    });

    it('sets props correctly on ReservationTable', () => {
        expect(page.find('ReservationTable').props()).toEqual({reservations: [{}]});
    });
});

describe('Reservation page reservation fetch', () => {
    let stub;
    let promise;
    const response = {
        data: [
            {
                id: 1,
                start: moment("2017-06-10T18:00:00+03:00").toDate(),
                end: moment("2017-06-10T20:00:00+03:00").toDate(),
                plane_id: 2,
                reservation_type: "opetus"
            },
            {
                id: 2,
                start: moment("2017-06-09T10:30:00+03:00").toDate(),
                end: moment("2017-06-09T20:00:00+03:00").toDate(),
                plane_id: 1,
                reservation_type: "harraste"
            }
        ]
    };

    beforeAll(() => {
        promise = Promise.resolve(response);
        stub = sinon.stub(axios, 'get').callsFake(() => promise);
        page = mount(<ReservationsPage/>);
    });

    afterAll(() => {
        stub.restore();
    });

    it('is performed with axios get-method', () => {
        expect(stub.calledOnce).toBe(true);
    });

    it('gets data async using axios', () => {
        return promise.then((res) => {
            expect(res.data).toEqual(response.data);
        });
    });

    it('sets fetched data to state', () => {
        return promise.then(() => {
            page.update();
            expect(page.state()).toEqual({reservations: response.data});
        });
    });

    it("sets fetched data to ReservationTable's props correctly", () => {
        return promise.then(() => {
            page.update();
            expect(page.find('ReservationTable').props()).toEqual({reservations: response.data});
        })
    });

    it('converts datestrings correctly with modifyResponse', () => {
        const input = {
            data: [
                {
                    id: 1,
                    start: "2017-06-10T18:00:00+03:00",
                    end: "2017-06-10T20:00:00+03:00",
                    plane_id: 2,
                    reservation_type: "opetus"
                },
                {
                    id: 2,
                    start: "2017-06-09T10:30:00+03:00",
                    end: "2017-06-09T20:00:00+03:00",
                    plane_id: 1,
                    reservation_type: "harraste"
                }
            ]
        }
        page = shallow(<ReservationsPage/>);
        expect(page.state()).toEqual({reservations: [{}]});
        page.instance().modifyResponse(input);
        page.update();
        expect(page.state()).toEqual({reservations: response.data});
    })
});