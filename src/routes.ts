import { Express, Request, Response } from "express";
import {
  createArticleHandler,
  getAllArticlesHandler,
  getArticleHandler,
  updateArticleHandler,
  deleteArticleHandler,
} from "./controller/article.controller";
import {
  createUserHandler,
  getCurrentUserHandler,
  loginUserHandler,
} from "./controller/user.controller";
import checkAuth from "./middleware/checkAuth";
import validateRequest from "./middleware/validateRequest";
import { createArticleSchema } from "./schema/article.schema";
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
  app.post(
    "/api/auth/register",
    validateRequest(createUserSchema),
    createUserHandler
  );

  // Login User
  app.post(
    "/api/auth/login",
    validateRequest(loginUserSchema),
    loginUserHandler
  );

  //get all articles
  app.get("/api/articles", getAllArticlesHandler);

  //get article by id
  app.get("/api/article/:id", getArticleHandler);

  //create article
  app.post(
    "/api/article",
    checkAuth("ADMIN"),
    validateRequest(createArticleSchema),
    createArticleHandler
  );

  //update article
  app.put(
    "/api/article/:id",
    checkAuth("ADMIN"),
    validateRequest(createArticleSchema),
    updateArticleHandler
  );

  //delete article
  app.delete("/api/article/:id", checkAuth("ADMIN"), deleteArticleHandler);
};
