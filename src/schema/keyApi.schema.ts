import { object, string } from "yup";
export const createKeyApiSchema = object({
  body: object({
    key: string().required().min(3).max(50),
  }),
});
