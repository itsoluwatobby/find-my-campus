import mongoose from "mongoose";
import { config } from "./index.js";
import { logger } from "../utils/index.js";

export const ConnectDB = async () => {
  try {
    logger.info('DB connection initiated');
    await mongoose.connect(config.DB_URL);
    logger.info('DB connected');
  } catch (err) {
    logger.info(err.message);
    throw new Error(`DB connection error: ${err.message}`);
  }
}
