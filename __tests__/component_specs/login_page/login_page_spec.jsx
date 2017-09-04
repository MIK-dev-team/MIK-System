import React from "react";
import sinon from 'sinon';
import { shallow } from "enzyme";

import * as actions from "../../../app/javascript/store/actions/loginActions";
import { LoginPage } from "../../../app/javascript/components/login_page/login_page";

let page;

describe('Login page', () => {

  beforeAll(() => {
      page = shallow(<LoginPage/>);
  });

  it('has Grid', () => {
      expect(page.find('Grid').length).toEqual(1);
  });

  it('has PageHeader', () => {
      expect(page.find('PageHeader').length).toEqual(1);
  });

  it('has correct h1 header', () => {
      expect(page.find('PageHeader').props().children).toEqual('Kirjaudu sisään');
  });

  it('has LoginForm', () => {
      expect(page.find('#login-form').length).toEqual(1);
  });

  it("has correct style for <Col>", () => {
      expect(page.find('Col').first().props().style).toEqual({'float': 'none', 'margin': '0 auto'})
      expect(page.find('Col').last().props().style).toEqual({'float': 'none', 'margin': '0 auto'})
  });

  it('dispatches correct action when submitting LoginForm', () => {
      const dispatchSpy = sinon.spy(),
          loginUserStub = sinon.stub(actions, 'loginUser');
      page.setProps({dispatch: dispatchSpy});

      expect(dispatchSpy.notCalled).toBe(true);
      expect(loginUserStub.notCalled).toBe(true);
      page.find('#login-form').simulate('submit');
      expect(dispatchSpy.calledOnce).toBe(true);
      expect(loginUserStub.calledOnce).toBe(true);
  });
});
