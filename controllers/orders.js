'use strict'
const axios = require('axios')
const token = require('../helpers/tokenContapyme')

const date = () => {
  const dateObj = new Date();
  const day = `0${dateObj.getDate()}`.slice(-2);
  const month = `0${dateObj.getUTCMonth() + 1}`.slice(-2); // months from 1-12
  const year = dateObj.getUTCFullYear();

  return `${month}-${day}-${year}`;
};

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

  // CREATE ORDER
  app.post('/order', (req, res) => {
    const URL = 'http://186.115.207.187:9000/datasnap/rest/TCatOperaciones/DoExecuteOprAction/';
    const data = JSON.stringify({
      accion: 'CREATE',
      operaciones: [
        {
          itdoper: 'ORD1',
        },
      ],
      oprdata: {
        datosprincipales: {
          init: req.body.customer.id_number.toString(), // Identificacion del cliente
          initvendedor: req.body.seller, // Identificacion del vendedor
          iinventario: '1',
          finicio: date(), // Fecha en que se empieza a preparar el pedido
          qdias: '1', // Dias habiles de entrega
          ilistaprecios: req.body.customer.type_price.toString(), // Lista de precios
          sobservenc: '', // Observaciones del pedido
          bregvrunit: 'F', // Es posible registrar los precios de los elementos
          qporcdescuento: '0', // Porcentaje de descuento
          bregvrtotal: 'F', // Es posible registrar el total de todos los elementos
          frmenvio: '0', // Forma de envio
          frmpago: '1', // Forma de pago
          condicion1: '1', // Condicion
          blistaconiva: 'T', // Es con iva
          busarotramoneda: 'F', // Se utilizo otro tipo de moneda
          imonedaimpresion: '', // Codigo de la moneda que se imprime el pedido
          mtasacambio: '0', // Tasa de cambio
          ireferencia: '', // Número del documento referencia usado en el pedido
          bcerrarref: 'F', // Referencia cerrada?
          itdprintobs: '-1', // Codigo de la sucursal del cliente
          icontactocliente: '0',
        },
        encabezado: {
          iemp: '1', // Código de la empresa a la cual pertenece la operación.
          itdsop: '420', // Tipo de documento de soporte de la operación.
          fsoport: date(), // Fecha de soporte de la operación.
          iclasifop: '1', // Código de la clase de operación especificada para la operación
          imoneda: '10',
          iprocess: '1', // El estado de procesamiento 0, 1, 2
          banulada: 'F', // Esta anulada
          inumsop: '0', // Numero de documento
          snumsop: '<AUTO>', // Numero de documento segun la mascara
          tdetalle: 'Hecha desde la app el proveedor', // Descripcion de la operacion
        },
        liquidacion: {
          parcial: '0',
          iva: '0',
          total: '0',
        },
        listaproductos: req.body.products.map(product => {
          return {
            iinventario: '1',
            irecurso: product.code,
            itiporec: "",
            qrecurso: product.quantity,
            mprecio: product.price.toString(),
            qporcdescuento: 0,
            qporciva: "0",
            mvrtotal: (product.quantity*product.price).toString(),
            sobserv: "",
          }
        }),
      },
    });
    const URLwithData = `${URL}${data}/${token.hash}/2000`;
    axios.get(URLwithData).then((response) => {
      res.send(response.data)
    });
  })

}
