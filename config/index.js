require('dotenv').config();
const config = {
  CORS: process.env.CORS,
  PORT: process.env.PORT,
  DEV: process.env.NODE_ENV !== 'production',
};

module.exports = { config };
