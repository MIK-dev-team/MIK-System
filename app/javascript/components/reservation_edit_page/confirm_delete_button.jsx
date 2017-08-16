/**
 * Created by owlaukka on 16/08/17.
 */
import React from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import Confirm from 'react-confirm-bootstrap';

import { destroyReservationAndRedirect } from "../../store/actions/singleReservationActions";

export class ConfirmDeleteButton extends React.Component {
    render() {
        return (
            <Confirm
                onConfirm={() => this.props.dispatch(destroyReservationAndRedirect(this.props.reservation, '/varaukset'))}
                body="Oletko varma, että haluat poistaa tämän varauksen?"
                confirmText="Poista varaus"
                title="Poista varaus"
                cancelText="Peruuta">
                <Button
                    bsStyle="danger">
                    Poista varaus
                </Button>
            </Confirm>
        )
    }
}

export default connect((store) => {
    return {
        reservation: store.singleReservation.reservation,
    }
})(ConfirmDeleteButton)