import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import Log from "../utils/Log";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("req.body", req.body);

    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      Log.error(error);
      return res.status(400).json(error);
    }
  };

export default validate;
