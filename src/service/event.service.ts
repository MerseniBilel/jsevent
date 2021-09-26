import { DocumentDefinition } from "mongoose";
import { CantCreateEvent, UnknownError } from "../errors/event.errors";
import Event, { eventDocument } from "../model/event.model";
import Archive from "../model/archive.model";

export async function createEvent(input: DocumentDefinition<eventDocument>) {
  try {
    return await Event.create(input);
  } catch (error) {
    console.log(error);
    throw new CantCreateEvent("Error while Creating an event");
  }
}

export async function updateEvent(input : string) {
  try {
    const eventToUpdate = await Event.findOne({_id : input});
    if(eventToUpdate){
      eventToUpdate.goingMembers++;
      await eventToUpdate.save();
    }
    return eventToUpdate
  } catch (error) {
    throw Error("error while updating the going number");
  }
}

export async function deleteEvent(input : string) {
  try {
    const eventToDelete = await Event.findOneAndDelete({_id : input});
    const archive = await Archive.find();
    if(eventToDelete){
      archive[0].deletedEvent.push(eventToDelete);
      await archive[0].save();
    }
    return eventToDelete;
  } catch (error) {
    throw Error("error while deleting the event")
  }
}

export async function getEvents() {
  try {
    return await Event.find();
  } catch (error) {
    throw Error("error while trying to fetch events")
  }
}
