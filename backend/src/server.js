const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const weather = require('./weather')
const findIntervals = require('./findIntervals')
const util = require('./util')
const hashwords = require('hashwords')


const hw = hashwords()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/location-key', async function (req, res) {
  const lat = req.query.lat
  const long = req.query.long
  let results = await weather.getLocation(lat, long)
  console.log(results)
  res.send('Good')
})

app.post('/create-event', async function (req, res) {
  console.log("Creating Event...")
  console.log(req.body)
  locationCode = "311351"//weather.getLocation()
  let intervals = await findIntervals.findForecastIntervals({
    "start": new Date(req.body.startDate),
    "end": new Date(req.body.endDate),
    "duration": util.convertDuration(req.body.duration, req.body.unit),
    "weather": req.body.weather
  }, locationCode)
  url = hw.random().join("")
  url = "http://localhost:3000/Vote/"+url
  let myEvent = req.body
  myEvent['intervals'] = intervals
  await db.createEvent(req.body, url)
  res.send({"url": url, "intervals": intervals})
})
app.get('/event-details/:url', async function(req, res) {
  console.log(req.params.url)
  let doc = await db.getEventByURL(req.params.url)
  res.send(doc)
})
// you got this, dont give up u r the bestest
app.listen(6942, () => console.log('App listening on port 3000.'))
