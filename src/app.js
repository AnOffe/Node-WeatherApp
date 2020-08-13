const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const hbs = require('hbs')
const path = require('path')
const express = require('express')

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
        title: 'Weather App',
        name: 'Andre Offermann'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Andre Offermann'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        name: 'Andre Offermann',
        message: 'Help message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
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
                        temperature: message.Temperatur ,
                        uvi: message.Uvi,
                        location: req.query.address
                    })                       
                }
                //console.log(message.location)
            })
        }
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        product: []
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

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})