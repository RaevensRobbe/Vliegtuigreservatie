import { Request, Response, NextFunction, Router, request, response } from 'express';
import { User } from "../entities/user"; 
import { CrudController, IController, ICrudController } from './crud.controller';
import admin, { auth } from 'firebase-admin';
import { Guid } from "guid-typescript";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

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
        this.router.get('/:id', this.getOne);
        this.router.post('/createUser', this.createUser);
        this.router.put('/updateUser/:id',this.updateUser);
        this.router.post('/createAdmin', isAuthenticated , isAuthorized({hasRole: ['admin']}) ,this.createAdminUser)
    }

    getOne = async (request: Request, response: Response, next: NextFunction) =>{
      try{
        const userId = request.params.id;
        if(request.params.id === undefined){
          response.status(500).send('Parameter error')
        }else {
          const data = await this.repository.createQueryBuilder("u")
          .select(["u.Admin"])
          .where("u.UserId = :id",{id:userId})
          .getOne();

          if(data === null){
            response.status(400).json({error:'Data is undefined'})
          }else{
            response.send(data)
          }
        }
      }catch(error){
        response.status(500).json({error:{error}})
      }
    }

    createUser = async (request: Request, response: Response, next: NextFunction) => {
     try{
      console.log(`data van frontend ${request.body}`);
      let result:any

      if(request.body.data === null){
        response.status(400).json({error:"No data has been provided"})
      }else{
        if(request.body.data.id === undefined){
          response.status(400).json({error:"UserID is missing"})
        }else if(request.body.data.firstname === undefined){
          response.status(400).json({error:"FirstName is missing"})
        }else if(request.body.data.lastname === undefined){
          response.status(400).json({error:"LastName is missing"})
        }else if(request.body.data.email === undefined){
          response.status(400).json({error:"Email is missing"})
        }else{
          const newUser:User ={
            UserId : request.body.data.id,
            Firstname: request.body.data.firstname,
            Lastname: request.body.data.lastname,
            Email: request.body.data.email,
            Admin: false
          } 
          //Check if user exists
          const checkUser = await this.repository.findOne({UserId:request.body.data.id})
          if(checkUser === undefined) {
            const newDbUser = await this.repository.create(newUser);
            result = await this.repository.save(newDbUser); 

            if(result.UserId) return response.status(200).json({succes: true})
            else return response.status(500).json({error: "Something went wrong"})
          }
          else{
            return response.status(200).json({info: "User already exists"})
          }
        }
      }
     }catch(error) {
      response.status(500).json({error:error})
     }
    }

    updateUser = async (request: Request, response: Response, next: NextFunction) => {
      try{
        if(request.body.data === null){
          response.status(400).json({error:"No data has been provided"})
        }else{
          const update = await this.repository.update({UserId: request.params.id},{Firstname: request.body.data.firstname, Lastname: request.body.data.lastname, Email: request.body.data.email})
          return response.status(200).json({succes: true})
        }
      }catch(error){
        response.status(500).json({error:error})
      }
    }

    createAdminUser = async (request: Request, response: Response, next: NextFunction) => {
      try{
        let result:any
        console.log(request.body.data)
        const { firstName, lastName, email, password, role } = request.body.data
 
        if (!firstName || !lastName || !email || !password || !role) {
          return response.status(400).json({ message: 'Missing fields' })
        }

        const displayName = firstName + ' ' + lastName
        const { uid } = await admin.auth().createUser({
          displayName,
          password,
          email
        })
        await admin.auth().setCustomUserClaims(uid, { role })

        const newUser:User ={
          UserId : uid,
          Firstname: firstName,
          Lastname: lastName,
          Email: email,
          Admin: true 
        }
        console.log(newUser)
        const newDbUser = await this.repository.create(newUser);
        result = await this.repository.save(newDbUser); 

        if(result.UserId) return response.status(200).json({succes: true})
        else return response.status(500).json({error: "Something went wrong"})

      }catch(error){
        response.status(500).json({error:error})
      }
    }
}