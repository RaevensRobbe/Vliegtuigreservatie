import { getAllDestinations, getOneDestination, createDestination} from './swagger/destination.swagger'
import { getAllCountries, getDestinationsFromCountry, getPopularCountries, getAllCountriesAndDestinations, getOneCountry, createCountry} from './swagger/country.swagger'
import { getAllFlights, getPastFlights, getUpcomingFlights, getOneFlight, getFlightInfo, getSeatsInfo, getTakenSeatsInfo, getPlaneInfo, getUserFlights,getFlightInfoBetween, getReviews, createFlight,updateFlight} from './swagger/flight.swagger'
import { getAllPlanes, getOnePlane } from './swagger/plane.swagger'
import { getAllTickets, getOneTicket } from './swagger/ticket.swagger'
import { getAllUsers, getOneUser, getAdmin} from './swagger/user.swagger'

export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Document',
        description: 'your description here',
        termsOfService: '',
        contact: {
            name: 'Tran Son hoang',
            email: 'son.hoang01@gmail.com',
            url: 'https://hoangtran.co'
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    definitions: {
        destination:{
            type: 'object',
            properties: {
                DestinationId: {
                    type: 'string',
                },
                Name: {
                    type: 'string',
                },
                Popularity: {
                    type: 'string',
                },
                Abbreviation: {
                    type: 'string',
                },
                Picture: {
                    type: 'string',
                },
                Coordinates: {
                    type: 'list',
                }
            }
        },
        country:{
            type:'object',
            properties: {
                CountryId: {
                    type: 'string',
                },
                Name: {
                    type: 'string',
                }
            }
        }
    },
    tags:[
        {
            name: 'Destination',
        },
        {
            name:'Country'
        },
        {
            name:'Flight'
        },
        {
            name:'Plane'
        },
        {
            name:'Ticket'
        },
        {
            name:'User'
        }
    ],
    paths:{
        "/api/v1/destination/all":{"get":getAllDestinations},
        "/api/v1/destination/{destinationId}":{"get":getOneDestination},
        "/api/v1/destination/":{"post":createDestination},
        "/api/v1/country/all":{"get":getAllCountries},
        "/api/v1/country/popular":{"get":getPopularCountries},
        "/api/v1/country/destination/{countryId}":{"get":getDestinationsFromCountry},
        "/api/v1/country/countries/destinations":{"get":getAllCountriesAndDestinations},
        "/api/v1/country/{countryId}":{"get":getOneCountry},
        "/api/v1/country/":{"post":createCountry},
        "/api/v1/flight/all":{"get":getAllFlights},
        "/api/v1/flight/pastFlights":{"get":getPastFlights},
        "/api/v1/flight/allupcoming":{"get":getUpcomingFlights},
        "/api/v1/flight/{flightId}":{"get":getOneFlight},
        "/api/v1/flight/flightInfo/{startId}/{destinationId}":{"get":getFlightInfo},
        "/api/v1/flight/seatsInfo/{flightId}":{"get":getSeatsInfo},
        "/api/v1/flight/takenSeats/{flightId}":{"get":getTakenSeatsInfo},
        "/api/v1/flight/plane/{flightId}":{"get":getPlaneInfo},
        "/api/v1/flight/userFlights/{userId}":{"get":getUserFlights},
        "/api/v1/flight/flightInfoBetween/{startId}/{destinationId}/{date}":{"get":getFlightInfoBetween},
        "/api/v1/flight/reviews/{flightId}":{"get":getReviews},
        "/api/v1/flight/":{"post":createFlight},
        "/api/v1/flight/updateFlight/{flightId}":{"put":updateFlight},
        "/api/v1/plane/all":{"get":getAllPlanes},
        "/api/v1/plane/{planeId}":{"get":getOnePlane},
        "/api/v1/ticket/all":{"get":getAllTickets},
        "/api/v1/ticket/{ticketId}":{"get":getOneTicket},
        "/api/v1/user/all":{"get":getAllUsers},
        "/api/v1/user/{userId}":{"get":getAdmin},
        "/api/v1/user/data/{userId}":{"get":getOneUser},
    }
}