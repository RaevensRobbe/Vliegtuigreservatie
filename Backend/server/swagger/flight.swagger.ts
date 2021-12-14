export const getAllFlights = {
    tags: ['Flight'],
    description: "Returns all flights from the system that the user has access to",
    operationId: 'getAllFlights',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "All flights",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            FlightId: {
                                type: 'string',
                            },
                            Name: {
                                type: 'string',
                            },
                            Date: {
                                type: 'string',
                            },
                            Price: {
                                type: 'string',
                            },
                            Gate: {
                                type: 'int',
                            },
                            DestinationId: {
                                type: 'uuid',
                            },
                            StartId: {
                                type: 'uuid',
                            },
                            PlaneId: {
                                type: 'uuid',
                            },
                        }
                    }
                }
            }
        }
    }
} 

export const getPastFlights = {
    tags: ['Flight'],
    description: "Returns all past flights from the system that the user has access to",
    operationId: 'getPastFlights',
    security: [
        {
            BearerAuth:[{
                type: "http",
                scheme: "bearer"
            }]
        }
    ],
    responses: {
        "200": {          
            description: "All past flights",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            FlightId: {
                                type: 'string',
                            },
                            Name: {
                                type: 'string',
                            },
                            Date: {
                                type: 'string',
                            },
                            Price: {
                                type: 'string',
                            },
                            Gate: {
                                type: 'int',
                            },
                            DestinationId: {
                                type: 'uuid',
                            },
                            StartId: {
                                type: 'uuid',
                            },
                            PlaneId: {
                                type: 'uuid',
                            },
                            Destination: {
                                type: 'list',
                            },
                            Start: {
                                type: 'list',
                            },
                            Ticket: {
                                type: 'list',
                            },
                            Plane: {
                                type: 'list',
                            },
                        }
                    }
                }
            }
        }
    }
} 

export const getUpcomingFlights = {
    tags: ['Flight'],
    description: "Returns all upcoming flights from the system that the user has access to",
    operationId: 'getUpcomingFlights',
    security: [
        {
            BearerAuth:[{
                type: "http",
                scheme: "bearer"
            }]
        }
    ],
    responses: {
        "200": {          
            description: "Allupcoming flights",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            FlightId: {
                                type: 'string',
                            },
                            Name: {
                                type: 'string',
                            },
                            Date: {
                                type: 'string',
                            },
                            Price: {
                                type: 'string',
                            },
                            Gate: {
                                type: 'int',
                            },
                            DestinationId: {
                                type: 'uuid',
                            },
                            StartId: {
                                type: 'uuid',
                            },
                            PlaneId: {
                                type: 'uuid',
                            },
                            Destination: {
                                type: 'list',
                            },
                            Start: {
                                type: 'list',
                            },
                            Ticket: {
                                type: 'list',
                            },
                            Plane: {
                                type: 'list',
                            },
                        }
                    }
                }
            }
        }
    }
} 

export const getOneFlight = {
    tags: ['Flight'],
    description: "Returns a sepecified flightfrom the system that the user has access to",
    operationId: 'getOneFlights',
    security: [
        {
            BearerAuth:[]
        }
    ],
    parameters: [
        {
            name: "flightId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"05fc5c6f-f4c8-4218-9060-fe87a4834c98"   
            }
        },
    ],
    responses: {
        "200": {          
            description: "Allupcoming flights",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            FlightId: {
                                type: 'string',
                            },
                            Name: {
                                type: 'string',
                            },
                            Date: {
                                type: 'string',
                            },
                            Price: {
                                type: 'string',
                            },
                            Gate: {
                                type: 'int',
                            },
                            DestinationId: {
                                type: 'uuid',
                            },
                            StartId: {
                                type: 'uuid',
                            },
                            PlaneId: {
                                type: 'uuid',
                            },
                            Destination: {
                                type: 'list',
                            },
                            Start: {
                                type: 'list',
                            }
                        }
                    }
                }
            }
        }
    }
} 

export const getFlightInfo = {
    tags: ['Flight'],
    description: "Returns all flights between the given destinations from the system that the user has access to",
    operationId: 'getFlightInfo',
    security: [
        {
            BearerAuth:[]
        }
    ],
    parameters: [
        {
            name: "startId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"a604f5d6-78bb-4321-95f0-f2e29a20f316"   
            }
        },
        {
            name: "destinationId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"39a0465c-efbc-4260-b7df-1272b3bc560b"   
            }
        },
    ],
    responses: {
        "200": {          
            description: "Allupcoming flights",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            FlightId: {
                                type: 'string',
                            },
                            Date: {
                                type: 'string',
                            },
                            Price: {
                                type: 'string',
                            },
                            DestinationId: {
                                type: 'uuid',
                            },
                            StartId: {
                                type: 'uuid',
                            },
                            Destination: {
                                type: 'list',
                            },
                            Start: {
                                type: 'list',
                            }
                        }
                    }
                }
            }
        }
    }
} 

export const getSeatsInfo = {
    tags: ['Flight'],
    description: "Returns seatsInfo from a specified flight from the system that the user has access to",
    operationId: 'getSeatsInfo',
    security: [
        {
            BearerAuth:[]
        }
    ],
    parameters: [
        {
            name: "flightId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"05fc5c6f-f4c8-4218-9060-fe87a4834c98"   
            }
        },
    ],
    responses: {
        "200": {          
            description: "get seatsInfo",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            FlightId: {
                                type: 'string',
                            },
                            Plane: {
                                type: 'list',
                            }
                        }
                    }
                }
            }
        }
    }
} 

