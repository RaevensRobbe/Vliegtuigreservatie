// // app.ts
import 'reflect-metadata'
import express, { Request, Response, Router } from 'express'
import { middlewareDemo } from './middleware/demo'
import { createDatabase } from 'typeorm-extension'
import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm'

import { IController } from './controllers/crud.controller'
import {
  CountryController,
  ICountryController,
} from './controllers/country.controller'
import {
  DestinationController,
  IDestinationController,
} from './controllers/destination.controller'
import {
  FlightController,
  IFlightController,
} from './controllers/flight.controller'
import {
  PlaneController,
  IPlaneController,
} from './controllers/plane.controller'
import {
  TicketController,
  ITicketController,
} from './controllers/ticket.controller'
import { UserController, IUserController } from './controllers/user.controller'

import seedDatabase from './seeders/seeder'

import admin from 'firebase-admin'
import dotenv from 'dotenv'
import authMiddleware from './auth/firebaseAuthMiddleware'
import cors from 'cors' // vergeet niet npm install CORS en npm install @types/cors te doen. Volgens mij heb je enkel @types/cors geïnstalleerd

import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'
import { PopularDestinationResolver } from './resovlers/popularDestinationResolver'
import { buildSchema } from 'type-graphql'

dotenv.config() // This will load in the GOOGLE_APPLICATION_CREDENTIALS

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

// APP SETUP
const app = express(),
  port = process.env.PORT || 3001

// MIDDLEWARE
app.use(express.json()) // for parsing application/json
//app.use(authMiddleware);
app.use(cors())
;(async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions()

  // Create the database before we make the connection. This will also add the tables
  createDatabase({ ifNotExist: true }, connectionOptions)
    .then(() => console.log('Database has been created!'))
    .then(createConnection)
    .then(async (connection: Connection) => {
      seedDatabase(connection)

      // ROUTES
      app.get('/', (request: Request, response: Response) => {
        response.send('Welcome, just know: you matter!')
      })

      app.get('/test-auth', (request: Request, response: Response) => {
        response.send('authenticated !!!!!')
      })

      console.log('this far 1')

      interface AppControllers {
        country: ICountryController
        destination: IDestinationController
        flight: IFlightController
        plane: IPlaneController
        ticket: ITicketController
        user: IUserController
      }

      const controllers: AppControllers = {
        country: new CountryController(),
        destination: new DestinationController(),
        flight: new FlightController(),
        plane: new PlaneController(),
        ticket: new TicketController(),
        user: new UserController(),
      }

      console.log('this far 2')

      Object.entries(controllers).forEach((entry: any) => {
        const key = entry[0] as string,
          controller = entry[1] as IController
        app.use(`/api/v1/${key}`, controller.router)
      })

      console.log('this far 3')

      // APP START
      app.listen(port, () => {
        console.info(`\nServer 👾 \nListening on http://localhost:${port}/`)
      })
    })
    .catch(error => console.error(error))
})()
;(async () => {
  const port = process.env.PORT || 8881
  // All our code
  //connection to db
  const conn: MongoConnectionOptions = {
    name: 'mongodb',
    type: 'mongodb',
    url: `mongodb+srv://robbegraphql:-Strong2001-@cluster0.u6pka.mongodb.net/MCTAirlines?retryWrites=true&w=majority`,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    useUnifiedTopology: true,
    entities: [`${__dirname}/entities/popularDestination{.ts,.js}`],
    ssl: true,
  }

  await createConnection(conn).catch(ex => console.log(ex))

  // ROUTES
  app.get('/', (request: Request, response: Response) => {
    response.json({ welcome: 'just know: you matter!' })
  })

  /**
   *
   * @description create the graphql schema with the imported resolvers
   */

  let schema: GraphQLSchema = {} as GraphQLSchema

  const createSchema = async () => {
    await buildSchema({
      resolvers: [PopularDestinationResolver],
    }).then(_ => {
      schema = _
    })

    // GraphQL init middleware
    app.use(
      '/v1/', // Url, do you want to keep track of a version?
      graphqlHTTP((request, response) => ({
        schema: schema,
        context: { request, response },
        graphiql: true,
      })),
    )

    // APP START -> also covered in basic Express part
    app.listen(port, () => {
      console.info(
        `\nWelcome 👋\nGraphQL server @ http://localhost:${port}/v1\n`,
      )
    })
  }

  createSchema()
})()
