import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import bcrypt from "bcrypt";
import config from "config";
// custom error
import {
  UserExist,
  CantSearchUser,
  CantCreateUser,
} from "../errors/user.errors";
import log from "../logger";

// create user function
export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    const salt = await bcrypt.genSalt(config.get("salt"));
    const hash = await bcrypt.hashSync(input.password, salt);
    input.password = hash;
    const userExist: boolean = await checkifuserExist(input.email);
    if (userExist) {
      throw new UserExist("User already exist");
    }
    return await User.create(input);
  } catch (error) {
    console.log(error);
    if (error instanceof UserExist) {
      log.error(error.showerror());
      throw new UserExist(error.message);
    } else {
      throw new CantCreateUser("Error while creating a user");
    }
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
    throw new CantSearchUser("Error while searching for a user");
  }
}

// find user function
export async function findUser() {
  try {
  } catch (error) {
    throw new CantSearchUser("Error while searching for a user");
  }
}
