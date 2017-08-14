/**
 * Created by owlaukka on 14/08/17.
 */
import React from 'react';
import { Provider } from 'react-redux';

import ReservationEditPage from "./reservation_edit_page";
import store from '../../store/store';

export default class ReservationEditIndex extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ReservationEditPage reservation={this.props.reservation}/>
            </Provider>
        )
    }
}