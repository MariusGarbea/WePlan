const mongoose = require('mongoose')

const connectionString = 'mongodb://127.0.0.1:27017/MyDb'
mongoose.connect(connectionString, {
  useMongoClient: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

var Event = new Schema({
  url: String,
  name: String,
  type: String,
  venue: String,
  activity: [String],
  weather: String,
  startDate: Date,
  endDate: Date,
  duration: Number,
  unit: String,
  emails: [String],
  intervals: Object
})

var EventModel = mongoose.model('Event', Event)

async function createEvent (eventQuery, hashurl) {
  var event = new EventModel({
    url: hashurl,
    name: eventQuery.name,
    type: eventQuery.type,
    venue: eventQuery.venue,
    activities: eventQuery.activities,
    weather: eventQuery.weather,
    startDate: eventQuery.startDate,
    endDate: eventQuery.endDate,
    duration: eventQuery.duration,
    unit: eventQuery.unit,
    emails: eventQuery.emails,
    intervals: eventQuery.intervals
  })
  event.save(function(e){
    if(e){
      console.log(e)
    }
    console.log(event)
    console.log("Event Stored!")
  })

  //await event.save()
}

function getEventByURL(URL){

}

module.exports = {createEvent, getEventByURL}
