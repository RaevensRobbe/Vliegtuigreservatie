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
        this.router.put('/updateUser/:id', this.updateUser);
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
     try{
      console.log(`data van frontend ${req.body}`);
      let result:any

      if(req.body === null){
        response.status(406).send('No data has been provided')
      }else{
        const newUser:User ={
          UserId : req.body.data.id,
          Firstname: req.body.data.firstname,
          Lastname: req.body.data.lastname,
          Email: req.body.data.email,
          Admin: false
        } 
        console.log(req.body.data.id)
        const checkUser = await this.repository.findOne({UserId:req.body.data.id})
        console.log(checkUser)
        if(checkUser === undefined) {
          const newDbUser = await this.repository.create(newUser);
          result = await this.repository.save(newDbUser); 
          return res.send(result)
        }
        else{
          console.log('Already exists')
        }
      }
     }catch(error) {
      response.status(500).send(error)
     }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
      try{
        if(req.body.data === null){
          response.status(406).send('No data has been provided')
        }else{
          const update = await this.repository.update({UserId: req.params.id},{Firstname: req.body.data.firstname, Lastname: req.body.data.lastname, Email: req.body.data.email})
          return res.send(update);
        }
      }catch(error){
        response.status(500).send(error)
      }
    }
}