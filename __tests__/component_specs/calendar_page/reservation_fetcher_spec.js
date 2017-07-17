/**
 * Created by owlaukka on 15/06/17.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import * as actions from '../../../app/javascript/store/actions/reservationsActions';
import store from '../../../app/javascript/store/store';
import { ReservationFetcher } from "../../../app/javascript/components/calendar_page/reservation_fetcher";

let fetcher, dispatchSpy, fetchStub;
describe('ReservationFetcher', () => {
    beforeAll(() => {
        dispatchSpy = spy();
        fetchStub = stub(actions, 'fetchReservations');
    });

    beforeEach(() => {
        fetcher = shallow(<ReservationFetcher dispatch={dispatchSpy}/>);
    });

    afterEach(() => {
        dispatchSpy.reset();
        fetchStub.reset();
    });

    it('has Calendar', () => {
        expect(fetcher.find('Connect(Calendar)').length).toEqual(1);
    });

    it('calls dispatch with correct action when plane changes', () => {
        expect(fetchStub.calledOnce).toBe(false);
        fetcher.setProps({plane: 2});
        fetcher.update();
        expect(fetchStub.calledOnce).toBe(true);
        expect(dispatchSpy.calledOnce).toBe(true);
    });

    it('does not call dispatch when props other than plane change', () => {
        expect(fetchStub.calledOnce).toBe(false);
        fetcher.setProps({somethingElse: 2});
        fetcher.update();
        expect(fetchStub.calledOnce).toBe(false);
        expect(dispatchSpy.calledOnce).toBe(false);
    });

    it('calls dispatch with correct action when mounted', () => {
        fetcher = mount(<Provider store={store}><ReservationFetcher dispatch={dispatchSpy}/></Provider>)
        expect(dispatchSpy.calledOnce).toBe(true);
        expect(fetchStub.calledOnce).toBe(true);
        fetcher.unmount();
    });
});