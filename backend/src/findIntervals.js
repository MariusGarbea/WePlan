const weather = require('./weather')
const forecastParse = require('./forecast')

var future = new Date()
future.setDate(7)
findForecastIntervals({"start": new Date(), "end": future, "duration": 1000*60*60*4, "weather": ["Sunny", "Clear", "Mostly sunny", "Partly cloudy"]}, "311315").then(function(done, err){
  console.log(done)
})

async function findForecastIntervals(eventQuery, locationKey){
  start = eventQuery.start
  end = eventQuery.end
  duration = eventQuery.duration
  requirements = eventQuery.weather

  let forecasts = await weather.getForecastFor(locationKey, start, end)
  if(forecasts.type == "none"){
    return {type: forecasts.type, intervals: [{"start": start, "end": end}]}
  }
  let intervals = []
  let date = start
  let forecastIndex = 0
  let foundStart = true
  let beginInterval = start
  let endInterval = start

  while (forecastIndex < forecasts.data.length && date <= end){
    forecast = forecasts.data[forecastIndex]
    date = forecastParse.getDate(forecasts.type, forecast)
    if(meetsRequirements(requirements, forecast, forecasts.type)){
      if(!foundStart){
        beginInterval = date
        endInterval = date
        foundStart = true
      }
      else if(date > endInterval){
        endInterval = date
      }
    }
    else{
      if(endInterval - beginInterval >= duration){
        intervals.push({"start": beginInterval, "end": endInterval})
      }
      beginInterval = date
      foundStart = false
    }
    forecastIndex++
  }
  if(foundStart){
    if(end - beginInterval >= duration){
      intervals.push({"start": beginInterval, "end": end})
    }
  }
  return {"type": forecasts.type, "intervals": intervals}
}

function meetsRequirements(requirements, forecast, type){
  let meets = requirements.includes(forecastParse.getWeather(type, forecast))
  return meets
}

module.exports = {findForecastIntervals}
