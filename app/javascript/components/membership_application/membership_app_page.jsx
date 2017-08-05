/**
 * Created by owlaukka on 29/06/17.
 */
import React from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';


import MembershipForm from './membership_form';

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

export default class MembershipAppPage extends React.Component {
    render() {
        return (
            <Grid>
                <Jumbotron style={styles.jumbo}>
                <h1>Liity jäseneksi!</h1>
                    <p style={styles.helpSpacing}>Tervetuloa Malmin Ilmailukerhon ilmailua rakastavien lentäjien ja muiden
                        harrastajien joukkoon! Voit liittyä kerhomme jäseneksi allaolevalla
                        lomakkeella, lomakkeen lähetettyäsi otamme sinuun lähipäivinä yhteyttä
                        – pysy siis kuulolla!
                    </p>
                </Jumbotron>
                <Row>
                    <Col lg={6} md={6} sm={6} style={styles.colCentered}>
                        <MembershipForm />
                    </Col>
                </Row>
            </Grid>
        )
    }
}