import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from './database/config/passport.js';
import { router as allRoutes } from './api/routes/commonRoutes/index.js';


import bodyParser from 'body-parser';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerFilePath = path.join(__dirname, 'swagger', 'swagger-output.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf-8'));
const corsOptions = {
  origin: [
    '*',
    'http://localhost:5173',
    'http://localhost:3001',
    'http://localhost:3000',
    'http://10.146.216.8:3000',
    'https://assuring-javelin-smoothly.ngrok-free.app',
    'http://152.58.70.211:5173',
    'http://[2409:40d4:32:74b6:486a:76ff:fe41:823b]:5173',
    'https://organic-food-fronted.vercel.app',
    'https://sports-event-frontend.vercel.app',
    'https://organic-food-dt19.onrender.com',

  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    bodyParser.json()(req, res, next);
  } else {
    next();
  }
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api', allRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
