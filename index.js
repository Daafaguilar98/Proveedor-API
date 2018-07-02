const express = require('express')
const products = require('./controllers/products')
const customers = require('./controllers/customers')
const orders = require('./controllers/orders')
const contapyme = require('./controllers/contapyme')
const auth = require('./controllers/auth')
const PORT = process.env.PORT || 5000
const app = express()

products(app)
customers(app)
orders(app)
contapyme(app)
auth(app)

app.get('/', (req, res) => {
  res.send('Proveedor Api')
})

app.listen(PORT, function () {
  console.log(`Making some pancakes on port ${PORT}`)
});
