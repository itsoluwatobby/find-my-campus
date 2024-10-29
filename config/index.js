
export const config = {
  DB_URL: process.env.DB_URL,
  // JWT
  ExpiresIn: '30d',
  Issuer: 'PCI-Global',
  JWT_SECRET: process.env.JWT_SECRET,

  API_KEY: process.env.API_KEY,

  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
};
