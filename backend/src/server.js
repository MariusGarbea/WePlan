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

app.post('/create-event', async function (req, res) {
  console.log("Creating Event...")
  console.log(req.query)
  url = hw.random()
  //await db.createEvent(req.body, url)
  res.send(url)
})
app.get('/event-details/{url}', async function(req, res) {
  //await db.findEvent(url)
  res.send()
})
// you got this, dont give up u r the bestest
app.listen(6942, () => console.log('App listening on port 3000.'))
