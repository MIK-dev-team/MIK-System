import React from 'react';
import { Provider } from 'react-redux';

import CalendarPage from "./calendar_page";
import store from '../../store/store';

export default class CalendarIndex extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <CalendarPage/>
            </Provider>
        )
    }
}