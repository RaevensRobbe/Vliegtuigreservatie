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
        }
    }
} 