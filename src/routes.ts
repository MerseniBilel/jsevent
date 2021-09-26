import { Express, Request, Response } from "express";
import { CreateEventHandler, UpdateEventHandler, DeleteEventHandler, FetchEventsHandler } from "./controller/event.controller";
import { createUserHandler, loginUserHandler, deleteUserHandler, fetchUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { CreateEventSchema, createUserSchema, loginUserSchema } from "./schema/user.schema";

export default function(app: Express){
    app.get('/healthchekroute',(req : Request, res: Response) => res.sendStatus(200));
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
    app.delete("/api/users/:id", deleteUserHandler);
    app.get("/api/users", fetchUserHandler );
    app.get("/api/events", FetchEventsHandler);
    app.put("/api/events/:id", UpdateEventHandler);
    app.delete("/api/events/:id",DeleteEventHandler);
    app.post("/api/auth", validateRequest(loginUserSchema) , loginUserHandler);
    app.post("/api/events", validateRequest(CreateEventSchema), CreateEventHandler);

}