import { DocumentDefinition } from "mongoose";
import Article, { ArticleDocument } from "../model/article.model";
import Log from "../utils/Log";

export const _getArticle = async (id: string) => {
  try {
    const article = await Article.findById(id);
    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};

export const getArticles = async () => {
  try {
    const articles = await Article.find();
    if (articles.length === 0) {
      throw new Error("No articles found");
    } else {
      return articles;
    }
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};

export const createArticle = async (
  input: DocumentDefinition<ArticleDocument>
) => {
  try {
    return await Article.create(input);
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};

export const updateArticle = async (
  id: string,
  input: DocumentDefinition<ArticleDocument>
) => {
  try {
    const article = await _getArticle(id);
    if (!article) {
      throw new Error("Article not found");
    }
    Object.assign(article, input);
    return article.save();
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const article = await _getArticle(id);
    if (!article) {
      throw new Error("Article not found");
    }
    return article.remove();
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};
