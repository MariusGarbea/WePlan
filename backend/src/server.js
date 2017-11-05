const express = require('express')
const db = require('./db')
const weather = require('./weather')

const app = express()

app.get('/location-key', async function (req, res) {
  const lat = req.query.lat
  const long = req.query.long
  let results = await weather.getLocation(lat, long)
  console.log(results)
  res.send('Good')
})

app.post('/create-event', (req, res) => {
  db.createEvent(req)
})
// you got this, dont give up u r the bestest
app.listen(3000, () => console.log('App listening on port 3000.'))
