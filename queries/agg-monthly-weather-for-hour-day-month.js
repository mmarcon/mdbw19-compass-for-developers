module.exports = (hour, day, month) => [{
    $addFields: {
        datetime_formatted: {
            $toDate: '$datetime_formatted'
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
            $month: '$datetime_formatted'
        },
        d_day: {
            $dayOfMonth: '$datetime_formatted'
        },
        d_hour: {
            $hour: '$datetime_formatted'
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
}]