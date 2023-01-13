import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../model/user.model";
import Log from "../utils/Log";

const SECRET_KEY = process.env.SECRET_KEY || "secretKey";

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    return await User.create(input);
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};

// const findlUser = async () => {
//   return await User.find();
// };
