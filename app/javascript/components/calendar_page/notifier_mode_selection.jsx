/**
 * Created by owlaukka on 28/07/17.
 */
import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setNotifierMode } from '../../store/actions/notifiersActions';

export class NotifierModeSelection extends React.Component {
    render() {
        return (
            <Col md={6}>
                <Button
                    bsSize="large"
                    onClick={() => this.props.dispatch(setNotifierMode())}
                    className={(this.props.notifierMode) ? "active" : ""}
                >
                    Luo tarkkailija
                </Button>
            </Col>
        )
    }
}

export default connect((store) => {
    return {
        notifierMode: store.notifiers.notifierMode
    }
})(NotifierModeSelection)