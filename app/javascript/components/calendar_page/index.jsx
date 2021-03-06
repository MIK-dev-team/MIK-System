import React from 'react';
import { Provider } from 'react-redux';

import { setPlanes } from '../../store/actions/planesActions';
import CalendarPage from "./calendar_page";
import store from '../../store/store';

export default class CalendarIndex extends React.Component {
    componentWillMount() {
        store.dispatch(setPlanes(this.props.planes));
    }

    render() {
        return (
            <Provider store={store}>
                <CalendarPage user_id={this.props.user_id} planes={this.props.planes}/>
            </Provider>
        )
    }
}