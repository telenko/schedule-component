import moment from 'moment';
export function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}
export function getStartWeek(by) {
    return moment(by).startOf('isoWeek').toDate();
}
export function getEndWeek(by) {
    return moment(by).endOf('isoWeek').toDate();
}
export function eventsFromRange(from, to, events) {
    return (events || []).filter(event => {
        return event.from >= from && event.to <= to;
    });
}
export function eventsFromDate(date, events) {
    return events.filter(event => {
        return event.from.getDay() === date.getDay();
    });
}
export function getTime(date) {
    return moment(date).format("HH:mm");
}
