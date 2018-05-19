const axios = require('axios')
const db = require('../helpers/db')

const GetProducts = () => {
  const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TCatElemInv/GetListaElemInv/';
  const urlData = JSON.stringify({
    datospagina: {
      cantidadregistros: 1000,
      pagina: 1,
    },
    camposderetorno: ['irecurso', 'nrecurso'],
    ilistapreciosdef: 3,
    ordenarpor: { irecurso: 'asc' },
  });
  const urlSecurity = '/21B1CB1A1F/2000/'
  const URL = `${urlHttp}${urlData}${urlSecurity}`;

  axios.get(URL).then((response) => {
    SaveProducts(response.data.result[0].respuesta.datos)
  }).catch((error) => {
    console.log('Error')
  })
}

const SaveProducts = (products) => {
  products.forEach(product => {
    db.collection('products').doc(product.irecurso).set({
      code: product.irecurso,
      name: product.nrecurso,
    });
  })
}
module.exports = {
  GetProducts
}
