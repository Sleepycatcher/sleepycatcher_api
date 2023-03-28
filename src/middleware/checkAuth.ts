import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../service/user.service";
import Log from "../utils/Log";

const checkAuth =
  (role?: "ADMIN" | "USER") =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split("Scla ")[1];
    if (!token) {
      return res.status(401).send("No token found");
    }

    try {
      const user = verifyToken(token);
      if (!user) {
        return res.status(404).send("Not authorized");
      }
      if (role) {
        if (user.role !== role) {
          return res.status(403).send("Not authorized");
        }
      }

      return next();
    } catch (error: any) {
      Log.error(error);
      return res.status(409).send(error.message);
    }
  };

export default checkAuth;
