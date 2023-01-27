import mongoose from "mongoose";
import { Tags } from "../type/Article";

export interface ArticleDocument extends mongoose.Document {
  title: string;
  content: string;
  source: string;
  tags: Array<Tags>;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    source: { type: String, required: true },
    tags: [{ type: String }],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);
const Article = mongoose.model<ArticleDocument>("Article", ArticleSchema);

export default Article;
