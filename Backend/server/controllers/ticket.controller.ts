import { Request, Response, NextFunction, Router } from 'express';
import { Ticket } from "../entities/ticket"; 
import { CrudController, IController, ICrudController } from './crud.controller';

/**
 * The interface to use for every Ticket Controller.
 */
 export interface ITicketController extends ICrudController, IController  {
     test: string;
}

export class TicketController extends CrudController<Ticket> implements ITicketController {
    public router = Router();
    public test = 'OK';

    constructor() {
        super(Ticket); // Initialize the parent constructor

        this.router.get('/all', this.all);
        this.router.get('/:id', this.one);
        this.router.post('', this.save);
    }
}