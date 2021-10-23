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
        this.router.get('/hehe/:Sid/:Did',this.hehe)
    }

    hehe = async (request: Request, response: Response, next: NextFunction) => {
        const startID = request.params.Sid;
        const destinationID = request.params.Did;

        console.log(startID)
        console.log(destinationID)

        const data = await this.repository.createQueryBuilder("f")
        .select(["f.FlightId","f.Date","f.StartId","f.DestinationId","d.Name","s.Name"])
        // .innerJoinAndSelect("flight.Destination", "destD")
        // .innerJoinAndSelect("flight.Start", "Start")
        .innerJoin("f.Destination", "d")
        .innerJoin("f.Start", "s")
        .getMany();
        response.send(data);
    }
}