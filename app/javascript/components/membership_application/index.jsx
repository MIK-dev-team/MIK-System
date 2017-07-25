/**
 * Created by owlaukka on 29/06/17.
 */
import React from 'react';
import { Provider } from 'react-redux';

import MembershipAppPage from "./membership_app_page";
import store from '../../store/store';

export default class MembershipAppIndex extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MembershipAppPage />
            </Provider>
        )
    }
}