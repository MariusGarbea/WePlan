const mongoose = require('mongoose')

const connectionString = 'mongodb://127.0.0.1:27017'
mongoose.connect(connectionString, {
  useMongoClient: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
/*
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

var Event = new Schema({
  id: ObjectId,
  name: String,
  type: String,
  location: String,
  start: Date,
  end: Date
})

var EventModel = mongoose.model('Event', Event)
*/
function createEvent (req) {
  console.log('Event Created')
  /*
  var event = new EventModel()
  for (const prop in event) {
    event[prop] = req[prop]
  }
  */
}

module.exports = {createEvent}
