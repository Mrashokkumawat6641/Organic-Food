import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './api/routes/authRoutes/auth.routes.js';
import imageRoutes from './api/routes/adminRoutes/image.routes.js';
import passport from './database/config/passport.js';
import adminRoutes from './api/routes/adminRoutes/product.Routes.js';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerFilePath = path.join(__dirname, 'swagger', 'swagger-output.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));
// const corsOptions = {
//   origin: [
//     '*',
//     'http://localhost:5173',
//     'https://assuring-javelin-smoothly.ngrok-free.app',
//     'http://152.58.70.211:5173',
//     'http://[2409:40d4:32:74b6:486a:76ff:fe41:823b]:5173',
//     'https://organic-food-fronted.vercel.app'

//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

const allowedOrigins = [
  'http://localhost:5173',
  'https://assuring-javelin-smoothly.ngrok-free.app',
  'http://152.58.70.211:5173',
  'http://[2409:40d4:32:74b6:486a:76ff:fe41:823b]:5173',
  'https://organic-food-fronted.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    bodyParser.json()(req, res, next);
  } else {
    next();
  }
});

// app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/products', adminRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
