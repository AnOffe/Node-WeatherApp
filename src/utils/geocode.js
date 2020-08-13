const request = require('request')

const geocode = (address, callback) => {
    const options = {
      url: 'https://nominatim.openstreetmap.org/?addressdetails=1&q=' + encodeURIComponent(address) + '&format=json&limit=1',
      headers: {
        'User-Agent': 'request'
      },
      json: true
    }
  
    request(options, (error, response) => {
      if (error) {
        callback('Keine Verbindung zum Geocoding', undefined)
      } else if (!response.body[0]) {
        callback({ message: 'Fehler in Ortsangabe'}, undefined)
      } else {
        callback(undefined, {
          lon: response.body[0].lon,
          lat: response.body[0].lat,
          location: response.body[0].display_name
        })
      }
    })
  
  }

  module.exports = geocode