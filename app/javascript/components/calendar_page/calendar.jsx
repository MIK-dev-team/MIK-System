import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { Grid } from 'react-bootstrap';

moment.locale("fi");

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])


export default class Calendar extends React.Component {
    render() {
        return (
            <div style={{margin: "auto", height: 50 + "vw"}}>
                <BigCalendar
                    selectable
                    {...this.props}
                    events={[]}
                    defaultView="week"
                    onSelectEvent={event => alert("TODO: Pop-up")}
                    onSelectSlot={(slotInfo) => alert(
                        `valittu aikaväli: \n\nalku: ${slotInfo.start.toLocaleString()} ` +
                        `\nloppu: ${slotInfo.end.toLocaleString()}`
                    )}
                    views={allViews}
                />
            </div>
        )
    }
}