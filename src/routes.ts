import { Express, Request, Response } from "express";
import { CreateEventHandler } from "./controller/event.controller";
import { createUserHandler, loginUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { CreateEventSchema, createUserSchema, loginUserSchema } from "./schema/user.schema";

export default function(app: Express){
    app.get('/healthchekroute',(req : Request, res: Response) => res.sendStatus(200));
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
    app.post("/api/auth", validateRequest(loginUserSchema) , loginUserHandler);
    app.post("/api/events", validateRequest(CreateEventSchema), CreateEventHandler);

}