import moment from 'moment';

export const normalizeTimePicker = value => (value, previousValue) =>
    moment(previousValue).startOf('day').add(value, 'seconds').format();

export const normalizeDatePicker = value => (value, previousValue) => {
    const timeInSeconds = moment.duration(moment(previousValue).format('HH:mm')).asSeconds();
    return moment(value).startOf('day').add(timeInSeconds, 'seconds').format();
};