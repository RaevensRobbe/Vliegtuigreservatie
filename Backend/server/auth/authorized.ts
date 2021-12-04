import { Request, Response } from "express";
 
export function isAuthorized(opts: { hasRole:Array<'admin'>, allowSameUser?: boolean }) {
   return (req: Request, res: Response, next: Function) => {
       const { role, email, uid } = res.locals
       const { id } = req.params
 
       if (opts.allowSameUser && id && uid === id){
        console.log('yeey')
        return next();
       }
           
 
       if (!role){
        console.log('neey')
        return res.status(403).send();
       }
           
 
       if (opts.hasRole.includes(role)){
        console.log('yeey')
        return next();
       }
           
 
       return res.status(403).send();
   }
}