import swaggerAutogen from 'swagger-autogen';
import { PORT } from '../env.js';

const doc = {
    info: {
        title: 'Client Project API',
        description: 'API documentation for Client Project API',
    },
    host: 'https://organic-food-dt19.onrender.com',
    basePath: '/api',
    schemes: ['https'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Enter JWT token as: Bearer <token>',
        },
    },
    security: [{ bearerAuth: [] }],
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./api/routes/commonRoutes/index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
