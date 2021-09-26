import { Response, Request } from "express";
import log from "../logger";
import { omit } from "lodash";
// Event's error
import { CantCreateEvent } from "../errors/event.errors";

// CRUD
import {
  createEvent,
  deleteEvent,
  updateEvent,
  getEvents,
} from "../service/event.service";

//update an event
export async function UpdateEventHandler(req: Request, res: Response) {
  try {
    const updatedEvent = await updateEvent(req.params.id);
    res.status(200).send(updatedEvent);
  } catch (error) {
    res.status(500).send({
      errortype: "Server error",
      errormessage: "server error while updating the event",
    });
  }
}

//delete an event
export async function DeleteEventHandler(req: Request, res: Response) {
  try {
      const deletedEvent =  await deleteEvent(req.params.id);
      res.status(200).send(deletedEvent);
  } catch (error) {
    res.status(500).send({
      errortype: "Server error",
      errormessage: "server error while deleting the event",
    });
  }
}

// get all events 
export async function FetchEventsHandler(req: Request, res: Response) {
  try {
      const events =  await getEvents();
      res.status(200).send(events);
  } catch (error) {
    res.status(500).send({
      errortype: "Server error",
      errormessage: "server error while fetching events",
    });
  }
}
// create an event
export async function CreateEventHandler(req: Request, res: Response) {
  try {
    const event = await createEvent(req.body);
    return res.send(omit(event.toJSON()));
  } catch (e) {
    console.log(e);
    if (e instanceof CantCreateEvent) {
      log.error(e.message);
      res.status(409).send({
        ErrorName: e.name,
        ErrorMessage: e.message,
      });
    } else {
      res.status(500).send({
        errortype: "Server error",
        errormessage: "server error try restart the server",
      });
    }
  }
}
