import { Request, Response } from "express";
import { omit } from "lodash";
import {
  UserExist,
  CantSearchUser,
  CantCreateUser,
  IncorrectPass,
  UserNotFound,
  UnkownError,
} from "../errors/user.errors";
import { createUser, login } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    console.log(e);
    if (e instanceof UserExist) {
      res.status(409).send({
        errortype: e.name,
        errormessage: e.message,
      });
    } else if (e instanceof CantSearchUser) {
      res.status(409).send({
        errortype: e.name,
        errormessage: e.message,
      });
    } else if (e instanceof CantCreateUser) {
      res.status(409).send({
        errortype: e.name,
        errormessage: e.message,
      });
    }
  }
}

export async function loginUserHandler(req: Request, res: Response) {
  try {
    const user = await login(req.body);
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    if (e instanceof IncorrectPass) {
      return res.status(409).send({
        errortype: e.name,
        errormessage: e.message,
      });
    } else if (e instanceof UserNotFound) {
      return res.status(409).send({
        errortype: e.name,
        errormessage: e.message,
      });
    }else if(e instanceof UnkownError){
      return res.status(409).send({ errortype : e.name, errormessage : e.message});
    }
  }
}
