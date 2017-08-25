/**
 * Created by owlaukka on 14/08/17.
 */
import React from 'react';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { hideModal } from '../../store/actions/singleReservationActions';

export class ReservationModal extends React.Component {
    modalBody() {
        if (this.props.reservation === null) {
            return <div></div>
        } else {
            return (
                <Modal.Body>
                    <h4>Varauksen tyyppi</h4>
                    <p>{this.props.reservation.reservation_type}</p>

                    <h4>Alkuaika</h4>
                    <p>{moment(this.props.reservation.start).format('LLL')}</p>

                    <h4>Loppuaika</h4>
                    <p>{moment(this.props.reservation.end).format('LLL')}</p>

                    <h4>Lisätiedot</h4>
                    <p>{this.props.reservation.additional_info}</p>
                </Modal.Body>
            )
        }
    }

    goToEditPage() {
        window.location.href = '/varaukset/' + this.props.reservation.id + '/muokkaa';
    }

    render() {
        const { showModal, dispatch, user_id, reservation } = this.props;
        return (
            <Modal show={showModal} onHide={() => dispatch(hideModal())}>
                <Modal.Header closeButton>
                    <Modal.Title>Varauksen tiedot</Modal.Title>
                </Modal.Header>
                {this.modalBody()}
                <Modal.Footer>
                    { user_id && reservation && user_id === reservation.user_id ? <Button onClick={() => this.goToEditPage()}>
                        Muokkaa
                    </Button> : null }
                    <Button onClick={() => dispatch(hideModal())}>
                        Pienennä
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default connect((store) => {
    return {
        showModal: store.singleReservation.showModal,
        reservation: store.singleReservation.reservation,
        logged: store.session.loggedIn,
        user_id: store.session.user_id,
    }
})(ReservationModal)