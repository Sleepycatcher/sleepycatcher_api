import mongoose from "mongoose";

export interface KeyApiDocument extends mongoose.Document {
  key: string;
  createdAt: Date;
  updatedAt: Date;
  deactivated: boolean;
  compareKey: (key: string) => Promise<boolean>;
}

const KeyApiSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    deactivated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

KeyApiSchema.methods.compareKey = async function (key: string) {
  return key === this.key;
};

export const KeyApi = mongoose.model<KeyApiDocument>("KeyApi", KeyApiSchema);
