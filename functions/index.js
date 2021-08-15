const express = require('express')
const app = express()
const cors = require('cors')
const functions = require('firebase-functions')

const admin = require('firebase-admin')

const serviceAccount = {
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pokemoncards-2f39c-default-rtdb.firebaseio.com'
})

const db = admin.database()

app.use(cors({ origin: true }))

app.get('/cards/:name', (req, res) => {
  const ref = db.ref(req.params.name)
  ref.on('value', (snapshot) => {
    const name = snapshot.val()
    res.send({ name })
  }, (errorObject) => {
    res.send(errorObject)
  })
})

exports.pokemon = functions.https.onRequest(app)
