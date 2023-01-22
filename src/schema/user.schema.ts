import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    email: string().email().required("Email is required"),
    username: string().required("Username is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Passwords must match"
    ),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string().email().required("Email is required"),
    password: string().required("Password is required"),
  }),
});
