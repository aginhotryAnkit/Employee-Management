# Employee Management Dashboard — Backend API

A RESTful backend API built with **Node.js**, **Express**, **TypeScript**, **Sequelize**, and **PostgreSQL**.

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Runtime      | Node.js                             |
| Language     | TypeScript                          |
| Framework    | Express.js                          |
| ORM          | Sequelize v6                        |
| Database     | PostgreSQL (managed via pgAdmin)    |
| Validation   | Joi                                 |
| Auth         | JWT (jsonwebtoken) + bcryptjs       |
| Security     | Helmet, CORS, express-rate-limit    |

---

## Project Structure

```
├── src/
│   ├── config/
│   │   └── database.ts          # Sequelize connection setup
│   ├── middlewares/
│   │   ├── authMiddleware.ts    # JWT protect middleware
│   │   └── securityMiddleware.ts# Helmet, CORS, Rate limiter
│   ├── modules/
│   │   └── auth/
│   │       ├── auth.interface.ts  # TypeScript interfaces
│   │       ├── auth.validator.ts  # Joi validation schemas
│   │       ├── auth.model.ts      # Sequelize Employee model
│   │       ├── auth.service.ts    # Business logic
│   │       ├── auth.controller.ts # Request / Response handling
│   │       └── auth.routes.ts     # Route definitions
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Entry point
├── docs/
│   ├── README.md                # This file
│   ├── SETUP.md                 # Local setup guide
│   ├── ENV.md                   # Environment variables reference
│   └── api/
│       └── auth.md              # Auth API docs with cURLs
├── .env
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your DB credentials and JWT secret

# Run in development
npm run dev

# Build for production
npm run build
npm start
```

---

## Documentation Index

| File                  | Description                          |
|-----------------------|--------------------------------------|
| `docs/SETUP.md`       | Prerequisites and local setup steps  |
| `docs/ENV.md`         | All environment variables explained  |
| `docs/api/auth.md`    | Auth API endpoints, cURLs, payloads  |
