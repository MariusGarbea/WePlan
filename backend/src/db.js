const mongoose = require('mongoose')

const connectionString = 'mongodb://127.0.0.1:27017'
mongoose.connect(connectionString, {
  useMongoClient: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

var Event = new Schema({
  _id: ObjectId,
  url: String,
  name: String,
  type: String,
  location: String,
  start: Date,
  end: Date
})

var EventModel = mongoose.model('Event', Event)

function createEvent (eventQuery, url) {
  var event = new EventModel()
  for (const prop in event) {
    event[prop] = eventQuery[prop]
  }
  event[url] = url;
  event.save(function(err){
    if(err){
      console.log(err)
    }
    else{
      console.log("Event stored")
    }
  })
}

module.exports = {createEvent}
