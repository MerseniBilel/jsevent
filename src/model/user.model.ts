import mongoose from "mongoose";
import bcrypt from "bcrypt";

//create interface for user
export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  lastname: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePasswords(pswd: string): Promise<void>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", userSchema);

//Compare password methode
userSchema.methods.comparePasswords = async function (pswd : string ){
    const user = this as UserDocument
    return bcrypt.compare(pswd, user.password).catch((e)=> false);
}

export default User;
