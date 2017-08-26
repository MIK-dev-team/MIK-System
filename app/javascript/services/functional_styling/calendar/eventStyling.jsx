/**
 * Created by owlaukka on 24/08/17.
 */
import EventTypeToColor from './eventStyles';

export function eventStyleGetter(event, start, end, isSelected) {
    let backgroundColor = "#00eeee8C";
    if (EventTypeToColor[event.reservation_type]) {
        backgroundColor = EventTypeToColor[event.reservation_type];
    }
    return ({
        style: {
            backgroundColor: backgroundColor,
            color: "#000000CC",
        }
    });
}
