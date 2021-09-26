import mongoose, { CallbackWithoutResult, ConnectOptions } from "mongoose";
import config from "config";
import log from "../logger";
import Archive from "../model/archive.model";

async function connect(): Promise<void> {
  const dbUri = config.get("dbUri") as string;

  const options = {};

  try {
    await mongoose.connect(dbUri, options);
    
    const archive = await Archive.find();
    if(archive.length == 0){
      log.info("Init the Archive");
      await Archive.create({
        deletedUser : [],
        deletedEvent : []
      });
    }

    log.info("Database connected");
  } catch (error) {
    log.error("db error", error);
    process.exit(1);
  }
}

export default connect;
