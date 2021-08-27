import { Request, Response } from "express";
import { omit } from "lodash";
import UserError from "../errors/user.errors";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e) {
    console.log(e);
    res.status(409).send(e);
  }
}
