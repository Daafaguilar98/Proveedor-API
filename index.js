  // Dependencies
const express = require('express')
// const products = require('./controllers/products')
// const customers = require('./controllers/customers')
// const orders = require('./controllers/orders')
// const contapyme = require('./controllers/contapyme')

const app = express()

// products(app)
// customers(app)
// orders(app)

app.get('/', (req, res) => {
  res.send('Proveedor Api')
})
// contapyme.GetProducts()

app.listen(3000, function () {
  console.log('Making some pancakes on port 3000')
});
