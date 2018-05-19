const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()

app.get('/', (req, res) => {
  res.send('Proveedor Api')
})

app.listen(PORT, function () {
  console.log(`Making some pancakes on port ${PORT}`)
});
