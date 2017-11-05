// const redis = require('redis')
require('es6-promise').polyfill()
require('isomorphic-fetch')

const APIKey = 'HackPSU2017'
const baseURL = 'http://dataservice.accuweather.com'

async function callAPI(route, params){
  params["apikey"] = APIKey
  const URL = baseURL + route + convertToParams(params)
  console.log(URL)
  let results = await fetch(URL)
  results = results.json()
  let res = await results
  return res
}

async function getLocationKey (address) {
  let location = await callAPI(
    '/locations/v1/cities/search',
    {'q': address}
  )
  if(location){
    return location[0].Key
  }
  else{
    return -1
  }
}

function convertToParams (dictOfParams) {
  let query = '?'
  for (let key in dictOfParams) {
    query += key + '=' + dictOfParams[key] + '&'
  }
  return query.substring(0, query.length - 1)
}

function getBestForecast(forecasts, time){
  for(let i = 0; i < forecasts.length; i++){
    if(time < forecasts[i]){
      return '/'+forecasts[i]
    }
  }
  return -1
}

function getForecastRoute(startDate, endDate){
  const hourlyForecasts = [1, 12, 24, 72, 120]
  const dailyForecasts = [5, 10, 15]
  const now = new Date()

  let route = '/forecasts/v1/'
  let timeToPredict = endDate - now
  let hoursToPredict = timeToPredict / (60 * 60 * 1000)
  let daysToPredict = hoursToPredict / 24
  if(hoursToPredict <= hourlyForecasts[hourlyForecasts.length-1]){
    return {"type": "hourly",
      "route": route + 'hourly' +
        getBestForecast(hourlyForecasts, hoursToPredict)+'hour/'
      }
  }
  else if(daysToPredict <= dailyForecasts[dailyForecasts.length-1]){
    return {"type": "daily",
      "route": route + 'daily' +
        getBestForecast(dailyForecasts, daysToPredict)+'day/'
    }
  }
  else{
    timeToPredict = startDate - now
    let daysToPredict = timeToPredict / (60 * 60 * 1000 * 24)
    if(daysToPredict < dailyForecasts[dailyForecasts.length-1] ){
      return {"type": "daily",
        "route": route + 'daily/15day/'
      }
    }
    else{
      return -1
    }
  }
}

async function getForecastFor(locationKey, start, end){
  let routeData = getForecastRoute(start, end)
  if(routeData == -1){
    return {"type": "none", "data": []}
  }
  const forecastType = routeData.type
  const route = routeData.route + locationKey
  let results = await callAPI(route, {})
  if(routeData.type == "daily"){
    results = results["DailyForecasts"]
  }
  let finalResults = []
  dateString = routeData.type == "hourly" ? "DateTime" : "Date"
  for(let i = 0; i < results.length; i++){
    forecastDate = new Date(results[i][dateString])
    if(forecastDate > start && forecastDate < end){
      finalResults.push(results[i])
    }
  }
  return {"type": forecastType, "data": finalResults}
}

module.exports = {getLocation: getLocationKey, getForecastFor: getForecastFor}
