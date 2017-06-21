import React from 'react';
import { Provider } from 'react-redux';

import ReservationsPage from "./res_page";
import store from '../../store/store';

export default class ReservationsIndex extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ReservationsPage/>
            </Provider>
        )
    }
}