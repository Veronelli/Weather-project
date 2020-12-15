const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e9f04e54fbbc923c53621ec6e6d4c376&query=${longitude},${latitude}`

    request({ url: url, json: true }, (error, response) => {
        console.log(latitude,longitude)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.success = false) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.temperature)
        }
    })
}

module.exports = forecast