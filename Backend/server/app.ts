// // app.ts
import express, { Request, Response, Router } from 'express';
import { middlewareDemo } from './middleware/demo';
import {createDatabase} from "typeorm-extension";
import { Connection, ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';

import { IController } from './controllers/crud.controller';
import { CountryController, ICountryController } from './controllers/country.controller';
import { DestinationController, IDestinationController } from './controllers/destination.controller'
import { FlightController, IFlightController } from './controllers/flight.controller'
import { PlaneController, IPlaneController } from './controllers/plane.controller'
import { TicketController, ITicketController } from './controllers/ticket.controller'
import { UserController, IUserController } from './controllers/user.controller'

import seedDatabase from './seeders/seeder';


(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions();
  
  // Create the database before we make the connection. This will also add the tables
  createDatabase({ifNotExist: true}, connectionOptions) 
  .then(() => console.log('Database has been created!'))
  .then(createConnection)
  .then(async (connection: Connection) => {

    //seedDatabase(connection);

    // APP SETUP
    const app = express(),
      port = process.env.PORT || 3001;

    // MIDDLEWARE
    app.use(express.json()); // for parsing application/json
    app.use(middlewareDemo);
    // ROUTES
    app.get('/', (request: Request, response: Response) => {
      response.send(`Welcome, just know: you matter!`);
    });

    interface IAppControllers {
      'country': ICountryController
      'destination': IDestinationController
      'flight': IFlightController
      'plane': IPlaneController
      'ticket': ITicketController
      'user': IUserController
  }

    const controllers: IAppControllers = {
      'country': new CountryController(),
      'destination': new DestinationController(),
      'flight': new FlightController(),
      'plane': new PlaneController(),
      'ticket': new TicketController(),
      'user': new UserController()
    };

    Object.entries(controllers).forEach((entry: any) => {
        const key = entry[0] as string,
              controller = entry[1] as IController;
        app.use(`/api/v1/${key}`, controller.router);
    });

    // APP START
    app.listen(port, () => {
      console.info(`\nServer 👾 \nListening on http://localhost:${port}/`);
    });

  })
  .catch(error => console.error(error));

})();