import { MongoDBConfig } from "../../config/MongoDBConfig";
import dotenv from "dotenv-flow";
import Log from "../utils/Log";

dotenv.config({
  default_node_env: "development",
  silent: true,
});

Log.info(`current env ${process.env.NODE_ENV}`);

export const dbConnect = new MongoDBConfig({
  username: process.env.MONGODB_USERNAME || "",
  password: process.env.MONGODB_PASSWORD || "",
  serverUri: process.env.MONGODB_SERVER_URI || "",
  databaseName: process.env.MONGODB_DATABASE_NAME || "",
  params: process.env.MONGODB_PARAMS?.split(",") || [],
});
