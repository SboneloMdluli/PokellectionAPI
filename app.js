const express = require('express')
const app = express()
const cors = require('cors')

const admin = require('firebase-admin')

const serviceAccount = require('./pokemoncards-2f39c-firebase-adminsdk-z789a-558ec3f485.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pokemoncards-2f39c-default-rtdb.firebaseio.com'
})

const db = admin.database()

const corsOptions = {
  origin: 'https://pokemoncards-2f39c.web.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/cards/:name', cors(corsOptions), (req, res) => {
  const ref = db.ref(req.params.name)
  ref.on('value', (snapshot) => {
    res.send(snapshot.val())
  }, (errorObject) => {
    res.send(errorObject)
  })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('running on port', port)
})
