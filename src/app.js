const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const hbs = require('hbs')
const path = require('path')
const express = require('express')

const port = process.env.PORT || 3000

const app = express()

// Define Path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wie ist heute das Wetter in ...',
        name: 'Andre Offermann'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Wie ist heute das Wetter in ...',
        name: 'Andre Offermann',
        message: 'Serverside Javascript mit HTTP-Requests und clientside Javascript mit DOM'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Wie ist heute das Wetter in ...',
        name: 'Andre Offermann',
        message: 'Eine kleine Beispielapplikation für node.js. Die Eingabe wird per HTTP-Request an openstreetmap geocodiert und dann wird mit diesen Koordinaten über ein HTTP-Request an openweathermap das aktuelle Wetter abgefragt ',
        message2: 'Verwendet werden Express, Handlebars und Request als Node Packages, Partials und Views',
        message3: 'Und ein paar CSS-Gimmicks'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Bitte eine gültige Adresse angeben'
        })
    }
    geocode(req.query.address, (error, message) => {
        if (error) {
            res.send(error)
        }
        else {
            forecast(message, (error, message) => {
                if (error) {
                    res.send(error)
                } else {
                    res.send({
                        temperature: message.Temperatur,
                        uvi: message.Uvi,
                        pressure: message.Pressure,
                        humidity: message.Humidity,
                        location: req.query.address
                    })
                }
            })
        }
    })
})


app.get('/relaxer', (req, res) => {
    res.render('relax', {
        
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weather App',
        name: 'Andre Offermann',
        message: 'Help article not found'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Weather App',
        name: 'Andre Offermann',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})