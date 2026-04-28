<div align="center">

# 🏢 Employee Management Backend

**A production-ready RESTful API for managing employees, departments, and role-based access control.**

[![Node.js](https://img.shields.io/badge/Node.js-23.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203.0-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://employee-management-khaki-tau.vercel.app/api-docs)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://employee-management-khaki-tau.vercel.app)

[Live API](https://employee-management-khaki-tau.vercel.app/health) · [API Docs](https://employee-management-khaki-tau.vercel.app/api-docs) · [Quick Start](#-quick-start)

</div>

---

## 📌 Overview

A backend API that handles the full lifecycle of employee management — from HR creating an employee and sending an invite, to the employee setting their password and logging in. Built with a clean modular architecture, role-based access control, and security best practices baked in.

### ✨ Key Features

- 🔐 **JWT Authentication** — secure login with token-based auth
- 👥 **Role-Based Access Control** — HR, Manager, and Employee roles with scoped permissions
- 📧 **Invite System** — HR creates employees, a token-based invite flow lets them set their password
- 🏬 **Department Management** — full CRUD for departments
- 📊 **Dashboard API** — summary stats with department breakdown and pending invites
- 📖 **Swagger UI** — interactive API documentation at `/api-docs`
- 🛡️ **Security** — Helmet, CORS, and rate limiting (100 req / 15 min) out of the box
- 🗄️ **Sequelize ORM** — migrations and seeders for reproducible DB setup

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 23.x |
| Language | TypeScript 5.x |
| Framework | Express.js 4.x |
| ORM | Sequelize 6.x |
| Database | PostgreSQL |
| Auth | JWT + bcryptjs |
| Validation | Joi |
| Documentation | Swagger / OpenAPI 3.0 |
| Security | Helmet · CORS · express-rate-limit |
| Deployment | Vercel |

---

## 📁 Project Structure

```
├── src/
│   ├── config/
│   │   ├── database.ts          # Sequelize DB connection
│   │   ├── sequelize.ts         # Sequelize CLI config
│   │   └── swagger.ts           # Swagger/OpenAPI config
│   ├── database/
│   │   ├── migrations/          # Table creation migrations
│   │   ├── models/              # Sequelize models
│   │   │   ├── role.model.ts
│   │   │   ├── department.model.ts
│   │   │   ├── user.model.ts
│   │   │   └── user_invite.model.ts
│   │   └── seeders/
│   │       └── 20240101000001-seed.ts   # All seed data
│   ├── middlewares/
│   │   ├── authMiddleware.ts    # JWT protect + role authorize
│   │   └── securityMiddleware.ts# Helmet, CORS, rate limiter
│   ├── modules/
│   │   ├── auth/                # Login
│   │   ├── user/                # Employee CRUD + invite flow
│   │   ├── role/                # Roles list
│   │   ├── department/          # Department CRUD
│   │   └── dashboard/           # Stats & summary
│   ├── routes/
│   │   └── index.ts             # Route aggregator
│   ├── utils/
│   │   └── response.ts          # Standardized response helpers
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Entry point
├── docs/
│   ├── api/
│   │   └── CURLS.md             # Full cURL reference
│   └── Employee_Management.postman_collection.json
├── .env.example
├── .sequelizerc
├── vercel.json
└── package.json
```

---

## 🗄️ Database Schema

```
roles
  id (UUID PK) | name (hr | manager | employee)

departments
  id (UUID PK) | name (unique)

users
  id (UUID PK) | name | email (unique) | password
  role_id (FK → roles) | department_id (FK → departments)
  manager_id (FK → users, self-ref) | is_active

user_invites
  id (UUID PK) | user_id (FK → users)
  token (unique) | expires_at | is_used
```

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL running locally
- npm

### 1. Clone & Install

```bash
git clone https://github.com/your-username/employee-management-backend.git
cd employee-management-backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_management
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

ALLOWED_ORIGINS=http://localhost:3000
```

### 3. Run Migrations & Seed

```bash
# Run migrations
npm run migrate

# Seed sample data (roles, departments, users, invites)
npm run seed
```

### 4. Start the Server

```bash
# Development (hot reload)
npm run dev

# Production
npm run build
npm start
```

Server runs at `http://localhost:3000`

---

## 🌱 Seed Data

The seeder creates ready-to-use test data across all tables:

| Role | Email | Password |
|---|---|---|
| HR Admin | `hr@company.com` | `Hr@12345` |
| Manager | `alice.johnson@company.com` | `password` |
| Manager | `bob.williams@company.com` | `password` |
| Manager | `carol.davis@company.com` | `password` |
| Employee | `david.brown@company.com` | `password` |
| Employee | `eva.martinez@company.com` | `password` |
| ... 8 more employees | | `password` |

Departments seeded: `Human Resources`, `Engineering`, `Marketing`, `Sales`, `Finance`, `Design`

To re-seed from scratch:
```bash
npm run seed:undo
npm run seed
```

---

## 📡 API Reference

**Base URL (Production):** `https://employee-management-khaki-tau.vercel.app`  
**Base URL (Local):** `http://localhost:3000`

### 📖 Interactive API Documentation

**Swagger UI:** [https://employee-management-khaki-tau.vercel.app/api-docs](https://employee-management-khaki-tau.vercel.app/api-docs)

Explore and test all endpoints directly in your browser with the interactive Swagger UI.

**How to use:**
1. Open `/api-docs`
2. Click **Authorize** 🔒 button
3. Login via `POST /api/auth/login` → copy the token
4. Paste token in the Authorize dialog (without "Bearer" prefix)
5. All protected endpoints will now include your JWT automatically

---

### Health Check

```
GET /health
```

---

### Auth

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Login and receive JWT |

**Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "hr@company.com", "password": "Hr@12345" }'
```

---

### Users

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/users` | HR only | Create employee + generate invite token |
| `POST` | `/api/users/set-password` | Public | Employee sets password via invite token |
| `GET` | `/api/users` | HR · Manager | HR sees all, Manager sees their team |
| `GET` | `/api/users/managers` | HR only | List managers (for dropdown with search) |
| `DELETE` | `/api/users/:id` | HR only | Delete an employee |

---

### Roles

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/roles` | All authenticated | List all roles (for dropdown) |

---

### Departments

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/departments` | All authenticated | List all departments (for dropdown) |
| `POST` | `/api/departments` | HR only | Create a department |
| `PUT` | `/api/departments/:id` | HR only | Update a department |
| `DELETE` | `/api/departments/:id` | HR only | Delete a department |

---

### Dashboard

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/dashboard` | HR · Manager | Summary stats, recent employees, department breakdown |

---

### Role Access Matrix

| Endpoint | HR | Manager | Employee |
|---|:---:|:---:|:---:|
| `POST /api/auth/login` | ✅ | ✅ | ✅ |
| `POST /api/users` | ✅ | ❌ | ❌ |
| `POST /api/users/set-password` | ✅ | ✅ | ✅ |
| `GET /api/users` | ✅ all | ✅ team | ❌ |
| `GET /api/users/managers` | ✅ | ❌ | ❌ |
| `DELETE /api/users/:id` | ✅ | ❌ | ❌ |
| `GET /api/roles` | ✅ | ✅ | ✅ |
| `GET /api/departments` | ✅ | ✅ | ✅ |
| `POST /api/departments` | ✅ | ❌ | ❌ |
| `PUT /api/departments/:id` | ✅ | ❌ | ❌ |
| `DELETE /api/departments/:id` | ✅ | ❌ | ❌ |
| `GET /api/dashboard` | ✅ | ✅ | ❌ |

---

### Common Error Responses

| Status | Meaning |
|---|---|
| `400` | Validation failed |
| `401` | Missing / invalid / expired token |
| `403` | Access denied (wrong role) or account not activated |
| `404` | Resource not found |
| `409` | Duplicate entry (email or department name) |
| `429` | Rate limit exceeded |
| `500` | Internal server error |

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production build |
| `npm run migrate` | Build + run all DB migrations |
| `npm run migrate:undo` | Undo last migration |
| `npm run migrate:undo:all` | Undo all migrations |
| `npm run seed` | Build + run all seeders |
| `npm run seed:undo` | Undo all seeders |

---

## 🔒 Security

- **Helmet** — sets secure HTTP headers
- **CORS** — configurable allowed origins via `ALLOWED_ORIGINS` env var
- **Rate Limiting** — 100 requests per 15 minutes per IP
- **JWT** — stateless auth with configurable expiry
- **bcryptjs** — passwords hashed with configurable salt rounds
- **Joi** — strict request body validation on all endpoints

---

<div align="center">

Made with ❤️ by [Ankit Agnihotri](https://github.com/ankitagnihotry)

</div>
