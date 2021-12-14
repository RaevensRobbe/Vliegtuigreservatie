export const getAllPlanes = {
    tags: ['Plane'],
    description: "Returns all planes from the system that the user has access to",
    operationId: 'getAllPlanes',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "All planes",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            PlaneId: {
                                type: 'uuid',
                            },
                            Name: {
                                type: 'string',
                            },
                            Type: {
                                type: 'string',
                            },
                            Price: {
                                type: 'double',
                            },
                            EconomySeats: {
                                type: 'int',
                            },
                            BusinessSeats: {
                                type: 'int',
                            }
                        }
                    }
                }
            }
        }
    }
} 

export const getOnePlane = {
    tags: ['Plane'],
    description: "Returns a specific plane from the system that the user has access to",
    operationId: 'getOnePlane',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "planeId",
            in: "path",
            required: true,
            schema:{
                type: "string",
                example:"e1ebd896-c6cb-41c2-a795-69635f5c9873"
            }
        },
    ],
    responses: {
        "200": {          
            description: "1 planes",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            PlaneId: {
                                type: 'uuid',
                            },
                            Name: {
                                type: 'string',
                            },
                            Type: {
                                type: 'string',
                            },
                            Price: {
                                type: 'double',
                            },
                            EconomySeats: {
                                type: 'int',
                            },
                            BusinessSeats: {
                                type: 'int',
                            }
                        }
                    }
                }
            }
        }
    }
} 