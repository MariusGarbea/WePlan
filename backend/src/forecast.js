function getDate(type, forecast){
  if(type == "hourly"){
    return new Date(forecast.DateTime)
  }
  else{
    return new Date(forecast.EffectiveDate)
  }
}

function getWeather(type, forecast){
  if(type == "hourly"){
    return forecast.IconPhrase
  }
  else{
    return forecast.Day.IconPhrase
  }
}
