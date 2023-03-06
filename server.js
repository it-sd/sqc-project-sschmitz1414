require('dotenv').config() // Read environment variables from .env
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5163

express()
  .use(express.static(path.join(__dirname, 'static')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function (req, res) {
    res.render('pages/index')
  })
  .get('/health', (req, res) => {
    res.status(200).send('healthy')
  })
  .get('/about', function (req, res) {
    res.render('pages/about')
  })

  

  // end of implementation ///////////////////////////////////
  .listen(PORT, () => console.log(`Listening on ${PORT}`))