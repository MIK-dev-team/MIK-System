import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Row, Col, Button } from 'react-bootstrap';
import ReservationForm from "./reservation_form";

moment.locale("fi");

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);


export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        // TODO: varausten haku muutetaan ehkä siten, että varaukset tyhjäksi tässä ja sitten kutsutaan hakumetodi, joka päivittää tilan
        this.state = {
            reservations: this.fetchReservations(),
            timeSlot: {
                start: "",
                end: ""
            },
            collapsed: true
        };

        this.fillForm = this.fillForm.bind(this);
        this.setCollapsed = this.setCollapsed.bind(this);
    }

    fetchReservations() {
        // MYÖHEMMIN TÄMÄ PALVELIMELTA JA JSON MUODOSSA
        var reservations = [
            {
                'title': 'All Day Event',
                'allDay': true,
                'start': new Date(2017, 5, 0),
                'end': new Date(2017, 5, 1)
            },
            {
                'title': 'Long Event',
                'start': new Date(2017, 5, 7),
                'end': new Date(2017, 5, 10),
                type: 'opetus'
            },

            {
                'title': 'DTS STARTS',
                'start': new Date(2017, 5, 13, 0, 0, 0),
                'end': new Date(2017, 5, 20, 0, 0, 0)
            },

            {
                'title': 'DTS ENDS',
                'start': new Date(2017, 5, 6, 0, 0, 0),
                'end': new Date(2017, 5, 13, 0, 0, 0)
            },

            {
                'title': 'Some Event',
                'start': new Date(2017, 5, 9, 0, 0, 0),
                'end': new Date(2017, 5, 9, 0, 0, 0),
                type: 'opetus'
            },
            {
                'title': 'Conference',
                'start': new Date(2017, 3, 11),
                'end': new Date(2017, 3, 13),
                desc: 'Big conference for important people'
            },
            {
                'title': 'Meeting',
                'start': new Date(2017, 5, 12, 10, 30, 0, 0),
                'end': new Date(2017, 5, 12, 12, 30, 0, 0),
                desc: 'Pre-meeting meeting, to prepare for the meeting'
            },
            {
                'title': 'Lunch',
                'start':new Date(2017, 5, 12, 12, 0, 0, 0),
                'end': new Date(2017, 5, 12, 13, 0, 0, 0),
                desc: 'Power lunch'
            },
            {
                'title': 'Meeting',
                'start':new Date(2017, 5, 12,14, 0, 0, 0),
                'end': new Date(2017, 5, 12,15, 0, 0, 0)
            },
            {
                'title': 'Happy Hour',
                'start':new Date(2017, 5, 12, 17, 0, 0, 0),
                'end': new Date(2017, 5, 12, 17, 30, 0, 0),
                desc: 'Most important meal of the day',
                type: 'opetus'
            },
            {
                'title': 'Dinner',
                'start':new Date(2017, 3, 12, 20, 0, 0, 0),
                'end': new Date(2017, 3, 12, 21, 0, 0, 0)
            },
            {
                'title': 'Birthday Party',
                'start':new Date(2017, 3, 13, 7, 0, 0),
                'end': new Date(2017, 3, 13, 10, 30, 0)
            }
        ]
        return (reservations);
    }

    eventStyleGetter(event, start, end, isSelected) {
        var background,
            color = "#000000";
        if (event.type === "opetus")
            background = "#ffe99a";
        else if (event.type === "selected")
            background = "#ff0000";
        else
            background = "#00eeee";

        return ({
            style: {
                backgroundColor: background,
                color: color
            }
        })
    }

    fillForm(timeSlot) {
        if (this.state.reservations[this.state.reservations.length - 1].type === 'selected')
            this.state.reservations.pop();

        for (let res of this.state.reservations) {
            if ((res.start - timeSlot.start < 0 && res.end - timeSlot.start > 0) ||
                (res.start - timeSlot.end < 0 && res.end - timeSlot.end > 0)) {
                alert("Et voi varata jo varattua aikaa");
                return;
            }
        }

        this.state.reservations.push({
            'title': '<valittu aika>',
            'start': timeSlot.start,
            'end': timeSlot.end,
            type: 'selected'
        });

        this.setState({
            timeSlot: {
                start: moment(timeSlot.start).format(),
                end: moment(timeSlot.end).format()
            },
            collapsed: false
        });
    }

    setCollapsed() {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed
        }))
    }

    render() {
        return (
            <div>
                <Row id="row-main">
                    <Col id="content" lg={this.state.collapsed ? 12 : 8} style={{margin: "auto", height: 40 + "vw"}}>
                        <BigCalendar
                            selectable
                            {...this.props}
                            events={this.state.reservations}
                            defaultView="week"
                            onSelectEvent={() => alert("Tehdään tähän vaikka modaali tai muu ikkuna joka kertoo kaikki tiedot")}
                            onSelectSlot={this.fillForm}
                            views={["week", "day", "agenda"]}
                            eventPropGetter={this.eventStyleGetter}
                            messages={{next: "seuraava", previous: "edellinen", today: "tämä päivä", week: "viikko", day: "päivä", agenda: "varaukset"}}
                        />
                    </Col>
                    <Col id="sidebar" className={this.state.collapsed ? 'collapsed' : 'col-lg-4'}>
                        <ReservationForm timeSlot={this.state.timeSlot} plane={this.props.plane} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <Button disabled={this.state.reservations[this.state.reservations.length-1].type === 'pending'} onClick={this.setCollapsed}>
                            {this.state.collapsed ? "Näytä varauksesi tiedot" : "Piilota varauksesi tiedot"}
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}