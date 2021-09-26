import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import Archive, {ArchiveDocument} from "../model/archive.model";
import bcrypt from "bcrypt";
import config from "config";
// custom error
import {
  UserExist,
  CantSearchUser,
  CantCreateUser,
  IncorrectPass,
  UserNotFound,
  UnkownError,
  CantDeleteUser,
} from "../errors/user.errors";
import log from "../logger";


export async function readUsers(){
  try {
    return await User.find();
  } catch (error) {
    throw Error("server error cant fetch users");
  }
}


//delete user
export async function deleteUser(input: string) {
  try {
    const dUser = await User.findOneAndDelete({ _id: input });
    const archive = await Archive.find();
    if(dUser){
      archive[0].deletedUser.push(dUser);
      await archive[0].save();
    }
    return dUser;
  } catch (error) {
    throw new CantDeleteUser("error while deleting the user");
  }
}

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

// login a user
export async function login(input: any) {
  try {
    const userExist: boolean = await checkifuserExist(input.email);
    if (!userExist) {
      throw new UserNotFound("User Not Fount");
    }
    const user: any = await User.findOne({ email: input.email });
    console.log(user);
    const compare: boolean = await comparePassword(
      input.password,
      user.password
    );
    if (compare == false) {
      throw new IncorrectPass("password is icorrect");
    }
    return user;
  } catch (error) {
    console.log(error);
    if (error instanceof IncorrectPass) {
      log.error(error.showerror());
      throw new IncorrectPass(error.message);
    } else if (error instanceof UserNotFound) {
      log.error(error.showerror());
      throw new UserNotFound(error.message);
    } else {
      throw new UnkownError("Error while Log in");
    }
  }
}

export async function comparePassword(passwd: string, dbpasswd: string) {
  return bcrypt.compare(passwd, dbpasswd).catch((e) => false);
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

