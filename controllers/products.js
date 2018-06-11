'use strict'
const axios = require('axios')
const token = require('../helpers/tokenContapyme')

module.exports = function (app) {
  const db = require('../helpers/db')
  const bodyParser = require('body-parser');

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  const productsRef = db.collection('products').orderBy('code');
  let lastProduct = ''

  app.get('/products', (req, res) => {
    let per = parseInt(req.query.per) || 20
    if(!req.query.first) {
      productsRef.startAfter(lastProduct)
      .limit(per)
      .get()
      .then(snapshot => {
        let products = []
        if(snapshot.docs.length) {
          snapshot.forEach(doc => {
            let product = doc.data()
            product.photo_url = `http://186.115.207.187:9000/datasnap/rest/TCatElemInv/GetFotoElemInv/{"irecurso":${product.code},"codimg":"1"}/${token.hash}/2000`
            products.push(product)
          });
          lastProduct = snapshot.docs[snapshot.docs.length - 1].data().code
        }
        if(products.length) {
          res.send({
            result: true,
            products
          })
        }else {
          res.send({
            result: false,
            products
          })
        }
      })
    } else {
      productsRef.limit(per)
      .get()
      .then(snapshot => {
        let products = []
        snapshot.forEach(doc => {
          let product = doc.data()
          product.photo_url = `http://186.115.207.187:9000/datasnap/rest/TCatElemInv/GetFotoElemInv/{"irecurso":${product.code},"codimg":"1"}/${token.hash}/2000`
          products.push(product)
        });
        lastProduct = snapshot.docs[snapshot.docs.length - 1].data().code
        res.send(products)
      })
    }
  })

  app.get('/products/:id', (req, res) => {
    const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TCatElemInv/GetInfoElemInv/';
    const urlData = JSON.stringify({
      irecurso: req.params.id
    });
    const URL = `${urlHttp}${urlData}/${token.hash}/2000`;
    axios.get(URL).then((response) => {
      res.send(response.data.result[0].respuesta.datos)
    })
  })

  app.post('/products/quantity', (req, res) => {
    const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TInventarios/GetSaldoFisicoProductoEnBodegas/'
    const urlData = JSON.stringify({
      irecurso: req.body.code
    })
    const urlSecurity = `/${token.hash}/2000/`
    const URL = `${urlHttp}${urlData}${urlSecurity}`;
    axios.get(URL).then((response) => {
      let result = {
        quantity: 0
      }
      if (response.data.result[0].respuesta.datos[0]) {
        result.quantity = response.data.result[0].respuesta.datos[0].qproducto
      }
      res.send(result)
    });
  })
}
