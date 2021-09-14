import mongoose from "mongoose";

export interface eventLeaderDocument extends mongoose.Document{
    leaderName: string;
    leaderLastname : string;
    leaderimg : string;
}

export interface eventDocument extends mongoose.Document{
    name :string;
    description: string;
    eventimg : string;
    goingMembers : number;
    eventdate : Date;
    eventLeader: eventLeaderDocument;
}

const eventSchema = new mongoose.Schema<eventDocument>(
    {
        name : {type : String, required : true },
        description : {type : String, required : true},
        eventimg : {type : String, required: true},
        goingMembers : {type: Number, default: 0},
        eventdate : {type: Date},
        eventLeader : {
            leaderName : {type : String, required:true},
            leaderLastname : {type : String, required: true},
            leaderimg : {type: String, required: true},
        }
    },
    {timestamps : true},
);

const Event = mongoose.model<eventDocument>("Event", eventSchema);

export default Event;