/**
 * Created by owlaukka on 10/08/17.
 */
import React from 'react';
import { Provider } from 'react-redux';

import MenuBar from "./menu_bar";
import store from '../../store/store';
import { setLoggedIn, setUserId} from "../../store/actions/sessionActions";

export default class MenuBarIndex extends React.Component {
    componentWillMount() {
        store.dispatch(setLoggedIn(this.props.logged));
        store.dispatch(setUserId(this.props.user_id));
    }
    render() {
        return (
            <Provider store={store}>
                <MenuBar/>
            </Provider>
        )
    }
}