export const getTakenSeatsInfo = {
    tags: ['Flight'],
    description: "Returns Takenseats from a specified flight from the system that the user has access to",
    operationId: 'getTakenSeatsInfo',
    security: [
        {
            BearerAuth:[]
        }
    ],
    parameters: [
        {
            name: "flightId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"05fc5c6f-f4c8-4218-9060-fe87a4834c98"   
            }
        },
    ],
    responses: {
        "200": {          
            description: "get Takenseats Info",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            FlightId: {
                                type: 'string',
                            },
                            Plane: {
                                type: 'list',
                            },
                            Ticket:{
                                type:'list'
                            }
                        }
                    }
                }
            }
        }
    }
} 

export const getPlaneInfo = {
    tags: ['Flight'],
    description: "Returns seats from a specified flight from the system that the user has access to",
    operationId: 'getPlaneInfo',
    security: [
        {
            BearerAuth:[]
        }
    ],
    parameters: [
        {
            name: "flightId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"05fc5c6f-f4c8-4218-9060-fe87a4834c98"   
            }
        },
    ],
    responses: {
        "200": {          
            description: "get Takenseats Info",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            PlaneId: {
                                type: 'string',
                            },
                            Plane: {
                                type: 'list',
                            },
                        }
                    }
                }
            }
        }
    }
} 

export const getUserFlights = {
    tags: ['Flight'],
    description: "Returns all flights from a specified user from the system that the user has access to",
    operationId: 'getPlaneInfo',
    security: [
        {
            BearerAuth:[]
        }
    ],
    parameters: [
        {
            name: "userId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"zwqpY68qpoS14qKj1RTZB2UGzJx2"   
            }
        },
    ],
    responses: {
        "200": {          
            description: "get flights from a specified user",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            Date: {
                                type: 'string',
                            },
                            Price: {
                                type: 'string',
                            },
                            Destination: {
                                type: 'string',
                            },
                            Start: {
                                type: 'string',
                            },
                            Ticket: {
                                type: 'string',
                            },
                        }
                    }
                }
            }
        }
    }
} 

export const getFlightInfoBetween = {
    tags: ['Flight'],
    description: "Returns info about a flight from a specified date from the system that the user has access to",
    operationId: 'getFlightInfoBetween',
    security: [
        {
            BearerAuth:[]
        }
    ],
    parameters: [
        {
            name: "startId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"a604f5d6-78bb-4321-95f0-f2e29a20f316"   
            }
        },
        {
            name: "destinationId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"39a0465c-efbc-4260-b7df-1272b3bc560b"   
            }
        },
        {
            name: "date",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"2021-12-01 13:38:34"   
            }
        },
    ],
    responses: {
        "200": {          
            description: "info about the flight",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            FlightId: {
                                type: 'uuid',
                            },
                            Date: {
                                type: 'string',
                            },
                            Price: {
                                type: 'double',
                            },
                            DestinationId: {
                                type: 'uuid',
                            },
                            StartId: {
                                type: 'uuid',
                            },
                            Destination: {
                                type: 'object',
                            },
                            Start: {
                                type: 'object',
                            },
                        }
                    }
                }
            }
        }
    }
} 

export const getReviews = {
    tags: ['Flight'],
    description: "Return the reviews form a specified flight from the system that the user has access to",
    operationId: 'getReviews',
    security: [
        {
            BearerAuth:[
                { 
                    type: "http",
                    scheme: "bearer"
                }
            ]
        }
    ],
    parameters: [
        {
            name: "flightId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"05fc5c6f-f4c8-4218-9060-fe87a4834c98"   
            }
        }
    ],
    responses: {
        "200": {          
            description: "info about the flight",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            FlightId: {
                                type: 'uuid',
                            },
                            Name: {
                                type: 'string',
                            },
                            Date: {
                                type: 'double',
                            },
                            Destination: {
                                type: 'object',
                            },
                            Start: {
                                type: 'object',
                            },
                            Ticket:{
                                type: 'array'
                            }
                        }
                    }
                }
            }
        }
    }
} 

export const createFlight = {
    tags: ['Flight'],
    description: "Create a new flight",
    operationId: 'createFlight',
    parameters: [
        {
            name: "body",
            in: "body",
            required: true,
            example:{
                FlightId: {
                    type: 'string',
                },
                Name: {
                    type: 'string',
                },
                Date: {
                    type: 'string',
                },
                Price: {
                    type: 'string',
                },
                Gate: {
                    type: 'int',
                },
                DestinationId: {
                    type: 'uuid',
                },
                StartId: {
                    type: 'uuid',
                },
                PlaneId: {
                    type: 'uuid',
                },
            }
        },
    ],
    
    responses: {
        "200": {          
            description: "Added",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            success: {
                                type: 'boolean',
                            },
                        }
                    }
                }
            }
        }
    }
}

export const updateFlight = {
    tags: ['Flight'],
    description: "Update a new flight",
    operationId: 'updateFlight',
    parameters: [
        {
            name: "body",
            in: "body",
            required: true,
            example:{
                FlightId: {
                    type: 'string',
                },
                Name: {
                    type: 'string',
                },
                Date: {
                    type: 'string',
                },
                Price: {
                    type: 'string',
                },
                Gate: {
                    type: 'int',
                },
                DestinationId: {
                    type: 'uuid',
                },
                StartId: {
                    type: 'uuid',
                },
                PlaneId: {
                    type: 'uuid',
                },
            }
        },
        {
            name: "flightId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"05fc5c6f-f4c8-4218-9060-fe87a4834c98"   
            }
        }
    ],
    
    responses: {
        "200": {          
            description: "Updated",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            success: {
                                type: 'boolean',
                            },
                        }
                    }
                }
            }
        }
    }
}