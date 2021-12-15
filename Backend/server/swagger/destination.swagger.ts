export const getAllDestinations = {
    tags: ['Destination'],
    description: "Returns all destinations from the system that the user has access to",
    operationId: 'getAllDestinations',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "A list of all destinations.",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            DestinationId: {
                                type: 'string',
                            },
                            Name: {
                                type: 'string',
                            },
                            Coordinates: {
                                type: 'list',
                            }
                        }
                    }
                }
            }
        },
        "400":{
            description: "Something went wrong",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            error: {
                                type: 'text',
                            },
                        }
                    }
                }
            }
        },
        "500":{
            description: "Catch error",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            error: {
                                type: 'text',
                            },
                        }
                    }
                }
            }
        }
    }
} 

export const getOneDestination = {
    tags: ['Destination'],
    description: "Returns 1 specific destination from the system that the user has access to",
    operationId: 'getOneDestination',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "destinationId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"0ebccde9-6439-4e6b-9fee-bdfb1576a174"   
            }
        },
    ],
    responses: {
        "200": {          
            description: "1 specific destination",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            DestinationId: {
                                type: 'string',
                            },
                            Name: {
                                type: 'string',
                            },
                            Popularity: {
                                type: 'string',
                            },
                            Abbreviation: {
                                type: 'string',
                            },
                            Picture: {
                                type: 'string',
                            },
                            Coordinates: {
                                type: 'list',
                            }
                        }
                    }
                }
            }
        },
        "400":{
            description: "Something went wrong",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            error: {
                                type: 'text',
                            },
                        }
                    }
                }
            }
        },
        "500":{
            description: "Catch error",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            error: {
                                type: 'text',
                            },
                        }
                    }
                }
            }
        }
    }
} 

export const addDestination = {
    tags: ['Destination'],
    description: "add a new destination",
    operationId: 'addDestination',
    parameters: [
        {
            name: "body",
            in: "body",
            required: true,
            schema:{
                type:"object",
                example:{
                    DestinationId: {
                        type: 'string',
                    },
                    Name: {
                        type: 'string',
                    },
                    Popularity: {
                        type: 'string',
                    },
                    Abbreviation: {
                        type: 'string',
                    },
                    Picture: {
                        type: 'string',
                    },
                    Coordinates: {
                        type: 'list',
                    }
                },
                items:{
                    DestinationId: {
                        type: 'string',
                    },
                    Name: {
                        type: 'string',
                    },
                    Popularity: {
                        type: 'string',
                    },
                    Abbreviation: {
                        type: 'string',
                    },
                    Picture: {
                        type: 'string',
                    },
                    Coordinates: {
                        type: 'list',
                    }
                }
            }
        },
    ],
    responses: {
        "200": {          
            description: "1 specific destination",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            DestinationId: {
                                type: 'string',
                            },
                            Name: {
                                type: 'string',
                            },
                            Popularity: {
                                type: 'string',
                            },
                            Abbreviation: {
                                type: 'string',
                            },
                            Picture: {
                                type: 'string',
                            },
                            Coordinates: {
                                type: 'list',
                            }
                        }
                    }
                }
            }
        }
    }
}