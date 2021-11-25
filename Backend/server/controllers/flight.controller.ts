import { Request, Response, NextFunction, Router } from 'express'
import { Flight } from '../entities/flight'
import { CrudController, IController, ICrudController } from './crud.controller'

/**
 * The interface to use for every Flight Controller.
 */
export interface IFlightController extends ICrudController, IController {
  test: string
}

export class FlightController
  extends CrudController<Flight>
  implements IFlightController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(Flight) // Initialize the parent constructor

    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.post('', this.save)
    this.router.get('/flightInfo/:Sid/:Did', this.flightInfo)
    this.router.get('/seats/:id', this.seats)
    this.router.get('/plane/:id', this.getPlane)
    this.router.get('/userFlights/:id', this.getUserFlights)
  }

  flightInfo = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try{
      const startID = request.params.Sid
      const destinationID = request.params.Did
      const nStartID:number = +startID
      const nDestID:number = +destinationID

      const data = await this.repository
        .createQueryBuilder('f')
        .select([
          'f.FlightId',
          'f.Date',
          'f.StartId',
          'f.DestinationId',
          'd.Name',
          's.Name',
        ])
        .innerJoin('f.Destination', 'd')
        .innerJoin('f.Start', 's')
        .where('f.StartId = :id', { id: nStartID })
        .andWhere('f.DestinationId = :id2', { id2: nDestID })
        .getMany()
      response.send(data)
    }catch(error){
      response.status(500).send(error)
    }
  }

  one = async (request: Request, response: Response, next: NextFunction) => {
    try{
      const flightId = request.params.id
      const nFlightID:number = +flightId 

      const data = await this.repository
        .createQueryBuilder('f')
        .select([
          'f.FlightId',
          'f.Date',
          'f.Gate',
          'f.Price',
          'f.StartId',
          'f.PlaneId',
          'f.DestinationId',
          'd.Name',
          'd.Coordinates',
          'd.Abbreviation',
          's.Name',
          's.Coordinates',
          's.Abbreviation',
        ])
        .innerJoin('f.Destination', 'd')
        .innerJoin('f.Start', 's')
        .where('f.FlightId = :id', { id: nFlightID })
        .getOne()
        response.send(data)
    }catch(error){
      response.status(500).send(error)
    }
  }

  seats = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const flightId = request.params.id
      const nFlightID:number = +flightId 

      const data = await this.repository
        .createQueryBuilder('f')
        .select(['f.FlightId', 'p.EconomySeats', 'p.BusinessSeats', 't.Seat'])
        .innerJoin('f.Plane', 'p')
        .innerJoin('f.Ticket', 't')
        .where('f.FlightId = :id', { id: nFlightID })
        .getOne()
        console.log(data)
        response.send(data)
        
    }catch (error) {
      response.status(500).send(error)
    }
  }

  getPlane = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try{
      const flightId = request.params.id
      const nFlightID:number = +flightId 

      const data = await this.repository
        .createQueryBuilder('f')
        .select(['f.PlaneId', 'p.EconomySeats', 'p.BusinessSeats'])
        .innerJoin('f.Plane', 'p')
        .where('f.FlightId = :id', { id: nFlightID })
        .getOne()
      response.send(data)
    }catch(error){
      response.status(500).send(error)
    }
  }

  getUserFlights = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try{
      const userID = request.params.id
      const data = await this.repository
        .createQueryBuilder('f')
        .select([
          'f.Price',
          'f.Date',
          'd.Name',
          'd.Coordinates',
          't.TicketId',
          's.Name',
          's.Coordinates',
        ])
        .innerJoin('f.Destination', 'd')
        .innerJoin('f.Start', 's')
        .innerJoin('f.Ticket', 't')
        .where('t.User = :id', { id: userID })
        .distinct(true)
        .getMany()
      response.send(data)
    }catch(error){
      response.status(500).send(error)
    }
  }
}
