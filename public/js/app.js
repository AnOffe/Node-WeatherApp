console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')

const search = document.querySelector('Input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm - addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)

    messageOne.textContent = 'Loading'

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.message || data.error) {
                messageOne.textContent = data.message + data.error
            } else {
                messageOne.textContent = 'Aktuelle Temperatur in ' + data.location + ' ist ' + data.temperature + ' Grad Celsius'
                messageTwo.textContent = 'Aktueller UV-Index ist ' + data.uvi
                console.log(data)
            }
        })
    })

})