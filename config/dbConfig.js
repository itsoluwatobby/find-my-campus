import mongoose from "mongoose";
import { config } from "./index.js";
import { helper, loggerEnums } from "../utils/index.js";

export const ConnectDB = async () => {
  try {
    helper.logger('DB connection initiated', loggerEnums.info);
    await mongoose.connect(config.DB_URL);
    helper.logger('DB connected', loggerEnums.info);
  } catch (err) {
    helper.logger(err.message, loggerEnums.error);
    throw new Error(`DB connection error: ${err.message}`);
  }
}
