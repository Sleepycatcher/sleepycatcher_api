import { DocumentDefinition } from "mongoose";
import { KeyApi, KeyApiDocument } from "../model/keyApi.model";
import Log from "../utils/Log";

export const createKeyApi = async (
  input: DocumentDefinition<KeyApiDocument>
) => {
  try {
    return await KeyApi.create({
      ...input,
      deactivated: false,
    });
  } catch (error) {
    Log.error(error);
    throw new Error(error);
  }
};

export const compareKeyApi = async (keyApi: string) => {
  const keyapis = await KeyApi.find();
  if (keyapis.length === 0) {
    throw new Error("No keyapis found");
  } else {
    return keyapis.find((key) => key.key === keyApi);
  }
};
