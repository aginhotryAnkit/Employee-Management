import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Management API',
      version: '1.0.0',
      description: 'A production-ready RESTful API for managing employees, departments, and role-based access control.',
      contact: {
        name: 'Ankit Agnihotri',
        url: 'https://github.com/ankitagnihotry',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://employee-management-khaki-tau.vercel.app' 
          : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            status: { type: 'boolean', example: false },
            statusCode: { type: 'integer', example: 400 },
            message: { type: 'string', example: 'Validation failed' },
            error: { type: 'array', items: { type: 'string' } },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            is_active: { type: 'boolean' },
            role: { type: 'object', properties: { name: { type: 'string', enum: ['hr', 'manager', 'employee'] } } },
            department: { type: 'object', properties: { name: { type: 'string' } } },
            manager: { 
              type: 'object', 
              nullable: true,
              properties: { 
                id: { type: 'string', format: 'uuid' }, 
                name: { type: 'string' }, 
                email: { type: 'string' } 
              } 
            },
          },
        },
        Department: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
          },
        },
        Role: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string', enum: ['hr', 'manager', 'employee'] },
          },
        },
      },
    },
    tags: [
      { name: 'Health', description: 'Health check endpoint' },
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Roles', description: 'Role endpoints' },
      { name: 'Departments', description: 'Department management endpoints' },
      { name: 'Dashboard', description: 'Dashboard statistics' },
    ],
  },
  apis: ['./src/app.ts', './src/routes/*.ts', './src/modules/**/*.routes.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
