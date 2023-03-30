import { Request, Response } from "express";
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle,
  _getArticle,
} from "../service/article.service";
import Log from "../utils/Log";

export const getAllArticlesHandler = async (_: Request, res: Response) => {
  try {
    const articles = await getArticles();
    console.log("articles", articles);

    return res.status(200).json({ ...articles });
  } catch (error) {
    Log.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getArticleHandler = async (req: Request, res: Response) => {
  const idArticle = req.params.id;
  try {
    if (!idArticle) {
      throw new Error("Article not found");
    }
    const article = await _getArticle(req.params.id);
    return res.status(200).json({ article });
  } catch (error) {
    Log.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const createArticleHandler = async (req: Request, res: Response) => {
  try {
    const article = await createArticle(req.body);
    return res.status(201).json({ article });
  } catch (error) {
    Log.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateArticleHandler = async (req: Request, res: Response) => {
  const idArticle = req.params.id;
  const input = req.body;
  try {
    const article = await updateArticle(idArticle, input);
    return res.status(200).json({
      message: "Article updated successfully",
      article,
    });
  } catch (error) {
    Log.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteArticleHandler = async (req: Request, res: Response) => {
  const idArticle = req.params.id;
  try {
    const article = await deleteArticle(idArticle);
    if (!article) {
      throw new Error("Article not found");
    }
    return res.status(200).json({
      message: "Article deleted successfully",
      article,
    });
  } catch (error) {
    Log.error(error);
    return res.status(500).json({ error: error.message });
  }
};
