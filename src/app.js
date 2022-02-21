const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 9000

//This is the definition paths for express config
const mainPage = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static direcotry to serve
app.use(express.static(mainPage))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Tokio',
        footer: 'Created by '
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: "About",
        name: "Tokio I",
        footer: "Created by "
    })
})

//Problem was to need to change "Send" -> "Render"
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "Hello, what can I do for you?",
        footer: "Created by " 
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.render('error', {
            title: "Error",
            text: "Invalid Request. You must type address"
        })
            
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error){
            return res.send ({error})
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if (error){
                return res.send({error})
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address,
            })
        })
    })
    // res.render('weather', {
    //     location: req.query.address,
    //     forecast: "forecast",
    //     address: req.query.address
    // })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send("You must provide a query.");
    }    
    res.send({
        product: [],

    })
})


app.get('/help/*', (req, res) =>{
    res.render('error', {
        title: "Help article not found",
        text: "Not Found - 404",
        footer: "Created by "

    })
})


app.get('*', (req, res) =>{
    res.render('error', {
        title: "Error",
        text: "Not Found - 404"
    })
})

app.listen(port , () =>{
    console.log("Server is up on port " + port + ".");
})

// const weatherForm = document.querySelector('form')
// const search = document.querySelector('input')

// weatherForm.addEventListener('submit', (e) =>{
//     e.preventDefault()
//     const location = search.value

//     console.log(location);
// })