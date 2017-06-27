/**
 * Created by owlaukka on 15/06/17.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import store from '../../../app/javascript/store/store';
import { ReservationFetcher } from "../../../app/javascript/components/calendar_page/reservation_fetcher";

let fetcher;
describe('ReservationFetcher', () => {
    it('has Calendar', () => {
        fetcher = shallow(<ReservationFetcher/>);
        expect(fetcher.find('Connect(Calendar)').length).toEqual(1);
    });

    it('calls dispatch when mounted', () => {
        const spy = sinon.spy();
        fetcher = mount(<Provider store={store}><ReservationFetcher dispatch={spy}/></Provider>)
        expect(spy.calledOnce).toBe(true);
        fetcher.unmount();
    })
});