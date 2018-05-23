'use strict'
const axios = require('axios')
const token = require('../helpers/tokenContapyme')
module.exports = function (app) {

  app.get('/contapyme/sync', (req, res) => {
    const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TBasicoGeneral/GetAuth/'
    const urlData = JSON.stringify({"email":"ventas@elproveedor.com.co","password":"db7068a18fbc5a91dac038c5816d11ce"})
    const urlToken = '//2000'
    const url = `${urlHttp}${urlData}${urlToken}`
    axios.get(url)
      .then(response => {
        if (response.data.result[0].encabezado.resultado) {
          token.hash = response.data.result[0].respuesta.datos.keyagente
          res.send({ sync: true, data: response.data.result[0] })
        } else {
          res.send({ sync: false })
        }
      }).catch((error) => {
        res.send({ sync: false })
      })
  })

}
