export const getAllUsers = {
    tags: ['User'],
    description: "Returns all users from the system that the user has access to",
    operationId: 'getAllUsers',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "All users",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            UserId: {
                                type: 'string',
                            },
                            Firstname: {
                                type: 'string',
                            },
                            Lastname: {
                                type: 'string',
                            },
                            Email: {
                                type: 'string',
                            },
                            Admin: {
                                type: 'boolean',
                            }
                        }
                    }
                }
            }
        }
    }
} 

export const getOneUser = {
    tags: ['User'],
    description: "Returns a specific user from the system that the user has access to",
    operationId: 'getOneUser',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "userId",
            in: "path",
            required: true,
            schema:{
                type: "string",
                example:"zwqpY68qpoS14qKj1RTZB2UGzJx2"
            }
        },
    ],
    responses: {
        "200": {          
            description: "1 user",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            UserId: {
                                type: 'string',
                            },
                            Firstname: {
                                type: 'string',
                            },
                            Lastname: {
                                type: 'string',
                            },
                            Email: {
                                type: 'string',
                            },
                            Admin: {
                                type: 'boolean',
                            }
                        }
                    }
                }
            }
        }
    }
} 

export const getAdmin = {
    tags: ['User'],
    description: "Returns if a specific user is an admin from the system that the user has access to",
    operationId: 'getAdmin',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "userId",
            in: "path",
            required: true,
            schema:{
                type: "string",
                example:"zwqpY68qpoS14qKj1RTZB2UGzJx2"
            }
        },
    ],
    responses: {
        "200": {          
            description: "Admin or not",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            Admin: {
                                type: 'boolean',
                            }
                        }
                    }
                }
            }
        }
    }
} 