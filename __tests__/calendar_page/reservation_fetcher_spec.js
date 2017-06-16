/**
 * Created by owlaukka on 15/06/17.
 */
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import ReservationFetcher from "../../app/javascript/components/calendar_page/reservation_fetcher";

let fetcher;
const plane = "kone1";
describe('ReservationFetcher', () => {
    describe('initially', () => {
        beforeAll(() => {
            fetcher = shallow(<ReservationFetcher plane={plane}/>);
        });

        it('has correct state initially', () => {
            expect(fetcher.state()).toEqual({reservations: [{}], plane: plane});
        });

        it('has Calendar component', () => {
            expect(fetcher.find('Calendar').length).toEqual(1);
        });

        it('sets Calendar props correctly initially', () => {
            let calendar = fetcher.find('Calendar');
            expect(calendar.props().plane).toEqual(plane);
            expect(calendar.props().reservations).toEqual([{}]);
        })
    });

    describe('uses ajax', () => {
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
            fetcher = mount(<ReservationFetcher plane={plane}/>);
        });

        afterAll(() => {
            stub.restore();
            fetcher.unmount();
        });

        it('once', () => {
            expect(stub.calledOnce).toBe(true);
        });

        it('and returns correct data', () => {
            return promise.then((res) => {
                expect(res.data).toEqual(response.data);
            });
        });

        it('and sets fetched data to state', () => {
            return promise.then(() => {
                fetcher.update();
                expect(fetcher.state()).toEqual({plane: plane, reservations: response.data});
            });
        });

        it("and sets fetched data to Calendar's props correctly", () => {
            return promise.then(() => {
                fetcher.update();
                expect(fetcher.find('Calendar').first().props()).toEqual({plane: plane, reservations: response.data});
            })
        });
    });
});