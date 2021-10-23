import { Request, Response, NextFunction, Router, response } from 'express';
import { Country } from '../entities/country';
import { Destination } from "../entities/destination"; 
import { CrudController, IController, ICrudController } from './crud.controller';

/**
 * The interface to use for every Destination Controller.
 */
 export interface IDestinationController extends ICrudController, IController  {
     test: string;
}

export class DestinationController extends CrudController<Destination> implements IDestinationController {
    public router = Router();
    public test = 'OK';

    constructor() {
        super(Destination); // Initialize the parent constructor

        this.router.get('/all', this.all);
        this.router.get('/:id', this.one);
        this.router.post('', this.save);
    }

    all = async (request: Request, response: Response, next: NextFunction) => {
        const data = await this.repository.createQueryBuilder("dest")
        .select(["dest.Name","dest.DestinationId"])
        .getMany();
        response.send(data); 
    }

}