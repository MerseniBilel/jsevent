import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";

// get the port and the host from ../config/default.ts
const port = config.get("port") as number;
const host = config.get("host") as string;

// create express instance and use express middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//start listing on port, host
app.listen(port, host, () => {
  log.info(`Server is listing at http://${host}:${port}`);
  connect();
  routes(app);
});
