[{
    $addFields: {
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
        d_hour: 10,
        d_day: 19,
        d_month: 6
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