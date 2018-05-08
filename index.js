  // Dependencies
  const express = require('express')
  // const contapyme = require('./src/contapyme')
  const bodyParser = require('body-parser');

  // App definition
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  const api = express.Router()

  app.post('/api/order', (req, res) => {
    let {code, name, price1, quantity} = req.body
    res.send(`el codigo es ${code} y el nombre ${name}`)
  })

  // app.listen(3000, function () {
  //     console.log('Making some pancakes on port 3000')
  // });
