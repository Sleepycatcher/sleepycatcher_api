import express from "express";
import { APP } from "../config/default";
import { dbConnect } from "./db/connect";
import Log from "./utils/Log";
import routes from "./routes";
import cors from "cors";

const main = async () => {
  const port = APP.port as number;
  const host = APP.host as string;

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.listen(port, () => {
    Log.ready(`Server is running on http://${host}:${port}`);

    try {
      const db = dbConnect;
      db.connect();

      routes(app);

      Log.ready("Database is connected");
    } catch (error) {
      Log.error(error);
      process.exit(1);
    }
  });
};

main();
