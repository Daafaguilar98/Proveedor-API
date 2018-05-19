const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Proveedor Api')
})

app.listen(3000, function () {
  console.log('Making some pancakes on port 3000')
});
