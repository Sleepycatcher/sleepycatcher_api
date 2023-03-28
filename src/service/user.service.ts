import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument } from "../model/user.model";
import jwt from "jsonwebtoken";
import Log from "../utils/Log";
import { User } from "../type/User";

const SECRET_KEY = process.env.SECRET_KEY || "secretKey";

const generateToken = (user: UserDocument) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    SECRET_KEY,
    {
      expiresIn: "365d",
    }
  );
  return token;
};

export const verifyToken = (token: string): User => {
  try {
    const user: User = jwt.verify(token, SECRET_KEY) as User;

    return user;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

export const _getUser = async (id: string) => {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    return await UserModel.create(input);
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};

export const findUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    return await UserModel.findOne({ email: input.email }).select("+password");
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};

export const loginUser = async (input: DocumentDefinition<UserDocument>) => {
  try {
    const user = await findUser(input);

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await user.comparePassword(input.password);

    if (!isMatch) {
      throw new Error("Incorrect password");
    }
    return generateToken(user);
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};

export const getUsers = async () => {
  try {
    return await UserModel.find();
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await _getUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
