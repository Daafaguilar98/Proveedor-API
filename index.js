const express = require('express')
const products = require('./controllers/products')
const contapyme = require('./controllers/contapyme')
const PORT = process.env.PORT || 5000
const app = express()

products(app)
contapyme(app)

app.get('/', (req, res) => {
  res.send('Proveedor Api')
})

app.listen(PORT, function () {
  console.log(`Making some pancakes on port ${PORT}`)
});
