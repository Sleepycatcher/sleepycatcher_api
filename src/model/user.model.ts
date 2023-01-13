import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { APP } from "../../config/default";
import Log from "../utils/Log";

export interface UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
  },
  { timestamps: true }
);

UserSchema.pre<UserDocument>("save", async function (next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(APP.saltWorkFactor);

  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;
  return await bcrypt
    .compare(candidatePassword, user.password)
    .catch((e: Error) => Log.error(e));
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
