import { Request, Response } from "express";
import { omit } from "lodash";
import {
  UserExist,
  CantSearchUser,
  CantCreateUser,
} from "../errors/user.errors";
import log from "../logger";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try  {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    console.log(e);
    if (e instanceof UserExist) {
      log.error(e.showerror);
      res.status(409).send({
        errortype: e.name,
        errormessage: e.message,
      });
    } else if (e instanceof CantSearchUser) {
      log.error(e.showerror);
      res.status(409).send({
        errortype: e.name,
        errormessage: e.message,
      });
    } else if (e instanceof CantCreateUser) {
      log.error(e.showerror);
      res.status(409).send({
        errortype: e.name,
        errormessage: e.message,
      });
    }
  }
}
