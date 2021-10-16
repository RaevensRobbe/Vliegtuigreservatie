import { Request, Response, NextFunction, Router } from 'express';
import { Plane } from "../entities/plane"; 
import { CrudController, IController, ICrudController } from './crud.controller';

/**
 * The interface to use for every Plane Controller.
 */
 export interface IPlaneController extends ICrudController, IController  {
     test: string;
}

export class PlaneController extends CrudController<Plane> implements IPlaneController {
    public router = Router();
    public test = 'OK';

    constructor() {
        super(Plane); // Initialize the parent constructor

        this.router.get('/all', this.all);
        this.router.get('/:id', this.one);
        this.router.post('', this.save);
    }
}