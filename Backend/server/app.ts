// // app.ts
// import express, { Request, Response, Router } from 'express';
// import { middlewareDemo } from './middleware/demo';
// import { BirdController, IBirdController } from './controllers/bird.controller'
// import {createDatabase} from "typeorm-extension";
// import { Connection, ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';
// import seedDatabase from './seeders/seeder';
// import { IUserController, UserController } from './controllers/user.controller';
// import { IObservationController, ObservationController } from './controllers/observation.controller';
// import { IController } from './controllers/crud.controller';


// (async () => {
//   const connectionOptions: ConnectionOptions = await getConnectionOptions();
  
//   // Create the database before we make the connection. This will also add the tables
//   createDatabase({ifNotExist: true}, connectionOptions) 
//   .then(() => console.log('Database has been created!'))
//   .then(createConnection)
//   .then(async (connection: Connection) => {

//     seedDatabase(connection);

//     // APP SETUP
//     const app = express(),
//       port = process.env.PORT || 3001;

//     // MIDDLEWARE
//     app.use(express.json()); // for parsing application/json
//     app.use(middlewareDemo);
//     // ROUTES
//     app.get('/', (request: Request, response: Response) => {
//       response.send(`Welcome, just know: you matter!`);
//     });

//     interface AppControllers {
//       'bird': IBirdController
//       'user': IUserController
//       'observation': IObservationController
//   }

//     const controllers: AppControllers = {
//       'bird': new BirdController(),
//       'user': new UserController(),
//       'observation': new ObservationController()
//     };

//     // Entries: [ ['bird', 'BirdController'], ['user', 'UserController'], ['observation', 'ObservationController'] ]
//     Object.entries(controllers).forEach((entry: any) => {
//         const key = entry[0] as string,
//               controller = entry[1] as IController;
//         app.use(`/${key}`, controller.router);
//     });


//     // APP START
//     app.listen(port, () => {
//       console.info(`\nServer 👾 \nListening on http://localhost:${port}/`);
//     });

//   })
//   .catch(error => console.error(error));

// })();