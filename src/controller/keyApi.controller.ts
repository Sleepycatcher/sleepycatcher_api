import { Request, Response } from "express";
import { createKeyApi } from "../service/keyApi.service";
import Log from "../utils/Log";

export const createKeyApiHandler = async (req: Request, res: Response) => {
  try {
    const keyApi = await createKeyApi(req.body);
    return res.status(201).json({ keyApi });
  } catch (error) {
    Log.error(error);
    return res.status(500).json({ error: error.message });
  }
};
