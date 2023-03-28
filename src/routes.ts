import { Express, Request, Response } from "express";
import {
  createArticleHandler,
  getAllArticlesHandler,
  getArticleHandler,
  updateArticleHandler,
  deleteArticleHandler,
} from "./controller/article.controller";
import {
  handleCreateStat,
  handleGetAllStats,
  handleGetAllStatsbyIdUser,
} from "./controller/statController";
import {
  createUserHandler,
  getCurrentUserHandler,
  loginUserHandler,
} from "./controller/user.controller";
import { checkApiKey } from "./middleware/checkApiKey";
import checkAuth from "./middleware/checkAuth";
import validateRequest from "./middleware/validateRequest";
import { createArticleSchema } from "./schema/article.schema";
import { createStatSchema } from "./schema/stat.schema";
import { createUserSchema, loginUserSchema } from "./schema/user.schema";

export default (app: Express) => {
  app.get("/", checkApiKey, (req: Request, res: Response) => {
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
    checkApiKey,
    validateRequest(createUserSchema),
    createUserHandler
  );

  // Login User
  app.post(
    "/api/auth/login",
    checkApiKey,
    validateRequest(loginUserSchema),
    loginUserHandler
  );

  //check auth
  app.get("/api/auth", checkApiKey, checkAuth(), getCurrentUserHandler);

  //get all articles
  app.get("/api/articles", checkApiKey, getAllArticlesHandler);

  //get article by id
  app.get("/api/article/:id", checkApiKey, getArticleHandler);

  //create article
  app.post(
    "/api/admin/article",
    checkApiKey,
    checkAuth("ADMIN"),
    validateRequest(createArticleSchema),
    createArticleHandler
  );

  //update article
  app.put(
    "/api/admin/article/:id",
    checkApiKey,
    checkAuth("ADMIN"),
    validateRequest(createArticleSchema),
    updateArticleHandler
  );

  //delete article
  app.delete(
    "/api/admin/article/:id",
    checkApiKey,
    checkAuth("ADMIN"),
    deleteArticleHandler
  );

  //add stat by idUser
  app.post(
    "/api/addStat",
    checkApiKey,
    checkAuth(),
    validateRequest(createStatSchema),
    handleCreateStat
  );

  //get all stats by idUser
  app.get(
    "/api/getAllStats",
    checkApiKey,
    checkAuth(),
    handleGetAllStatsbyIdUser
  );

  //get all stats
  app.get(
    "/api/admin/getAllStats",
    checkApiKey,
    checkAuth("ADMIN"),
    handleGetAllStats
  );
};
