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
    toMonth: (number) => MONTHS[number - 1],
    toOrdinal: (number) => `${number}${['st', 'nd', 'rd'][((number + 90) % 100 - 10) % 10 - 1] || 'th'}`,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2
};