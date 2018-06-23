'use strict'
const axios = require('axios')
const token = require('../helpers/tokenContapyme')

module.exports = function (app) {
  app.get('/customers', (req, res) => {
    const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TCatTerceros/GetListaTerceros/';
    const urlData = JSON.stringify({
      datospagina: {
        cantidadregistros: 9999,
        pagina: 1,
      },
      camposderetorno: ['init', 'ntercero', 'napellido', 'ilistaprecios'],
      ordenarpor: { ntercero: 'asc' },
    });
    const URL = `${urlHttp}${urlData}/${token.hash}/2000`;
    axios.get(URL).then((response) => {
      let customers = response.data.result[0].respuesta.datos.map(customer => {
        return {
          name: `${customer.ntercero} ${customer.napellido}`,
          id_number: customer.init,
          type_price: customer.ilistaprecios
        }
      })
      res.send(customers)
    })
  })

  app.get('/customers/:code', (req, res) => {
    const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TCatTerceros/GetInfoTercero/';
    const urlData = JSON.stringify({
      init: req.params.code
    });
    const URL = `${urlHttp}${urlData}/${token.hash}/2000`;
    axios.get(URL).then((response) => {
      let customer = response.data.result[0].respuesta.datos.infobasica
      let newCustomer = {
        id_number: req.params.code,
        name: customer.ntercero || '',
        lastname: customer.napellido || '',
        phone_number: customer.tcelular || 0,
        city: customer.nmun || '',
        neighborhood: customer.sbarrio || '',
        address: customer.tdireccion || ''
      }
      res.send(newCustomer)
    })
  })
}
