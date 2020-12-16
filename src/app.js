const express = require('express')
const hbs = require('hbs')
const path = require('path')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const PORT = process.env.PORT || 3000

//Define paths for Express config
const staticFolder = path.join(__dirname, '../public') 
const viewsLocation = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsLocation)
hbs.registerPartials(partialsPath)

console.log(__dirname)

//Setup static directory to server
app.use(express.static(staticFolder))

//Setup reoutes to server
app.get('',(req,res)=>{

    res.render('index',{

        title: 'Weather app',
        name: 'Facundo Veronelli'

    })

})

app.get('/about',(req,res)=>{

    res.render('about',{

            title: 'About',
            name: 'Facundo Veronelli'
    })

})
app.get('/help',(req,res)=>{

    res.render('help',{

        title:'Help',
        description: "It's a description",
        name: 'Facundo Veronelli'
        
    })

})

app.get('/help/*',(req,res)=>{

    res.render('error',{

        title: 'Error',
        errorMessage: 'Help article not found',
        name: 'Facundo Veronelli'

    })

})
// app.get('*', (req, res)=>{
//     res.render('error',{

//         title:'Error',
//         errorMessage: 'Page not found',
//         name: 'Facundo Veronelli'

//     })
// })

app.get('/weather',(req,res)=>{

    if(!req.query.address){

        return res.send({

            error: 'the address is needed'

        })

    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{

        if(error){

            return console.log(error)
        
        }
        forecast(latitude,longitude,(erro,forecastData)=>{


            if(error){

                return console.log(error)

            }
            res.send({

                message: 'The address was found successfully',
                address: location,
                longitude,
                latitude,
                forecastData
        
            })

        })

    })

})

app.get('/products',(req,res)=>{

    if(!req.query.search){

        return res.send({

            error:'You must provide a search term'

        })

    }

    console.log(req.query.search)

    res.send({

        products: []

    })

})

app.get('/help',(req,res)=>{

    res.render('help',{

        title:'Help',
        description: "It's a description",
        name: 'Facundo Veronelli'
        
    })

})


app.listen(PORT,()=>{

    console.log('Server is up on port: ', PORT)

})