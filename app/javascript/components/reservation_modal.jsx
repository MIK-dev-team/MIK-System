/**
 * Created by owlaukka on 14/08/17.
 */
import React from 'react';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { hideModal } from '../store/actions/singleReservationActions';

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
        return (
            <Modal show={this.props.showModal} onHide={() => this.props.dispatch(hideModal())}>
                <Modal.Header closeButton>
                    <Modal.Title>Varauksen tiedot</Modal.Title>
                </Modal.Header>
                {this.modalBody()}
                <Modal.Footer>
                    <Button onClick={() => this.goToEditPage()}>
                        Muokkaa
                    </Button>
                    <Button onClick={() => this.props.dispatch(hideModal())}>
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
    }
})(ReservationModal)