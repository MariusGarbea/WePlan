const weather = require('./weather')
const forecastParse = require('./forecast')

/*var future = new Date()
future.setDate(7)
findForecastIntervals({"start": new Date(), "end": future, "duration": 1000*60*60*4, "weather": "Sunny"}, "311315").then(function(done, err){
  console.log(done)
})*/

async function findForecastIntervals(eventQuery, locationKey, noLocation){
  weatherTypes = {
     'Sunny':[
        'Sunny',
        'Mostly sunny',
        'Partly sunny',
        'Intermittent clouds',
        'Hazy sunshine',
        'Clear',
        'Mostly clear'
     ],
     'Cloudy':[
        'Cloudy',
        'Mostly cloudy',
        'Dreary (Overcast)',
        'Fog',
        'Partly cloudy'
     ],
     'Rain':[
        'Rain',
        'Showers',
        'Mostly cloudy w/ showers',
        'Partly sunny w/ showers',
        'T-storms',
        'Mostly cloudy w/ T-Storms',
        'Partly sunny w/ T-Storms',
        'Partly cloudy w/ showers',
        'Mostly cloudy w/ showers',
        'Partly cloudy w/ T-storms',
        'Mostly cloudy w/ T-Storms',
        'Intermittent Clouds',
        'Hazy moonlight',
        'Mostly cloudy'
     ],
     'Snow':[
        'Snow',
        'Flurries',
        'Mostly cloudy w/ flurries',
        'Mostly cloudy w/ snow',
        'Ice',
        'Sleet',
        'Freezing rain',
        'Rain and snow',
        'Mostly cloudy w/ flurries',
        'Mostly cloudy w/ snow'
     ],
     'Hot':[
        'Hot'
     ],
     'Cold':[
        'Cold'
     ],
     'Windy':[
        'Windy'
     ],
  }
  start = eventQuery.start
  end = eventQuery.end
  duration = eventQuery.duration
  requirements = weatherTypes[eventQuery.weather]
  //console.log(requirements)
  let forecasts
  if(noLocation){
    forecasts = []
  }
  else{
    forecasts = await weather.getForecastFor(locationKey, start, end)
  }
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
  chunks = chunkIntervals(intervals, forecast.type, duration)
  return {"type": forecasts.type, "intervals": chunks}
}

function chunkIntervals(intervals, type, length){
  chunks = [];
  increment = 1000 * 60 * 60 * (type == "daily" ? 24 : 1)
  for(var i = 0; i < intervals.length; i++){
    for(var j = intervals[i].start.getTime(); j <= intervals[i].end.getTime()-length; j += increment){
      chunks.push({"start": new Date(j), "end": new Date(j+length)})
    }
  }
  return chunks;
}

function meetsRequirements(requirements, forecast, type){
  let meets = requirements.includes(forecastParse.getWeather(type, forecast))
  return meets
}

module.exports = {findForecastIntervals}
