import React from 'react';
import axios from 'axios';
import { shallow } from "enzyme";
import sinon from 'sinon';
import ReservationCreator from "../../../app/javascript/components/calendar_page/reservation_creator";
/**
 * Created by owlaukka on 17/06/17.
 */

let creator;
describe('Calendar creator', () => {
    let promise, stub;
    const response = {
        status: 201,
    };

    beforeEach(() => {
        promise = Promise.resolve(response);
        stub = sinon.stub(axios, 'post').callsFake(() => promise);
        creator = shallow(<ReservationCreator reservation={{}} submitted={false}/>);
    });

    afterEach(() => {
        stub.restore();
    });

    it('initially sets state correctly', () => {
        expect(creator.state()).toEqual({msg: "", submitted: false});
    });

    it('displays no message initially', () => {
        expect(creator.find('div').text()).toEqual("");
    });

    it("doesn't post reservation initially", () => {
        expect(stub.calledOnce).toBe(false);
    });

    it("doesn't post reservation when only reservation prop changes", () => {
        creator.setProps({reservation: "new res"});
        creator.update();
        expect(stub.calledOnce).toBe(false);
    });

    it("posts reservation when submitted-props is set to true", () => {
        creator.setProps({submitted: true});
        creator.update();
        expect(stub.calledOnce).toBe(true);
    });

    it('posting sets msg state correctly', () => {
        creator.setProps({submitted: true});
        return promise.then(() => {
            creator.update();
            expect(creator.state().msg).toEqual("Yippii");
        });
    });

    it('posting renders a success msg on succesful post', () => {
        creator.setProps({submitted: true});
        return promise.then(() => {
            creator.update();
            expect(creator.find('div').text()).toEqual("Yippii");
        });
    });
});