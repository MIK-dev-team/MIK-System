/**
 * Created by owlaukka on 14/08/17.
 */
import React from 'react';
import { Provider } from 'react-redux';

import ReservationEditPage from "./reservation_edit_page";
import { setReservation } from "../../store/actions/singleReservationActions";
import { setPlanes } from "../../store/actions/planesActions";
import store from '../../store/store';

export default class ReservationEditIndex extends React.Component {
    componentWillMount() {
        store.dispatch(setReservation(this.props.reservation));
        store.dispatch(setPlanes(this.props.planes));
    }
    render() {
        return (
            <Provider store={store}>
                <ReservationEditPage />
            </Provider>
        )
    }
}