import React from 'react';
import { Provider } from 'react-redux';

import { setPlanes } from '../../store/actions/planesActions';
import { setLoggedIn } from "../../store/actions/sessionActions";
import CalendarPage from "./calendar_page";
import store from '../../store/store';

export default class CalendarIndex extends React.Component {
    componentWillMount() {
        store.dispatch(setPlanes(this.props.planes));
    }

    render() {
        return (
            <Provider store={store}>
                <CalendarPage planes={this.props.planes}/>
            </Provider>
        )
    }
}