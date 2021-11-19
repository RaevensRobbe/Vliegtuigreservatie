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

  let touchdownHourNummer =
    Math.floor(Number(flightPartOne)) + Math.floor(Number(departureTimePartOne))
  let touchdownTimePartOne = touchdownHourNummer.toString()

  let touchdownTimePartMinutesNumber =
    Math.floor(Number(flightPartTwo)) + Math.floor(Number(departureTimePartTwo))
  let touchdownTimePartTwo = touchdownTimePartMinutesNumber.toString()

  // MINUTES
  if (touchdownTimePartMinutesNumber == 60) {
    touchdownTimePartTwo = '00'
    // uur + 1
    touchdownHourNummer += 1
  } else if (touchdownTimePartMinutesNumber > 60) {
    touchdownTimePartMinutesNumber = touchdownTimePartMinutesNumber - 60
    touchdownTimePartTwo = touchdownTimePartMinutesNumber.toString()
    // uur + 1
    touchdownHourNummer += 1
  }
  if (touchdownTimePartMinutesNumber < 10) {
    // If number lower than 10 it show ex:8 should show ex:08
    touchdownTimePartTwo = '0' + touchdownTimePartTwo
  }

  // HOURS
  if (touchdownHourNummer == 24) {
    touchdownTimePartOne = '00'
  } else if (touchdownHourNummer > 24) {
    //hour ex:26 should return ex:02
    touchdownHourNummer = touchdownHourNummer - 24
    touchdownTimePartOne = touchdownHourNummer.toString()
  }
  if (touchdownHourNummer < 10) {
    // If number lower than 10 it show ex:8 should show ex:08
    touchdownTimePartOne = '0' + touchdownHourNummer
  } else {
    touchdownTimePartOne = touchdownHourNummer.toString()
  }

  return touchdownTimePartOne + ':' + touchdownTimePartTwo
}
