import mongoose from "mongoose"
import User,{UserDocument} from "../model/user.model";
import Event,{eventDocument} from "../model/event.model";


export interface ArchiveDocument extends mongoose.Document {
  deletedUser : UserDocument[],
  deletedEvent : eventDocument[]
}

const archiveSchema = new mongoose.Schema(
  {
    deletedUser: {
        type: [],
        default : []
    },
    deletedEvent : {
        type: [],
        default: [],
    }
  },
);

const Archive = mongoose.model<ArchiveDocument>("Archive", archiveSchema);

export default Archive;