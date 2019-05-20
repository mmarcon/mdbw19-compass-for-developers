[{
    $match: {
        city: 'New York City'
    }
}, {
    '$addFields': {
        'datetime': {
            '$toDate': '$datetime'
        },
        'temperature_c': {
            '$subtract': [
                '$temperature_k', 273.15
            ]
        },
        'temperature_f': {
            '$add': [{
                '$multiply': [{
                    '$subtract': [
                        '$temperature_k', 273.15
                    ]
                }, 1.8]
            }, 32]
        }
    }
}, {
    '$addFields': {
        'd_month': {
            '$month': '$datetime'
        }
    }
}, {
    '$group': {
        '_id': '$d_month',
        'avg_temperature_c': {
            '$avg': '$temperature_c'
        },
        'avg_temperature_f': {
            '$avg': '$temperature_f'
        },
        'avg_humidity': {
            '$avg': '$humidity'
        }
    }
}, {
    '$sort': {
        '_id': 1
    }
}]