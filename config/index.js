
export const config = {
  DB_URL: process.env.DB_URL,
  ExpiresIn: '30d',
  Issuer: 'PCI-Global',
  JWT_SECRET: process.env.JWT_SECRET,
};
