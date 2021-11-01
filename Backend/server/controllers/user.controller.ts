import { Request, Response, NextFunction, Router, request, response } from 'express';
import { User } from "../entities/user"; 
import { CrudController, IController, ICrudController } from './crud.controller';
import admin from 'firebase-admin';
import { Guid } from "guid-typescript";


/**
 * The interface to use for every User Controller.
 */
 export interface IUserController extends ICrudController, IController  {
     test: string;
}

export class UserController extends CrudController<User> implements IUserController {
    public router = Router();
    public test = 'OK';

    constructor() {
        super(User); // Initialize the parent constructor

        this.router.get('/all', this.all);
        this.router.get('/:id', this.one);
        this.router.post('/createUser', this.createUser);

    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
      console.log(`data van frontend ${req.body}`);
      let result:any
      
      const newUser:User ={
        UserId : req.body.data.id,
        Name: req.body.data.name,
        Email: req.body.data.email,
        Admin: false
      } 
      const newDbUser = await this.repository.create(newUser);
      result = await this.repository.save(newDbUser); 
      

      return res.send(result)
    }
}