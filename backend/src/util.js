function convertDuration(time, unit){
  if(unit == "Minutes"){
    return time * 60 * 1000
  }
  else if(unit == "Hours"){
    return time * 60 * 60 * 1000
  }
  else if(unit == "Days"){
    return time * 60 * 60 * 1000 * 24
  }
  return time
}

module.exports = {convertDuration}
