require('dotenv').config();
const environment = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL || 'mysql://root:123456@localhost:3306/books';
const secretKey = process.env.SECRET_KEY || "secret";
const expiredTime = process.env.EXPIRED_TIME || 10;

export default {
  environment,
  port,
  databaseUrl,
  secretKey,
  expiredTime
};