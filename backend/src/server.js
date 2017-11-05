const express = require('express')
const db = require('./db')
const weather = require('./weather')
const hashwords = require('hashwords')

const hw = hashwords()
const app = express()

app.get('/location-key', async function (req, res) {
  const lat = req.query.lat
  const long = req.query.long
  let results = await weather.getLocation(lat, long)
  console.log(results)
  res.send('Good')
})

app.post('/create-event', (req, res) => {
  console.log("Creating Event..." + req.query)
  url = hw.random()
  //db.createEvent(req.body, url)
  res.send(url)
})
// you got this, dont give up u r the bestest
app.listen(6942, () => console.log('App listening on port 3000.'))
