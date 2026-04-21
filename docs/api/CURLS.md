# API Reference — cURLs

Base URL: `https://employee-management-khaki-tau.vercel.app`
Local URL: `http://localhost:3000`

> Replace `<token>` with the JWT token received from login response.

---

## Health Check

### GET /health
Check if server is up and running. No auth required.

```bash
curl -X GET http://localhost:3000/health
```

**Response `200`**
```json
{
  "status": "ok",
  "message": "Server is up and running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

---

## Auth

### POST /api/auth/login
Login with email and password. Works for HR, Manager and Employee.

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "hr@company.com",
    "password": "Hr@12345"
  }'
```

**Response `200`**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "Super HR",
    "email": "hr@company.com",
    "role": "hr",
    "is_active": true
  }
}
```

**Response `401` — Invalid credentials**
```json
{ "message": "Invalid credentials" }
```

**Response `403` — Account not activated**
```json
{ "message": "Account not activated. Please set your password first." }
```

**Response `400` — Validation failed**
```json
{
  "message": "Validation failed",
  "errors": ["email must be a valid email"]
}
```

---

## Users

### POST /api/users
Create a new employee (inactive). HR only.

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Neha Singh",
    "email": "neha@company.com",
    "role_id": "uuid-of-role",
    "department_id": "uuid-of-department",
    "manager_id": "uuid-of-manager"
  }'
```

> `manager_id` is optional.

**Response `201`**
```json
{
  "message": "Employee created. Invite token generated.",
  "user": {
    "id": "uuid",
    "name": "Neha Singh",
    "email": "neha@company.com"
  },
  "invite_token": "abc123def456..."
}
```

**Response `409` — Email already exists**
```json
{ "message": "Email already exists" }
```

---

### POST /api/users/set-password
Employee sets password using invite token. Public route — no auth required.

```bash
curl -X POST http://localhost:3000/api/users/set-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "abc123def456...",
    "password": "MyPassword@123"
  }'
```

**Response `200`**
```json
{ "message": "Password set successfully. You can now login." }
```

**Response `400` — Invalid or expired token**
```json
{ "message": "Invalid or expired invite token" }
```

---

### GET /api/users
Get all users. HR sees all employees, Manager sees only their team.

```bash
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer <token>"
```

**Response `200`**
```json
{
  "users": [
    {
      "id": "uuid",
      "name": "Neha Singh",
      "email": "neha@company.com",
      "is_active": true,
      "role": { "name": "employee" },
      "department": { "name": "Engineering" },
      "manager": { "id": "uuid", "name": "Aman Gupta", "email": "aman@company.com" }
    }
  ]
}
```

---

### DELETE /api/users/:id
Delete an employee. HR only.

```bash
curl -X DELETE http://localhost:3000/api/users/<user-uuid> \
  -H "Authorization: Bearer <token>"
```

**Response `200`**
```json
{ "message": "User deleted successfully" }
```

**Response `404`**
```json
{ "message": "User not found" }
```

---

## Departments

### GET /api/departments
Get all departments. All authenticated users.

```bash
curl -X GET http://localhost:3000/api/departments \
  -H "Authorization: Bearer <token>"
```

**Response `200`**
```json
{
  "departments": [
    { "id": "uuid", "name": "Engineering" },
    { "id": "uuid", "name": "Human Resources" },
    { "id": "uuid", "name": "Finance" },
    { "id": "uuid", "name": "Design" }
  ]
}
```

---

### POST /api/departments
Create a department. HR only.

```bash
curl -X POST http://localhost:3000/api/departments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{ "name": "Engineering" }'
```

**Response `201`**
```json
{
  "message": "Department created",
  "department": { "id": "uuid", "name": "Engineering" }
}
```

**Response `409`**
```json
{ "message": "Department already exists" }
```

---

### PUT /api/departments/:id
Update a department. HR only.

```bash
curl -X PUT http://localhost:3000/api/departments/<dept-uuid> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{ "name": "Product Engineering" }'
```

**Response `200`**
```json
{
  "message": "Department updated",
  "department": { "id": "uuid", "name": "Product Engineering" }
}
```

---

### DELETE /api/departments/:id
Delete a department. HR only.

```bash
curl -X DELETE http://localhost:3000/api/departments/<dept-uuid> \
  -H "Authorization: Bearer <token>"
```

**Response `200`**
```json
{ "message": "Department deleted" }
```

---

## Dashboard

### GET /api/dashboard
Get dashboard summary. HR and Manager only.

```bash
curl -X GET http://localhost:3000/api/dashboard \
  -H "Authorization: Bearer <token>"
```

**Response `200`**
```json
{
  "summary": {
    "totalEmployees": 25,
    "activeEmployees": 22,
    "pendingInvites": 3,
    "departments": 4
  },
  "recentEmployees": [
    {
      "id": "uuid",
      "name": "Neha Singh",
      "role": "employee",
      "status": "Pending Invite"
    },
    {
      "id": "uuid",
      "name": "Aman Gupta",
      "role": "manager",
      "status": "Active"
    }
  ],
  "pendingInvites": [
    {
      "email": "neha@company.com",
      "role": "employee",
      "expiresIn": "12 hours"
    }
  ],
  "departmentStats": [
    { "department": "Engineering", "count": 12 },
    { "department": "Human Resources", "count": 5 },
    { "department": "Finance", "count": 4 },
    { "department": "Design", "count": 4 }
  ]
}
```

---

## Common Error Responses

| Status | Meaning |
|--------|---------|
| `400` | Validation failed |
| `401` | No token / invalid token / wrong credentials |
| `403` | Access denied (wrong role) or account not activated |
| `404` | Resource not found |
| `409` | Duplicate entry (email / department name) |
| `429` | Rate limit exceeded (100 requests / 15 min) |
| `500` | Internal server error |

---

## Role Access Matrix

| Endpoint | HR | Manager | Employee |
|---|---|---|---|
| `POST /api/auth/login` | ✅ | ✅ | ✅ |
| `POST /api/users` | ✅ | ❌ | ❌ |
| `POST /api/users/set-password` | ✅ | ✅ | ✅ |
| `GET /api/users` | ✅ all | ✅ team only | ❌ |
| `DELETE /api/users/:id` | ✅ | ❌ | ❌ |
| `GET /api/departments` | ✅ | ✅ | ✅ |
| `POST /api/departments` | ✅ | ❌ | ❌ |
| `PUT /api/departments/:id` | ✅ | ❌ | ❌ |
| `DELETE /api/departments/:id` | ✅ | ❌ | ❌ |
| `GET /api/dashboard` | ✅ | ✅ | ❌ |
| `GET /health` | ✅ | ✅ | ✅ |
