import mongoose from "mongoose";

//create interface for user
export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  lastname: string;
  password: string;
  image : string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    image : {type : String, required: false, default : "https://avatars.dicebear.com/api/bottts/blue.svg"}
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", userSchema);


export default User;
