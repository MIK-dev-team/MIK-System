/**
 * Created by owlaukka on 14/08/17.
 */
import React from 'react';

import ReservationEditForm from './reservation_edit_form';

export default class ReservationEditPage extends React.Component {
    render() {
        return (
            <ReservationEditForm reservation={this.props.reservation}/>
        )
    }
}