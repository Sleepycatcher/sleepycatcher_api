import { array, object, string } from "yup";

const allowedTags = [
  "sport",
  "bien-être",
  "respiration",
  "sommeil",
  "alimentation",
];

export const createArticleSchema = object({
  body: object({
    title: string().required("Title is required"),
    content: string().required("Content is required"),
    source: string().required("Source is required"),
    tags: array().of(string().oneOf(allowedTags)),
  }),
});
