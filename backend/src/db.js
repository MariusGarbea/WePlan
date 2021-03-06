const mongoose = require('mongoose')

mongoose.Promise = Promise

const connectionString = 'mongodb://127.0.0.1:27017/MyDb'
mongoose.connect(connectionString, {
  useMongoClient: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

var Vote = new Schema({
  voteIndex: Number,
  vote: String,
  timestamp: Date
})

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
  intervals: Object,
  expiryDate: Date,
  votes: [Vote]
})

var Block = new Schema({
  eventID: String,
  timestamp: Date,
  votes: [Vote]
})

var EventModel = mongoose.model('Event', Event)
var BlockModel = mongoose.model('Block', Block)

async function pushBlock(eventID, votes) {
  var block = new BlockModel({
    eventID: eventID,
    votes: votes,
    timestamp: new Date()
  })
  return await block.save()
}

async function getAllBlocks() {
  return await BlockModel.find({})
}

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
    intervals: eventQuery.intervals,
    expiryDate: new Date(new Date().getTime() + 2 * 60 * 1000),
    votes: []
  })
  event.save(function(e){
    if(e){
      console.log(e)
    }
    console.log(event)
    console.log("Event Stored!")
  })
  await event.save()
}

async function getEventByURL(URL){
  let baseURL = "http://localhost:3000/Vote/"+URL
  let document = await EventModel.findOne({'url' : baseURL}, 'name type venue duration intervals startDate endDate duration')
  return document;
}

async function getVotesByEventURL(URL){
  let baseURL = "http://localhost:3000/Vote/"+URL
  let document = await EventModel.findOne({'url' : baseURL}, 'votes')
  return document;
}

async function updateEvent(event, vote){
  return await EventModel.findByIdAndUpdate(event._id, {"$push": {"votes": vote}})
}

module.exports = {createEvent, getEventByURL, updateEvent, getAllBlocks, pushBlock, getVotesByEventURL}
