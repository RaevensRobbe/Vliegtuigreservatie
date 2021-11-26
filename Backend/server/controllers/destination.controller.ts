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
        this.router.get('/test',this.testing);
        this.router.get('/:id', this.one);
        this.router.post('', this.save);
    }

    all = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const data = await this.repository.createQueryBuilder("dest")
            .select(["dest.Name","dest.DestinationId"])
            .getMany();
            if(data.length === 0){
                response.status(400).json({error:'Data is undefined'})
              }else{
                response.send(data)
              }
        }catch(error){
            response.status(500).json({error:{error}})
        }
    }

    testing = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const data = await this.repository.createQueryBuilder("dest")
            .select(["dest.Name"])
            .innerJoinAndSelect("dest.Destination","flight")
            .innerJoinAndSelect("dest.Start","flightS")
            .getMany();
            if(data.length === 0){
                response.status(400).json({error:'Data is undefined'})
              }else{
                response.send(data)
              }
        }catch(error){
            response.status(500).json({error:{error}})
        }
    }

}