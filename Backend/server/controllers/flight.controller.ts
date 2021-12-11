import { Request, Response, NextFunction, Router, response } from 'express'
import { isAuthenticated } from '../auth/authenticated'
import { isAuthorized } from '../auth/authorized'
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
    this.router.get('/allupcoming', isAuthenticated , isAuthorized({hasRole: ['admin']}) , this.allUpcoming)
    this.router.get('/flightnr/:id', this.specific)
    this.router.get('/:id', this.one)
    this.router.get('/flightInfo/:Sid/:Did', this.flightInfo)
    this.router.get('/seatsInfo/:id', this.seatsInfo)
    this.router.get('/takenSeats/:id', this.takenSeats)
    this.router.get('/plane/:id', this.getPlane)
    this.router.get('/userFlights/:id', this.getUserFlights)
    this.router.get(
      '/flightInfoBetween/:Sid/:Did/:Date',
      this.flightInfoBetween,
    )

    this.router.post('', isAuthenticated , isAuthorized({hasRole: ['admin']}) , this.createFlight)

    this.router.put('/updateFlight/:id', isAuthenticated , isAuthorized({hasRole: ['admin']}) , this.updateFlight)
  }

  flightInfo = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const startID = request.params.Sid
      const destinationID = request.params.Did

      const data = await this.repository
        .createQueryBuilder('f')
        .select([
          'f.FlightId',
          'f.Date',
          'f.StartId',
          'f.DestinationId',
          'f.Price',
          'd.Name',
          's.Name',
        ])
        .innerJoin('f.Destination', 'd')
        .innerJoin('f.Start', 's')
        .where('f.StartId = :id', { id: startID })
        .andWhere('f.DestinationId = :id2', { id2: destinationID })
        .orderBy('f.Date', 'ASC')
        .getMany()
      if (data.length === 0) {
        response.status(400).json({ error: 'Data is undefined' })
      } else {
        response.send(data)
      }
    } catch (error) {
      response.status(500).json({ error: { error } })
    }
  }
  flightInfoBetween = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const startID = request.params.Sid
      const destinationID = request.params.Did

      const datum = new Date(request.params.Date)
      let firstDate = new Date()
      let lastDate = new Date()

      firstDate.setDate(datum.getDate() - 3)
      lastDate.setDate(datum.getDate() + 3)

      const data = await this.repository
        .createQueryBuilder('f')
        .select([
          'f.FlightId',
          'f.Date',
          'f.StartId',
          'f.DestinationId',
          'f.Price',
          'd.Name',
          's.Name',
        ])
        .innerJoin('f.Destination', 'd')
        .innerJoin('f.Start', 's')
        .where('f.StartId = :id', { id: startID })
        .andWhere('f.DestinationId = :id2', { id2: destinationID })
        .andWhere('f.Date >= :startDate', { startDate: firstDate })
        .andWhere('f.Date <= :endDate', { endDate: lastDate })
        .orderBy('f.Date', 'ASC')
        .getMany()
      if (data.length === 0) {
        response.status(400).json({ error: 'Data is undefined' })
      } else {
        response.send(data)
      }
    } catch (error) {
      response.status(500).json({ error: { error } })
    }
  }

  one = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const flightID = request.params.id

      const data = await this.repository
        .createQueryBuilder('f')
        .select([
          'f.FlightId',
          'f.Date',
          'f.Gate',
          'f.Price',
          'f.StartId',
          'f.PlaneId',
          'f.Name',
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
        .where('f.FlightId = :id', { id: flightID })
        .getOne()
      console.log(data)
      if (data === undefined) {
        response.status(400).json({ error: 'Data is undefined' })
      } else {
        response.send(data)
      }
    } catch (error) {
      response.status(500).json({ error: { error } })
    }
  }

  allUpcoming = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const data = await this.repository
        .createQueryBuilder('f')
        .select([
          'f.FlightId',
          'f.Date',
          'f.Gate',
          'f.Price',
          'f.StartId',
          'f.PlaneId',
          'f.Name',
          'f.DestinationId',
          'd.Name',
          'd.Coordinates',
          's.Name',
          's.Coordinates',
        ])
        .innerJoin('f.Destination', 'd')
        .innerJoin('f.Start', 's')
        .where('Date(f.Date) >= Date(now())')
        .orderBy('f.Date', 'ASC')
        .getMany()
      if (data === undefined) {
        response.status(400).json({ error: 'Data is undefined' })
      } else {
        response.send(data)
      }
    } catch (error) {
      response.status(500).json({ error: { error } })
    }
  }

  specific = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const specificFlight = request.params.id
      const data = await this.repository
        .createQueryBuilder('f')
        .select([
          'f.FlightId',
          'f.Date',
          'f.Gate',
          'f.Price',
          'f.StartId',
          'f.PlaneId',
          'f.Name',
          'f.DestinationId',
          'd.Name',
          'd.Coordinates',
          's.Name',
          's.Coordinates',
        ])
        .innerJoin('f.Destination', 'd')
        .innerJoin('f.Start', 's')
        .where('f.Name = :id', { id: specificFlight })
        .getOne()
      if (data === undefined) {
        response.status(400).json({ error: 'Data is undefined' })
      } else {
        response.send(data)
      }
    } catch (error) {
      response.status(500).json({ error: { error } })
    }
  }

  takenSeats = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const flightID = request.params.id

      const data = await this.repository
        .createQueryBuilder('f')
        .select(['f.FlightId', 'p.EconomySeats', 'p.BusinessSeats', 't.Seat'])
        .innerJoin('f.Plane', 'p')
        .innerJoin('f.Ticket', 't')
        .where('f.FlightId = :id', { id: flightID })
        .getOne()
      if (data === undefined) {
        response.status(400).json({ error: 'Data is undefined' })
      } else {
        response.send(data)
      }
    } catch (error) {
      response.status(500).json({ error: { error } })
    }
  }

  seatsInfo = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const flightID = request.params.id

      const data = await this.repository
        .createQueryBuilder('f')
        .select(['f.FlightId', 'p.EconomySeats', 'p.BusinessSeats'])
        .innerJoin('f.Plane', 'p')
        .where('f.FlightId = :id', { id: flightID })
        .getOne()
      if (data === undefined) {
        response.status(400).json({ error: 'Data is undefined' })
      } else {
        response.send(data)
      }
    } catch (error) {
      response.status(500).json({ error: { error } })
    }
  }

  getPlane = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const flightID = request.params.id

      const data = await this.repository
        .createQueryBuilder('f')
        .select(['f.PlaneId', 'p.EconomySeats', 'p.BusinessSeats'])
        .innerJoin('f.Plane', 'p')
        .where('f.FlightId = :id', { id: flightID })
        .getOne()
      if (data === undefined) {
        response.status(400).json({ error: 'Data is undefined' })
      } else {
        response.send(data)
      }
    } catch (error) {
      response.status(500).json({ error: { error } })
    }
  }

  getUserFlights = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
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
      if (data.length === 0) {
        response.status(400).json({ error: 'Data is undefined' })
      } else {
        response.send(data)
      }
    } catch (error) {
      response.status(500).json({ error: { error } })
    }
  }

  createFlight = async (
    req: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      let result
      if (req.body.data === null) {
        response.status(406).send('No data has been provided')
      } else {
        const newFlight: Flight = {
          Ticket: null,
          Name: req.body.data.Name,
          PlaneId: req.body.data.PlaneId,
          StartId: req.body.data.StartId,
          DestinationId: req.body.data.DestinationId,
          Start: {
            DestinationId: req.body.data.StartId,
          },
          Destination: {
            DestinationId: req.body.data.DestinationId,
          },

          Date: req.body.data.Date,
          Price: req.body.data.Price,
          Gate: req.body.data.Gate,
        }
        const create = await this.repository.create(newFlight)
        result = await this.repository.save(create)

        console.log('created')
        console.log(result)
        if (result === {}) {
          return response.status(500).json({ error: 'Something went wrong' })
        } else {
          return response.status(200).json({ success: true })
        }
      }
    } catch (error) {
      response.status(500).json(error)
    }
  }

  updateFlight = async (request: Request, response: Response, next: NextFunction,) => {
    try{
      const flightId = request.params.id;
      if(!flightId || !request.body){
        return response.status(401).json({ error: 'Data is missing'})
      }else{
        const oldData:Flight = await this.repository.findOne(flightId);
        if(!oldData) {
          return response.status(401).json({ error: 'FlightId is incorrect'})
        }
        let price:number = request.body.data.price
        let gate:number = request.body.data.gate
        let date:string = request.body.data.date

        if (!price) price = oldData.Price
        if (!gate) gate = oldData.Gate
        if (!date) date = oldData.Date

        const update = await this.repository.createQueryBuilder()
        .update(Flight)
        .set({Price: price, Gate: gate, Date: date })
        .where("FlightId = :id",{id: flightId})
        .execute();

        if (update.affected === 1)
          return response.status(200).json({ success: true })
        else return response.status(500).json({ error: 'Something went wrong' })
      }
    } catch (error) {
      response.status(500).json({ error: { error } })
    }
  }
}
