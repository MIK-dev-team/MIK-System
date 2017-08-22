/**
 * Created by owlaukka on 24/07/17.
 */
import React from 'react';
import { Col, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import { selectPlane } from '../../store/actions/planesActions';

export class PlaneSelection extends React.Component {
    mapPlanesToButtons() {
        if (this.props.planes.length === 0) {
            return;
        } else {
            return this.props.planes.map((plane) =>
                <Button key={plane.id} onClick={() => this.props.dispatch(selectPlane(plane))}
                        className={this.props.selectedPlane === plane.id ? "active" : ""}>
                    {plane.name}
                </Button>
            )
        }
    }

    render() {
        return (
            <Col md={6}>
                <ButtonToolbar>
                    <ButtonGroup bsSize="md">
                        {this.mapPlanesToButtons()}
                        <Button onClick={() => this.props.dispatch(selectPlane())}
                                className={(this.props.selectedPlane === undefined) ? "active" : ""}>
                            Näytä kaikki
                        </Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>
        )
    }
}

export default connect((store) => {
    return {
        planes: store.planes.planes,
        selectedPlane: store.planes.selectedPlane,
    }
})(PlaneSelection)