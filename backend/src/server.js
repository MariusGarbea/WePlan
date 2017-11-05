const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const weather = require('./weather')
const findIntervals = require('./findIntervals')
const util = require('./util')
const hashwords = require('hashwords')
const blocks = require('./blockchain/block')

const hw = hashwords()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.post('/create-event', async function (req, res) {
  console.log("Creating Event...")
  console.log(req.body)
  locationCode = await weather.getLocation(req.body.venue)
  let noLocation = false
  if(locationCode == -1){
    useLocation = true
  }
  let intervals = await findIntervals.findForecastIntervals({
    "start": new Date(req.body.startDate),
    "end": new Date(req.body.endDate),
    "duration": util.convertDuration(req.body.duration, req.body.unit),
    "weather": req.body.weather
  }, locationCode, noLocation)
  url = hw.random().join("")
  url = "http://localhost:3000/Vote/"+url
  let myEvent = req.body
  myEvent['intervals'] = intervals
  await db.createEvent(req.body, url)
  res.send({"url": url, "intervals": intervals})
})

app.post('/vote', async function(req, res) {
  if(req.body.selectionID == -1){
    res.send(403)
  }
  console.log(req.body)
  let document = await db.getEventByURL(req.body.eventID)
  await db.updateEvent(document, {
    timestamp: new Date(),
    vote: req.body.selection,
    voteIndex: req.body.selectionID
  })
  res.sendStatus(200)
})

app.get('/event-details/:url', async function(req, res) {
  let doc = await db.getEventByURL(req.params.url)
  res.send(doc)
})
app.get('/blockchain', async function(req, res) {
  let data = await db.getAllBlocks()
  res.send(data);
})
app.get('/vote/:url/results', async function(req, res){
  let doc = await db.getEventByURL(req.params.url)
  votes = doc.votes
  var results = new Map()
  for(let i = 0; i < votes.length; i++){
    if(results.has(votes[i].voteIndex)){
      let x = results.get(votes[i].voteIndex)
      x.tally += 1
      results.set(votes[i].voteIndex, x)
    }
    else{
      results.set(votes[i].voteIndex, {votes[i].vote, tally: 1})
    }
  }
  res.send(results)
})
// you got this, dont give up u r the bestest
app.listen(6942, () => console.log('App listening on port 3000.'))
