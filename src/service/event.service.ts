import { DocumentDefinition } from "mongoose";
import { CantCreateEvent, UnknownError } from "../errors/event.errors";
import log from "../logger";
import Event, { eventDocument } from "../model/event.model";

export async function createEvent(input: DocumentDefinition<eventDocument>) {
  try {
    return await Event.create(input);
  } catch (error) {
    console.log(error);
    throw new CantCreateEvent("Error while Creating an event");
  }
}

export async function updateEvent() {}

export async function deleteEvent() {}

export async function getEvents() {}
