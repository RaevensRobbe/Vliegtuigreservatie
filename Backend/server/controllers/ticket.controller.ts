import { Request, Response, NextFunction, Router } from 'express';
import { Ticket } from "../entities/ticket"; 
import { CrudController, IController, ICrudController } from './crud.controller';
import {User } from '../entities/user';

/**
 * The interface to use for every Ticket Controller.
 */
 export interface ITicketController extends ICrudController, IController  {
     test: string;
}

export class TicketController extends CrudController<Ticket> implements ITicketController {
    public router = Router();
    public test = 'OK';

    constructor() {
        super(Ticket); // Initialize the parent constructor
        this.router.get('/all', this.all);
        this.router.get('/:id', this.one);
        this.router.post('/createTicket', this.createTicket);
    }

    createTicket = async (req: Request, response: Response, next: NextFunction) => {
        try{
            console.log(`data van frontend ${req.body}`);
            let result
            if(req.body === null) {
                response.status(400).json({error:'No data has been provided'})
            }else{

                if(req.body.data.seatData.length === 0){
                    response.status(400).json({error:'Seat data is missing'})
                }else if(req.body.data.persons.length === 0){
                    response.status(400).json({error:'Ticket needs to have a least 1 passenger'})
                }else if(req.body.data.userId === undefined){
                    response.status(400).json({error:'UserId is missing'})
                }else if(req.body.data.flightId === undefined){
                    response.status(400).json({error:'FlightId is missing'})
                }
                else{
                    const newTicket:Ticket ={
                        Seat: req.body.data.seatData,
                        Return: req.body.data.return,
                        ReturnDate: req.body.data.returnDate,
                        Persons: req.body.data.persons,
                        Rating: 0, 
                        Review:'',
                        User:    {
                            UserId: req.body.data.userId,
                          },
                        Flight: req.body.data.flightId
                    } 

                    const newDbTicket = await this.repository.create(newTicket);
                    result = await this.repository.save(newDbTicket); 

                    if(result === {}){
                        return response.status(500).json({error:"Something went wrong"})
                    }else{
                        return response.status(200).json({succes: true})
                    }
                }
            }
        }
        catch(error) {
            response.status(500).json({error:{error}})
        }
    }
}