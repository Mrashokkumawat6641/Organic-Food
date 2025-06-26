import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;
// export const MONGO_URI = "mongodb://localhost:27017/organicfood";
// export const MONGO_URI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGOHOST}:27017`;
export const MONGO_URI = process.env.MONGO_URI;

export const JWT_SECRET = process.env.JWT_SECRET;

export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_USERNAME = process.env.REDIS_USERNAME;
export const REDIS_TLS = process.env.REDIS_TLS === 'true';
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
export const REDIS_HOST = process.env.REDIS_HOST;
export const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
export const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
export const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL;
// export const SwaggerUI = process.env.SwaggerUI;
export const Swagger_UI = process.env.Swagger_UI;
export const SWAGGER_TOKEN = process.env.SWAGGER_TOKEN;

export const BaseAPI = process.env.BaseAPI;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
export const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_URL = process.env.CLOUDINARY_URL;