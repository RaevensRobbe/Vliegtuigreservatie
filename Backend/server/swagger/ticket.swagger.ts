export const getAllTickets = {
    tags: ['Ticket'],
    description: "Returns all tickets from the system that the user has access to",
    operationId: 'getAllTickets',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "All tickets",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            TicketId: {
                                type: 'string',
                            },
                            Seat: {
                                type: 'list',
                            },
                            Return: {
                                type: 'boolean',
                            },
                            ReturnDate: {
                                type: 'string',
                            },
                            Persons: {
                                type: 'list',
                            },
                            Rating: {
                                type: 'int',
                            },
                            Review: {
                                type: 'string',
                            }
                        }
                    }
                }
            }
        },
        "400":{
            description: "Data is undefined",
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

export const getOneTicket = {
    tags: ['Ticket'],
    description: "Returns a specific ticket from the system that the user has access to",
    operationId: 'getOneTicket',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "ticketId",
            in: "path",
            required: true,
            schema:{
                type: "string",
                example:"0e8c8f23-187f-46d0-a29e-ec1b52c2914e"
            }
        },
    ],
    responses: {
        "200": {          
            description: "1 ticket",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        items: {
                            TicketId: {
                                type: 'string',
                            },
                            Seat: {
                                type: 'list',
                            },
                            Return: {
                                type: 'boolean',
                            },
                            ReturnDate: {
                                type: 'string',
                            },
                            Persons: {
                                type: 'list',
                            },
                            Rating: {
                                type: 'int',
                            },
                            Review: {
                                type: 'string',
                            },
                            Flight: {
                                type: 'object',
                            }
                        }
                    }
                }
            }
        },
        "400":{
            description: "Data is undefined",
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

export const addTicket = {
    tags: ['Ticket'],
    description: "Add a new ticket",
    operationId: 'addTicket',
    parameters: [
        {
            TicketId: "8d7443e8-624d-4bf0-9c54-3705edfa7de2",
            Seat: [
              {
                "class": "Business",
                "column": "A",
                "row": 1
              },
              {
                "class": "Business",
                "column": "B",
                "row": 1
              }
            ],
            Return: 1,
            ReturnDate: "2021-12-25 05:30:34",
            Persons: ["API docs", "SwaggerUi"],
            Rating: "6",
            Review: "Some rating",
            User: "R8ba4Fy2gWY04gq4z3NSuQegaYQ2",
            Flight: "65ccb031-dd5c-4ce8-af07-dadc5c01274d"
          }
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

export const addReview = {
    tags: ['Ticket'],
    description: "Add a new review to a ticket",
    operationId: 'addReview',
    parameters: [
        {
            
            Rating: "6",
            Review: "Some rating"
          },
          {
            name: "ticketId",
            in: "path",
            required: true,
            schema:{
                type: "string",
                example:"7be143f6-75ff-4820-b865-cfdb7fc5fb8c"
            }
          }
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
        "406":{
            description: "No parameter",
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