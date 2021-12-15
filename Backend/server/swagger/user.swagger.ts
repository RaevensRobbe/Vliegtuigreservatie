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

export const addUser = {
    tags: ['User'],
    description: "Add a new user",
    operationId: 'addUser',
    parameters: [
        {
            name: "body",
            in: "body",
            required: true,
            example:{
                UserId:"ekgG5tSNFpd0WYjEDxCWwT7IRly2",
                Firstname: "Swagger",
                Lastname: "Ui",
                Email:"swagger.user@email.com",
                Admin: false
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
        },
        "500":{
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
        }
    }
}

export const updateUser = {
    tags: ['User'],
    description: "update a new user",
    operationId: 'updateUser',
    parameters: [
        {
            name: "body",
            in: "body",
            required: true,
            example:{
                UserId:"H45EEtAdhqSHi9AaTgNeeGAezF72",
                Firstname: "Hadley",
                Lastname: "Ring",
                Email:"Hadley_Ring6226@nanoff.biz",
                Admin: false
            }
        },
    ],
    
    responses: {
        "200": {          
            description: "Updated user",
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
        },
        "500":{
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
        }
    }
}

export const addAdmin = {
    tags: ['User'],
    description: "Add a new admin",
    operationId: 'addAdmin',
    parameters: [
        {
            name: "body",
            in: "body",
            required: true,
            example:{
                UserId:"ekgG5tSNFpd0WYjEDxCWwT7IRly3",
                Firstname: "Swagger",
                Lastname: "Admin",
                Email:"swagger.admin@email.com",
                Admin: true
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
        },
        "500":{
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
        }
    }
}