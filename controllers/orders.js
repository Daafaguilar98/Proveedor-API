'use strict'
const axios = require('axios')
const token = require('../helpers/tokenContapyme')

module.exports = function (app) {
  app.get('/orders', (req, res) => {
    const URL = 'http://186.115.207.187:9000/datasnap/rest/TCatOperaciones/GetListaOperaciones/';
    const data = JSON.stringify({
      datospagina: {
        cantidadregistros: '20',
        pagina: '1',
      },
      camposderetorno: [
        'itdoper',
        'inumoper',
        'tdetalle',
        'fcreacion',
        'ncorto',
        'iestado',
        'ntdsop',
        'ntercero',
        'init',
        'iprocess',
        'fsoport',
        'snumsop',
        'qerror',
        'qwarning',
        'banulada',
        'mingresos',
        'megresos',
        'mtotaloperacion',
      ],
      ordenarpor: {
        fsoport: 'desc',
      },
      itdoper: [
        'ORD1',
      ],
    });
    const URLwithData = `${URL}${data}/${token.hash}/2000`;
    axios.get(URLwithData).then((response) => {
      let orders = response.data.result[0].respuesta.datos.map(order => {
        return {
          document_number: order.snumsop,
          date: order.fsoport,
          name: order.ntercero
        }
      });
      res.send(orders)
    });
  })
}
