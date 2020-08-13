const request = require('request')

const forecast = ({lat, lon}, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lon) + '&exclude=hourly,daily&appid=4f688459d7248687e8d1f8f9b17ee0e4&units=metric'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Keine Verbindung zur Wettervorhersage', undefined)
        } else if (response.body.cod) {
            callback(response.body.message, undefined)
        } else {

            const temperatur = response.body.current.temp
            const uvi = response.body.current.uvi
            const pressure = response.body.current.pressure
            const humidity = response.body.current.humidity

            callback(undefined, {
                Temperatur: temperatur,
                Uvi: uvi,
                Pressure: pressure,
                Humidity: humidity
            })
        }
    })
}

module.exports = forecast