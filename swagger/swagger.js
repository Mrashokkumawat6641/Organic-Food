import swaggerAutogen from 'swagger-autogen';
const doc = {
    info: {
        title: 'Client Project API',
        description: 'Auto-generated Swagger docs',
    },
    host: 'localhost:5000',
    schemes: ['http'],
    basePath: '/api',
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            ApiResponse: {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        example: {}
                    },
                    error: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        example: []
                    },
                    responseCode: {
                        type: 'integer',
                        example: 200
                    }
                }
            }
        }
    }
};

const outputFile = [
    './swagger/swagger-output.json', 
    './swagger/swagger-output-image.json'
]
const endpointsFiles = [
    './api/routes/authRoutes/auth.routes.js',
    './api/routes/adminRoutes/image.routes.js'
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
