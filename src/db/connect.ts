import mongoose, { CallbackWithoutResult, ConnectOptions } from "mongoose";
import config from "config";
import log from "../logger";

async function connect(): Promise<void> {
  const dbUri = config.get("dbUri") as string;

  const options = {};

  try {
    await mongoose.connect(dbUri, options);
    log.info("Database connected");
  } catch (error) {
    log.error("db error", error);
    process.exit(1);
  }
}

export default connect;
