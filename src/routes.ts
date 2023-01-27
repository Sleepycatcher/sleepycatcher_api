import { Express, Request, Response } from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
  loginUserHandler,
} from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema, loginUserSchema } from "./schema/user.schema";

export default (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    req;
    res.status(404).json({
      message: "Route GET:/ not found",
      error: "Not Found",
      statusCode: 404,
    });
  });

  // Register User
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login User
  app.post(
    "/api/users/login",
    validateRequest(loginUserSchema),
    loginUserHandler
  );

  //check if user is logged in
  app.get("/api/checkLog", getCurrentUserHandler);
};
