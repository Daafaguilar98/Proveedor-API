const schedule = require('node-schedule')
const axios = require('axios')

const job = schedule.scheduleJob('0-59/20 * * * * *', function(){
  const urlHttp = 'http://186.115.207.187:9000/datasnap/rest/TCatElemInv/GetListaElemInv/';
  const urlData = JSON.stringify({
    datospagina: {
      cantidadregistros: 1000,
      pagina: 1,
    },
    camposderetorno: ['irecurso', 'nrecurso'],
    ilistapreciosdef: '3',
    ordenarpor: { irecurso: 'asc' },
  });
  const URL = `${urlHttp}${urlData}/2706387440/2000`
  axios.get(URL).then((response) => {
    console.log(response.data.result[0].respuesta)
  })
});

module.exports = job
