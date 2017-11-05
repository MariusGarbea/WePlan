// const redis = require('redis')
require('es6-promise').polyfill()
require('isomorphic-fetch')

const APIKey = 'HackPSU2017'
const baseURL = 'http://dataservice.accuweather.com'

async function getLocationKey (lat, lon) {
  const route = '/locations/v1/cities/geoposition/search'
  const URL = baseURL + route + convertToParams({
    'apikey': APIKey,
    'q': lat + '%2C' + lon
  })
  let results = await fetch(URL)
  results = results.json()
  let res = await results
  return res
}

function convertToParams (dictOfParams) {
  let query = '?'
  for (let key in dictOfParams) {
    query += key + '=' + dictOfParams[key] + '&'
  }
  return query.substring(0, query.length - 1)
}

module.exports = {getLocation: getLocationKey}
