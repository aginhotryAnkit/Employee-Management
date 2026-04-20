import cors from 'cors';
export declare const helmetMiddleware: (req: import("http").IncomingMessage, res: import("http").ServerResponse, next: (err?: unknown) => void) => void;
export declare const corsMiddleware: (req: cors.CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void;
export declare const rateLimiter: import("express-rate-limit").RateLimitRequestHandler;
//# sourceMappingURL=securityMiddleware.d.ts.map