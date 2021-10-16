import { Request, Response, NextFunction, Router } from 'express';
// import { Country } from "../entities/country"; 
// import { CrudController, IController, ICrudController } from './crud.controller';
import { Country } from '../entities/country';
import { CrudController, IController, ICrudController } from './crud.controller';

/**
 * The interface to use for every Country Controller.
 */
 export interface ICountryController extends ICrudController, IController  {
     test: string;
}

export class CountryController extends CrudController<Country> implements ICountryController {
    public router = Router();
    public test = 'OK';

    constructor() {
        super(Country); // Initialize the parent constructor

        this.router.get('/all', this.all);
        this.router.get('/:id', this.one);
        this.router.post('', this.save);
    }
}