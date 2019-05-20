import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = Number(process.env.PORT) || 3000;

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
export const DB_USERNAME = process.env.DB_USERNAME || 'test';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'test';
export const DB_NAME = process.env.DB_NAME || 'test';
export const DB_SYNC = Boolean(process.env.DB_SYNC) || false;

export const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecret';
export const JWT_EXPIRE = Number(process.env.JWT_EXPIRE) || 14 * 24 * 60 * 60;

export const FILE_IMAGE_SIZE = Number(process.env.FILE_IMAGE_SIZE) || 20 * 1024 * 1024;

export const DB_CONFIG: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: DB_SYNC,
  entities: ['dist/api/**/*.entity.js'],
  logging: NODE_ENV === 'development' ? ['error', 'query'] : ['error'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
