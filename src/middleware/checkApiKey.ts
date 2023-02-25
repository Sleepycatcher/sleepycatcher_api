import { NextFunction, Request, Response } from "express";
import { compareKeyApi } from "../service/keyApi.service";

export const checkApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("checkApiKey");
  console.log(req);

  const apiKey = req.query["API_KEY"] as string;
  if (await compareKeyApi(apiKey)) {
    next();
  } else {
    res.status(401).json({
      message: "API_KEY is not valid",
      error: "Unauthorized",
      statusCode: 401,
    });
  }
};
