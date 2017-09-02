/**
 * Created by owlaukka on 29/06/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Well, PageHeader } from 'react-bootstrap';

import Notifications from '../common/notifications';
import MembershipAppForm from './membership_app_form';
import { submitMembershipApp } from '../../store/actions/applicationActions';

const styles = {
    jumbo: {
        'borderRadius': '0px'
    },
    colCentered: {
        'float': 'none',
        'margin': '0 auto'
    },
    helpSpacing: {
        'lineHeight': '25px'
    }
};

export class MembershipAppPage extends React.Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={6} style={styles.colCentered}>
                        <PageHeader className="text-center">Liity jäseneksi!</PageHeader>
                        <Notifications/>
                        <Well bsSize="large" style={styles.helpSpacing}>Tervetuloa Malmin Ilmailukerhon ilmailua rakastavien lentäjien ja muiden
                            harrastajien joukkoon! Voit liittyä kerhomme jäseneksi allaolevalla
                            lomakkeella, lomakkeen lähetettyäsi otamme sinuun lähipäivinä yhteyttä
                            – pysy siis kuulolla!
                        </Well>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} md={6} sm={6} style={styles.colCentered}>
                        <MembershipAppForm
                            id="membership-app-form"
                            onSubmit={(values) => this.props.dispatch(submitMembershipApp(values))} />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default connect((store) => {
    return {}
})(MembershipAppPage)