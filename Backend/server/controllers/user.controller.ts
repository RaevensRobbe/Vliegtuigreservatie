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

    createUser = async (req: Request, res: Response, next: NextFunction) => {
     try{
      console.log(`data van frontend ${req.body}`);
      let result:any

      if(req.body.data === null){
        response.status(400).json({error:"No data has been provided"})
      }else{
        if(req.body.data.id === undefined){
          response.status(400).json({error:"UserID is missing"})
        }else if(req.body.data.firstname === undefined){
          response.status(400).json({error:"FirstName is missing"})
        }else if(req.body.data.lastname === undefined){
          response.status(400).json({error:"LastName is missing"})
        }else if(req.body.data.email === undefined){
          response.status(400).json({error:"Email is missing"})
        }else{
          const newUser:User ={
            UserId : req.body.data.id,
            Firstname: req.body.data.firstname,
            Lastname: req.body.data.lastname,
            Email: req.body.data.email,
            Admin: false
          } 
          //Check if user exists
          const checkUser = await this.repository.findOne({UserId:req.body.data.id})
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

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
      try{
        if(req.body.data === null){
          response.status(400).json({error:"No data has been provided"})
        }else{
          const update = await this.repository.update({UserId: req.params.id},{Firstname: req.body.data.firstname, Lastname: req.body.data.lastname, Email: req.body.data.email})
          return res.status(200).json({succes: true})
        }
      }catch(error){
        response.status(500).json({error:error})
      }
    }

    createAdminUser = async (req: Request, response: Response, next: NextFunction) => {
      try{
        let result:any
        const { displayName, password, email, role } = req.body.data
        const uid = "w8YZuYZB7ePqF5cW7cG662eyZjw1"
 
       if (!displayName || !password || !email || !role) {
           return response.status(400).send({ message: 'Missing fields' })
       }
      await admin.auth().setCustomUserClaims(uid, { role })

      const newUser:User ={
        UserId : uid,
        Firstname: displayName.split(' ')[0],
        Lastname: displayName.split(' ')[1],
        Email: email,
        Admin: true 
      }
      const newDbUser = await this.repository.create(newUser);
      result = await this.repository.save(newDbUser); 

      if(result.UserId) return response.status(200).json({succes: true})
      else return response.status(500).json({error: "Something went wrong"})

      }catch(error){
        response.status(500).json({error:error})
      }
    }
}