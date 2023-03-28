import { Request, Response } from "express";
import StatModel from "../model/stat.model";
import { verifyToken } from "../service/user.service";

export const handleCreateStat = async (req: Request, res: Response) => {
  try {
    const user = verifyToken(
      req.headers.authorization?.split("Scla ")[1] as string
    );
    const idUser = user.id;
    console.log("userId", idUser);

    const stat = await StatModel.create({
      ...req.body,
      idUser,
    });
    return res.status(201).json({ stat });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const handleGetAllStatsbyIdUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user = verifyToken(
      req.headers.authorization?.split("Scla ")[1] as string
    );
    const idUser = user.id;
    console.log("userId", idUser);

    const stats = await StatModel.find({ idUser: idUser });
    return res.status(200).json({ stats });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const handleGetAllStats = async (_: Request, res: Response) => {
  try {
    const stats = await StatModel.find();
    return res.status(200).json({ stats });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
