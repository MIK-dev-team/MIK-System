import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setCollapsed, fillForm , setSidebarMod } from '../../store/actions/reservationsActions';
import { selectTimeForNotifier } from "../../store/actions/notifiersActions";
import { showModal } from '../../store/actions/singleReservationActions';
import { eventStyleGetter } from "../../services/functional_styling/calendar/eventStyling";
import FormNavigation from "./form_nav";

moment.locale("fi");

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

export class Calendar extends React.Component {
    selectTimeSlot(timeSlot) {
        if (this.props.notifierMode) {
            this.props.dispatch(selectTimeForNotifier(timeSlot, this.props.reservations));
        } else {
            this.props.dispatch(fillForm(timeSlot, this.props.reservations, this.props.sidebarMod));
        }
    }

    convertReservationsToCalendarEvents() {
        let i, newArray = [];
        for (i = 0; i < this.props.reservations.length; i++) {
            let res = this.props.reservations[i];
            newArray.push({
                id: res.id,
                title: res.reservation_type,
                start: moment(res.start).toDate(),
                end: moment(res.end).toDate(),
                reservation_type: res.reservation_type,
                additional_info: res.additional_info,
                user_id: res.user.id
            });
        }
        return newArray;
    }

    isButtonDisabled() {
        return !this.props.logged || (this.props.reservations.length !== 0 &&
            this.props.reservations[this.props.reservations.length-1].reservation_type === 'selected')
    }

    toggleCollapse() {
        return () =>
            this.props.dispatch(setCollapsed(this.props.collapsed));
    }

    toggleSidebarMod(eventKey) {
        if (this.props.sidebarMod && eventKey === 2) {
            this.props.dispatch(setSidebarMod(2));
        }
        if (!this.props.sidebarMod && eventKey === 1) {
            this.props.dispatch(setSidebarMod(1));
        }

    }

    render() {
        let initTime = moment();
        if (initTime.hours() < 9 || initTime.hours() > 21) {
            initTime.hours(7).minutes(30);
        } else {
            initTime.subtract(5, 'hours');
        }
        initTime = initTime.toDate();
        return (
            <div>
                <Row id="row-main">
                    <Col id="content" lg={this.props.collapsed ? 12 : 8} style={{margin: "auto", height: 40 + "vw"}}>
                        <BigCalendar
                            id="calendar"
                            selectable={this.props.logged ? true : false}
                            {...this.props}
                            events={this.convertReservationsToCalendarEvents()}
                            defaultView="week"
                            scrollToTime={initTime}
                            onSelectEvent={(event) => this.props.dispatch(showModal(event))}
                            onSelectSlot={(timeSlot) => this.selectTimeSlot(timeSlot)}
                            views={["month", "week", "day", "agenda"]}
                            eventPropGetter={eventStyleGetter}
                            messages={{next: "seuraava", previous: "edellinen", today: "tämä päivä", month: "kuukausi", week: "viikko", day: "päivä", agenda: "varaukset"}}
                        />
                    </Col>
                    <Col>
                        <FormNavigation/>
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
        logged: store.session.loggedIn,
        sidebarMod: store.reservations.sidebarMod,
    }
})(Calendar)
