import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema } from "./schema/user.schema";

export default (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    req;
    res
      .status(401)
      .send("<h1 style='color:red;text-align:center;'>Api sleepyCatcher</h1>");
  });

  // Register User
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);
};
