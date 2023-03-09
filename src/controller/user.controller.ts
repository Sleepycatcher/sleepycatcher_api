import { Request, Response } from "express";
import { omit } from "lodash";
import {
  createUser,
  getUsers,
  loginUser,
  verifyToken,
  _getUser,
} from "../service/user.service";
import Log from "../utils/Log";

export const createUserHandler = async (req: Request, res: Response) => {
  Log.info("/POST /api/users");
  try {
    const user = await createUser(req.body);
    return res.status(201).send(omit(user?.toJSON(), "password"));
  } catch (error: any) {
    Log.error(error.message);
    return res.status(409).send(error.message);
  }
};

export const loginUserHandler = async (req: Request, res: Response) => {
  Log.info("/POST /api/users/login");
  try {
    const user = await loginUser(req.body);
    return res.status(200).send(user);
  } catch (error: any) {
    Log.error(error.message);
    return res.status(409).send(error.message);
  }
};

export const getAllUsersHandler = async (_: Request, res: Response) => {
  Log.info("/GET /api/users");
  try {
    const users = await getUsers();
    if (!users) {
      return res.status(404).send("No users found");
    }
    return res.status(200).send(users);
  } catch (error: any) {
    Log.error(error.message);
    return res.status(409).send(error.message);
  }
};

export const getCurrentUserHandler = async (req: Request, res: Response) => {
  Log.info("/GET /api/auth");

  const token = req.headers.authorization?.split("Scla ")[1];
  if (!token) {
    return res.status(401).send("No token found");
  }

  try {
    const user = verifyToken(token);
    if (!user) {
      return res.status(404).send("No user found");
    }

    if (typeof user === "object" && user) {
      const userInfo = await _getUser(user.id);
      return res.status(200).json({
        jwtInfo: user,
        userInfo: userInfo,
      });
    } else {
      return res.status(404).send("No user found");
    }
  } catch (error: any) {
    Log.error(error.message);
    return res.status(409).send(error.message);
  }
};
