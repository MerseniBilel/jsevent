import mongoose from "mongoose"
import User,{UserDocument} from "../model/user.model";
import Event,{eventDocument} from "../model/event.model";


export interface ArchiveDocument extends mongoose.Document {
  deleteUser : typeof User[];
  deletedEvent : typeof Event[];
}

const archiveSchema = new mongoose.Schema(
  {
    deletedUser: {
        type: [],
        default : undefined
    },
    deletedEvent : {
        type: [],
        default: undefined,
    }
  },
);

const Archive = mongoose.model<ArchiveDocument>("Archive", archiveSchema);

export default Archive;