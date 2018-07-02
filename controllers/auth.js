const db = require('../helpers/db');
const bodyParser = require('body-parser');

module.exports = (app) => {

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.post('/auth/login', (req, res) => {
    const { phone = '', password = '' } = req.body
    const docRef = db.firestore().collection("sellers").doc(phone)

    docRef.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().password === password) {
          res.send({ auth: true, data: doc.data()})
        } else {
          res.send({ auth: false, message: 'Celular o contraseña incorrectos'})
        }
      } else {
          res.send({ auth: false, message: 'Celular o contraseña incorrectos' });
      }
    }).catch(function(error) {
      res.send("Error getting document:", error);
    });

  })
}
