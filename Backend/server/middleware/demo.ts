import { NextFunction, Request, Response } from 'express';

// Every request gets a header set.
export const middlewareDemo = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    response.set('Grapje', ':-)');
    next();
};