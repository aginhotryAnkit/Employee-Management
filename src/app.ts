import express, { Application, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import { helmetMiddleware, corsMiddleware, rateLimiter } from './middlewares/securityMiddleware';
import routes from './routes';
import { swaggerSpec } from './config/swagger';
import { sendSuccess, sendError } from './utils/response';

const app: Application = express();

// Security
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.options('*', corsMiddleware); // handle preflight requests
app.use(rateLimiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Employee Management API Docs',
  swaggerOptions: { persistAuthorization: true },
}));

// Health check
/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Check server health
 *     responses:
 *       200:
 *         description: Server is up
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: Server is up and running
 *               response:
 *                 timestamp: 2024-01-01T00:00:00.000Z
 *                 environment: development
 */
app.get('/health', (_req: Request, res: Response) => {
  sendSuccess({
    res,
    statusCode: 200,
    message: 'Server is up and running',
    data: {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    },
  });
});

// 404
app.use((_req: Request, res: Response) => {
  sendError({ res, statusCode: 404, message: 'Route not found' });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  sendError({ res, statusCode: 500, message: 'Internal server error' });
});

export default app;
