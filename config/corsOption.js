import { config } from "./index.js";

export const CorsOption = {
  origin(origin, callback) {
    const allowedOrigins = config.ALLOWED_ORIGINS.split(',');
    if (allowedOrigins.includes(origin) || !origin)
      return callback(null, true);
    callback(null, new Error('Blocked by CORS'));
  },
  optionsSuccessStatus: 200,
};
