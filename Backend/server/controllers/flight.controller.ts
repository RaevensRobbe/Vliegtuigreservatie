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
    }
}