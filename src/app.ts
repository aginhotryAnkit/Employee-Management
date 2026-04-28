import express, { Application, Request, Response, NextFunction } from 'express';
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

// Swagger docs — serve spec as JSON for CDN-based UI
app.get('/api-docs/swagger.json', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/api-docs', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Employee Management API Docs</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = () => {
      SwaggerUIBundle({
        url: '/api-docs/swagger.json',
        dom_id: '#swagger-ui',
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        layout: 'StandaloneLayout',
        persistAuthorization: true,
      });
    };
  </script>
</body>
</html>`);
});

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
