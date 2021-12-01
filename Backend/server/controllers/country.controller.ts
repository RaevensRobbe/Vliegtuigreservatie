import { Request, Response, NextFunction, Router, request } from 'express';
// import { Country } from "../entities/country"; 
// import { CrudController, IController, ICrudController } from './crud.controller';
import { Country } from '../entities/country';
import { Destination } from '../entities/destination';
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
        this.router.get('/popular', this.popularDestinations);
        this.router.get('/destination/:id', this.destination);
        this.router.get('/countries/destinations',this.countiesDestinations);
        this.router.get('/:id', this.one);
        this.router.post('', this.save);
    }

    all = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const data = await this.repository.createQueryBuilder("country")
            .select(["country.Name","country.CountryId"])
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

    // popularDestinations = async (request:Request, response:Response, next:NextFunction) => {
    //     const test = await this.repository.find({select:["Name"], join:{alias:"country", leftJoinAndSelect:{Destination:"country.Dest"}},});
    //     response.send(test);
    // }

    popularDestinations = async (request: Request, response: Response, next: NextFunction) => {
        let data;
            try{
                data = await this.repository.createQueryBuilder("country")
                .select(["country.Name","dest.Name","dest.Picture","dest.DestinationId","dest.Popularity","dest.Coordinates"])
                .leftJoin("country.Dest", "dest")
                .orderBy("dest.Popularity")
                .limit(6)
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
    destination = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const countryID = request.params.id 
            if(countryID === null) {
                response.status(500).json({error: "Parameter error"})
            }else{
                const data = await this.repository.createQueryBuilder("country")
                .select(["country.Name","dest.Name","dest.DestinationId"])
                .leftJoin("country.Dest", "dest")
                .where("country.CountryId = :id", {id: countryID})
                .getMany();
                if(data.length === 0){
                    response.status(400).json({error:'Data is undefined'})
                  }else{
                    response.send(data)
                  }
            }
        }catch(error){
            response.status(500).json({error:{error}})
        }
    }

    countiesDestinations = async (request: Request, response: Response, next: NextFunction) => {
        try{
            const data = await this.repository.createQueryBuilder("c")
            .select(["c.CountryId","c.Name","d.DestinationId","d.Name"])
            .leftJoin("c.Dest","d")
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