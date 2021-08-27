import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import bcrypt from "bcrypt";
import config from "config";
import UserError from '../errors/user.errors';

// create user function
export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    const salt = await bcrypt.genSalt(config.get("salt"));
    const hash = await bcrypt.hashSync(input.password, salt);
    input.password = hash;
    console.table(input);
    const userExist: boolean = await checkifuserExist(input.email);
    if (userExist) {
      throw "User already exist";
    }
    return await User.create(input);
  } catch (error) {
    throw (error);
  }
}

// check if user exist function
export async function checkifuserExist(userEmail: string): Promise<boolean> {
  try {
    const user = await User.findOne({ email: userEmail });
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    throw "error while checking if user exist";
  }
}
// find user function
export async function findUser() {
  try {
  } catch (error) {
    throw "error while searching for a user";
  }
}
