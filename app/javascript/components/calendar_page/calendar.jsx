import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setCollapsed, fillForm } from '../../store/actions/reservationsActions';
import { selectTimeForNotifier } from "../../store/actions/notifiersActions";

import ReservationForm from "./reservation_form";

moment.locale("fi");

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

export class Calendar extends React.Component {
    selectTimeSlot(timeSlot) {
        if (this.props.notifierMode) {
            this.props.dispatch(selectTimeForNotifier(timeSlot));
        } else {
            this.props.dispatch(fillForm(timeSlot, this.props.reservations));
        }
    }

    isButtonDisabled() {
        return this.props.reservations.length !== 0 &&
            this.props.reservations[this.props.reservations.length-1].reservation_type === 'selected'
    }

    toggleCollapse() {
        return () =>
            this.props.dispatch(setCollapsed(this.props.collapsed));
    }


    // TODO: put this into it's own service/library function etc
    eventStyleGetter(event, start, end, isSelected) {
        var background,
            color = "#000000";
        switch (event.reservation_type) {
            case "selected": {
                background = "#ff0000";
                break;
            }
            case "observer": {
                background = "#00ff5f";
                break;
            }
            case "opetus": {
                background = "#ffe99a";
                break;
            }
            default:
                background = "#00eeee";
        }

        return ({
            style: {
                backgroundColor: background,
                color: color
            }
        })
    }

    render() {
        let initTime = new Date();
        initTime.setHours(8, 30);
        return (
            <div>
                <Row id="row-main">
                    <Col id="content" lg={this.props.collapsed ? 12 : 8} style={{margin: "auto", height: 40 + "vw"}}>
                        <BigCalendar
                            selectable
                            {...this.props}
                            events={this.props.reservations}
                            defaultView="week"
                            scrollToTime={initTime}
                            onSelectEvent={(event) => alert("Tehdään tähän vaikka modaali tai muu ikkuna joka kertoo kaikki tiedot", event)}
                            onSelectSlot={(timeSlot) => this.selectTimeSlot(timeSlot)}
                            views={["month", "week", "day", "agenda"]}
                            eventPropGetter={this.eventStyleGetter}
                            messages={{next: "seuraava", previous: "edellinen", today: "tämä päivä", month: "kuukausi", week: "viikko", day: "päivä", agenda: "varaukset"}}
                        />
                    </Col>
                    <Col id="sidebar" className={this.props.collapsed ? 'collapsed' : 'col-lg-4'}>
                        <ReservationForm />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <Button disabled={this.isButtonDisabled()} onClick={this.toggleCollapse()}>
                            {this.props.collapsed ? "Näytä varauksesi tiedot" : "Piilota varauksesi tiedot"}
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        collapsed: store.reservations.collapsed,
        reservations: store.reservations.reservations,
        resChange: store.reservations.resChange,
        notifierMode: store.notifiers.notifierMode,
    }
})(Calendar)