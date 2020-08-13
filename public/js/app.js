console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')

const search = document.querySelector('Input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm - addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    const url = '/weather?address=' + encodeURIComponent(location)

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error 
            } else if (data.message) {
                messageOne.textContent = data.message
            } else {
                messageOne.textContent = 'Temperatur in ' + data.location + ' ist ' + data.temperature + ' Grad Celsius'
                messageTwo.textContent = 'UV-Index ist ' + data.uvi
                messageThree.textContent = 'Luftfeuchte ist ' + data.humidity + ' %'
                messageFour.textContent = 'Luftdruck ist ' + data.pressure + ' mBar'
            }
        })
    })

})