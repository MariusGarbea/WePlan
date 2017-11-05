var weather = require('./weather')
var forecastParse = require('./forecast')

async function findForecastsIntervals(eventQuery, locationKey){
  start = eventQuery.start
  end = eventQuery.end
  duration = eventQuery.duration
  requirements = eventQuery.weather

  let forecasts = await weather.getForecastFor(locationKey, start, end)
  if(forecasts.type == "none"){
    return {type: forecasts.type, [{"start": start, "end": end}]}
  }
  let intervals = []
  let date = start
  let forecastIndex = 0
  let foundStart = true
  let beginInterval = start
  let endInterval = start
  while (forecastIndex < forecasts.length && date <= end){
    forecast = forecasts[forecastIndex]
    if(meetsRequirements(requirements, forecast)){
      if(!foundStart){
        beginInterval = forecastParse(forecast).getDate()
        endInterval = forecastParse(forecast).getDate()
        foundStart = true
      }
      else if(forecastParse(forecast).getDate() > endInterval){
        endInterval = forecastParse(forecast).getDate()
      }
    }
    else{
      if(endInterval - startInterval > duration){
        intervals.push({"start": startInterval, "end": endInterval})
      }
      foundStart = false
    }
    forecastIndex++
  }
  if(foundStart){
    if(end - startInterval > duration){
      intervals.push({"start": startInterval, "end": endInterval})
    }
  }
  return intervals
}

function meetsRequirements(requirements, forecast){
  return requirements.contains(forecastParse(forecast).getWeather())
}
