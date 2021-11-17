function calculateDistance(
  coordinateDeparture: any,
  coordinateDestination: any,
) {
  let lat1 = coordinateDeparture[0]
  let lon1 = coordinateDeparture[1]
  let lat2 = coordinateDestination[0]
  let lon2 = coordinateDestination[1]

  let radius = 6371 // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1) // deg2rad below
  let dLon = deg2rad(lon2 - lon1)
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = radius * c // Distance in km
  return d
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

export function calculateFlightTimeLong(
  coordinateDeparture: any,
  coordinateDestination: any,
) {
  let distance = calculateDistance(coordinateDeparture, coordinateDestination)

  //format to hours and minutes
  let time = distance / 850
  let hours = Math.floor(time)
  let minutes = Math.round((Number(time) - hours) * 60)
  // flightTime = hours + ':' + minutes
  let returnSentence
  if (hours == 1) {
    if (minutes == 1) {
      returnSentence = hours + ' hour ' + minutes + ' minute'
    } else {
      returnSentence = hours + ' hour ' + minutes + ' minutes'
    }
  } else if (minutes == 1) {
    returnSentence = hours + ' hours ' + minutes + ' minute'
  } else {
    returnSentence = hours + ' hours ' + minutes + ' minutes'
  }
  return returnSentence
}

function calculateFlightTimeShort(
  coordinateDeparture: any,
  coordinateDestination: any,
) {
  let distance = calculateDistance(coordinateDeparture, coordinateDestination)

  //format to hours and minutes
  let time = distance / 850
  let hours = Math.floor(time)
  let minutes = Math.round((Number(time) - hours) * 60)
  let flightTime = hours + ':' + minutes
  return flightTime
}

export function getTouchdownTime(
  coordinateDeparture: any,
  coordinateDestination: any,
  departureTime: string,
) {
  let flightTime = calculateFlightTimeShort(
    coordinateDeparture,
    coordinateDestination,
  )
  flightTime = flightTime.toString()
  let flightPartOne = flightTime.split(':')[0]
  let flightPartTwo = flightTime.split(':')[1]

  let departureTimePartOne = departureTime.split(':')[0]
  let departureTimePartTwo = departureTime.split(':')[1]

  let touchdownTimePartOneNumber =
    Math.floor(Number(flightPartOne)) + Math.floor(Number(departureTimePartOne))
  let touchdownTimePartOne = touchdownTimePartOneNumber.toString()

  let touchdownTimePartTwoNumber =
    Math.floor(Number(flightPartTwo)) + Math.floor(Number(departureTimePartTwo))
  let touchdownTimePartTwo = touchdownTimePartTwoNumber.toString()

  if (touchdownTimePartOneNumber == 24) {
    touchdownTimePartOne = '00'
  } else if (touchdownTimePartOneNumber > 24) {
    touchdownTimePartOneNumber = touchdownTimePartOneNumber - 24
    touchdownTimePartOne = touchdownTimePartOneNumber.toString()
  }
  if (touchdownTimePartOneNumber < 10) {
    touchdownTimePartOne = '0' + touchdownTimePartOne
  }
  if (touchdownTimePartTwoNumber == 60) {
    touchdownTimePartTwo = '00'
  } else if (touchdownTimePartTwoNumber > 60) {
    touchdownTimePartTwoNumber = touchdownTimePartTwoNumber - 60
    touchdownTimePartTwo = touchdownTimePartTwoNumber.toString()
  }
  if (touchdownTimePartTwoNumber < 10) {
    touchdownTimePartTwo = '0' + touchdownTimePartTwo
  }

  // return 'test'
  return touchdownTimePartOne + ':' + touchdownTimePartTwo
}
