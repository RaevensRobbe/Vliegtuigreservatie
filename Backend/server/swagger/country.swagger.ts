export const getAllCountries = {
    tags: ['Country'],
    description: "Returns all countries from the system that the user has access to",
    operationId: 'getAllCountries',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "All countries",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            CountryId: {
                                type: 'string',
                            },
                            Name: {
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

export const getPopularCountries = {
    tags: ['Country'],
    description: "Returns the most popular countries from the system that the user has access to",
    operationId: 'getPopularCountries',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "Most popular countries",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            Name: {
                                type: 'string',
                            },
                            Dest: {
                                type: 'list',
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

export const getDestinationsFromCountry = {
    tags: ['Country'],
    description: "Return the destinations from the specified country from the system that the user has access to",
    operationId: 'getDestinationsFromCountrys',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "countryId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example: "f6f62734-149c-4aee-af6a-37f2684d968a" 
            }
        },
    ],
    responses: {
        "200": {          
            description: "Destinations from specified country",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            Name: {
                                type: 'string',
                            },
                            Dest: {
                                type: 'list',
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

export const getAllCountriesAndDestinations = {
    tags: ['Country'],
    description: "Return all countries with their destinations from the system that the user has access to",
    operationId: 'getAllCountriesAndDestinations',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "All countries with their destinations",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            CountryId: {
                                type: 'string',
                            },
                            Name: {
                                type: 'string',
                            },
                            Dest: {
                                type: 'list',
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

export const getOneCountry = {
    tags: ['Country'],
    description: "Returns 1 specific country from the system that the user has access to",
    operationId: 'getOneCountry',
    security: [
        {
            bearerAuth: []
        }
    ],
    parameters: [
        {
            name: "countryId",
            in: "path",
            required: true,
            schema:{
                type:"string",
                example:"f6f62734-149c-4aee-af6a-37f2684d968a"   
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
                            CountryId: {
                                type: 'string',
                            },
                            Name: {
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

export const addCountry = {
    tags: ['Country'],
    description: "Add a new country",
    operationId: 'addCountry',
    parameters: [
        {
            name: "body",
            in: "body",
            required: true,
            schema:{
                CountryId: {
                    type: 'string',
                },
                Name: {
                    type: 'string',
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