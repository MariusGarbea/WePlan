var weather = require('./weather')

async function findIntervals(eventQuery, locationKey){
  start = eventQuery.start
  end = eventQuery.end
  duration = eventQuery.duration
  requirements = eventQuery.weather

  let forecast = await weather.getForecastFor(locationKey, start, end)
  intervals = []
  date = start
  while (date <= end){
    
  }
}
