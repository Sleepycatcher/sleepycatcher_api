import mongoose from "mongoose";

type Config = {
  method?: string;
  username: string;
  password: string;
  serverUri: string;
  databaseName: string;
  params?: string[];
};

export class MongoDBConfig {
  private readonly dsn: string = "";

  constructor(config: Config) {
    const {
      method = "mongodb+srv",
      username,
      password,
      serverUri,
      databaseName,
      params = [],
    } = config;

    this.dsn = this.buildDsn(
      method,
      username,
      password,
      serverUri,
      databaseName,
      params
    );
  }

  private buildDsn(
    method: string,
    username: string,
    password: string,
    serverUri: string,
    databaseName: string,
    params: string[]
  ): string {
    return `${method}://${username}:${password}@${serverUri}/${databaseName}${
      params && params.length > 0 && `?${params.join("&")}`
    }`;
  }

  async connect() {
    if (!this.dsn) return;
    mongoose.set("strictQuery", true);
    return await mongoose.connect(this.dsn);
  }
}
