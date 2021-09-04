import { Response, Request} from "express";
import log from "../logger";
import { omit } from "lodash";
// Event's error
import { CantCreateEvent } from "../errors/event.errors";

// CRUD
import { createEvent } from "../service/event.service";

export async function CreateEventHandler(req:Request, res: Response) {
    try {
        const event = await createEvent(req.body);
        return res.send(omit(event.toJSON()));
    } catch (e) {
        console.log(e);
        if(e instanceof CantCreateEvent){
            log.error(e.message);
            res.status(409).send({
                ErrorName: e.name,
                ErrorMessage : e.message
            });
        }else{
            res.status(500).send("Server Error please try again later");
        }
    }
}