import swaggerJSDoc from 'swagger-jsdoc';
import swaggerPaths from './swaggerDocs';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Filter Backend API',
      version: '1.0.0',
      description: 'API documentation for the Filter Backend',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Base URL of your API
        description: 'Development Server',
      },
    ],
    paths: swaggerPaths, // Add your paths here
  },
  apis: ['./src/routes/*.ts'], // Optional: If you want to pick up additional annotations
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
