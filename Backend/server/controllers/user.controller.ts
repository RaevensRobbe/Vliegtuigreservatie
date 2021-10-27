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
      console.log(req.body);
      const check = await this.repository.findOne({Email:req.body.email})
      let result:any = ''

      if(check){
        result = "user already exists"
      }else{
        const newUser:User ={
          UserId : 11 ,
          Name: req.body.name,
          Email: req.body.email,
          Admin: false
        } 
        const newDbUser = await this.repository.create(newUser);
        result = await this.repository.save(newDbUser); 

        const newFirebaseUser = await admin.auth().createUser({
          email:  req.body.email,
          password: req.body.password,
          displayName: req.body.name
        })
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully created new user:', userRecord.uid);
        })
        .catch((error) => {
          console.log('Error creating new user:', error);
        });
      }

      return res.send(result)
    }
}