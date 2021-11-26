import { Request, Response, NextFunction, Router } from 'express'
import { Ticket } from '../entities/ticket'
import { CrudController, IController, ICrudController } from './crud.controller'
import { User } from '../entities/user'

/**
 * The interface to use for every Ticket Controller.
 */
export interface ITicketController extends ICrudController, IController {
  test: string
}

export class TicketController
  extends CrudController<Ticket>
  implements ITicketController
{
  public router = Router()
  public test = 'OK'

  constructor() {
    super(Ticket) // Initialize the parent constructor
    this.router.get('/all', this.all)
    this.router.get('/:id', this.one)
    this.router.post('/createTicket', this.createTicket)
  }

  createTicket = async (
    req: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      console.log(`data van frontend ${req.body}`)
      let result
      if (req.body === null) {
        response.status(406).send('No data has been provided')
      } else {
        if (req.body.data.seatData.length === 0) {
          response.status(406).send('Seat data is missing')
        } else if (req.body.data.persons.length === 0) {
          response.status(406).send('Ticket needs to have a least 1 passenger')
        } else if (req.body.data.userId === undefined) {
          //console.log(req.body.persons.length)
          response.status(406).send('UserId is missing')
        } else if (req.body.data.flightId === undefined) {
          response.status(406).send('FlightId is missing')
        } else {
          console.log('I have enterd')

          const newTicket: Ticket = {
            Seat: req.body.data.seatData,
            Return: req.body.data.return,
            ReturnDate: req.body.data.returnDate,
            Persons: req.body.data.persons,
            Rating: 0,
            Review: '',
            User: {
              UserId: req.body.data.userId,
            },
            Flight: req.body.data.flightId,
          }
          console.log('I have made new Ticket')
          const newDbTicket = await this.repository.create(newTicket)
          result = await this.repository.save(newDbTicket)
          console.log('result:')
          console.log(result)
          if (result === {}) {
            response.status(500).send('Something went wrong')
          }
          return response.status(200).json({
            success: true,
          })
        }
      }
    } catch (error) {
      response.status(500).send(error)
    }
  }
}
