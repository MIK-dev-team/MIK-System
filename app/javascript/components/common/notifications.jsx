/**
 * Created by owlaukka on 09/08/17.
 */
import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { resetNotifications } from "../../store/actions/notificationsActions";

export class Notifications extends React.Component {
    setAlertFrame() {
        let alert = <div></div>;
        if (this.props.success !== null) {
            alert = (<Alert bsStyle="success" onDismiss={() => this.props.dispatch(resetNotifications())}>
                <h4>{this.props.success.header}</h4>
                <p>{this.props.success.text}</p>
            </Alert>)
        } else if (this.props.error !== null) {
            alert = (<Alert bsStyle="danger" onDismiss={() => this.props.dispatch(resetNotifications())}>
                <h4>Jotain meni vikaan</h4>
                {this.props.error.map((error, index) =>
                    <p key={index}>{error}</p>
                )}
                <p>
                    <Button onClick={() => this.props.dispatch(resetNotifications())} bsStyle="info">Piilota</Button>
                </p>
            </Alert>)
        } else if (this.props.info !== null) {
            alert = (<Alert bsStyle="info" onDismiss={() => this.props.dispatch(resetNotifications())}>
                <h4>{this.props.info}</h4>
            </Alert>)
        }

        return alert;
    }

    render() {

        return this.setAlertFrame();
    }
}

export default connect((store) => {
    return {
        success: store.notifications.successMsg,
        error: store.notifications.errorMsg,
        info: store.notifications.infoMsg,
    }
})(Notifications)