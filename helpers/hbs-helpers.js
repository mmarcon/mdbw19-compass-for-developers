const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

module.exports = {
    truncateNumber: (number, f) => number.toFixed(f),
    toMonth: (number) => MONTHS[number - 1]
};