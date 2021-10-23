import { Request, Response, NextFunction, Router } from 'express';
import { Flight } from "../entities/flight"; 
import { CrudController, IController, ICrudController } from './crud.controller';

/**
 * The interface to use for every Flight Controller.
 */
 export interface IFlightController extends ICrudController, IController  {
     test: string;
}

export class FlightController extends CrudController<Flight> implements IFlightController {
    public router = Router();
    public test = 'OK';

    constructor() {
        super(Flight); // Initialize the parent constructor

        this.router.get('/all', this.all);
        this.router.get('/:id', this.one);
        this.router.post('', this.save);
        this.router.get('/flightInfo/:Sid/:Did',this.flightInfo)
        this.router.get('/seats/:id', this.seats)
    }

    flightInfo = async (request: Request, response: Response, next: NextFunction) => {
        const startID = request.params.Sid;
        const destinationID = request.params.Did;

        console.log(startID)
        console.log(destinationID)

        const data = await this.repository.createQueryBuilder("f")
        .select(["f.FlightId","f.Date","f.StartId","f.DestinationId","d.Name","s.Name"])
        .innerJoin("f.Destination", "d")
        .innerJoin("f.Start", "s")
        .where("f.StartId = :id",{id:startID})
        .andWhere("f.DestinationId = :id2",{id2:destinationID})
        .getOne();
        response.send(data);
    }

    seats = async (request: Request, response: Response, next: NextFunction) => {
        const flightID = request.params.id;

        console.log(flightID)

        const data = await this.repository.createQueryBuilder("f")
        .select(["f.FlightId","p.EconomySeats","p.BusinessSeats","t.Seat"])
        .innerJoin("f.Plane", "p")
        .innerJoin("f.Ticket", "t")
        .where("f.FlightId = :id",{id:flightID})
        .getMany();
        response.send(data);
    }
}