module.exports = (hour, day, month) => [{
    $match: {
        city: 'New York City'
    }
}, {
    $addFields: {
        datetime: {
            $toDate: '$datetime'
        },
        temperature_c: {
            $subtract: [
                '$temperature_k',
                273.15
            ]
        },
        temperature_f: {
            $add: [{
                    $multiply: [{
                            $subtract: [
                                '$temperature_k',
                                273.15
                            ]
                        },
                        1.8
                    ]
                },
                32
            ]
        }
    }
}, {
    $addFields: {
        d_month: {
            $month: '$datetime'
        },
        d_day: {
            $dayOfMonth: '$datetime'
        },
        d_hour: {
            $hour: '$datetime'
        }
    }
}, {
    $match: {
        d_hour: hour,
        d_day: day,
        d_month: month
    }
}, {
    $group: {
        _id: {
            'd_month': '$d_month',
            'd_day': '$d_day',
            'd_hour': '$d_hour'
        },
        avg_temperature_c: {
            $avg: '$temperature_c'
        },
        avg_temperature_f: {
            $avg: '$temperature_f'
        },
        avg_humidity: {
            $avg: '$humidity'
        }
    }
}];