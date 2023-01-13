import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import Log from "../utils/Log";

export const createUserHandler = async (req: Request, res: Response) => {
  req;
  res;
  Log.info("/GET /api/users");
  try {
    const user = await createUser(req.body);
    return res.status(201).send(omit(user?.toJSON(), "password"));
  } catch (error: any) {
    Log.error(error.message);
    return res.status(409).send(error.message);
  }
};
