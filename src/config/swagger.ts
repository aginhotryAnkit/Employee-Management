export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Employee Management API',
    version: '1.0.0',
    description: 'A production-ready RESTful API for managing employees, departments, and role-based access control.',
    contact: { name: 'Ankit Agnihotri', url: 'https://github.com/ankitagnihotry' },
  },
  servers: [
    { url: 'https://employee-management-khaki-tau.vercel.app', description: 'Production' },
    { url: 'http://localhost:3000', description: 'Local' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
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
    },
  },
  tags: [
    { name: 'Health', description: 'Health check' },
    { name: 'Auth', description: 'Authentication' },
    { name: 'Users', description: 'User management' },
    { name: 'Roles', description: 'Roles' },
    { name: 'Departments', description: 'Department management' },
    { name: 'Dashboard', description: 'Dashboard statistics' },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Check server health',
        responses: {
          200: {
            description: 'Server is up',
            content: {
              'application/json': {
                example: { status: true, statusCode: 200, message: 'Server is up and running', response: { timestamp: '2024-01-01T00:00:00.000Z', environment: 'development' } },
              },
            },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login and receive JWT token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'hr@company.com' },
                  password: { type: 'string', example: 'Hr@12345' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                example: { status: true, statusCode: 200, message: 'Login successful', response: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', user: { id: 'uuid', name: 'Super HR', email: 'hr@company.com', role: 'hr', is_active: true } } },
              },
            },
          },
          401: { description: 'Invalid credentials', content: { 'application/json': { schema: { '$ref': '#/components/schemas/Error' } } } },
        },
      },
    },
    '/api/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users — HR sees all, Manager sees their team',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Users list',
            content: {
              'application/json': {
                example: { status: true, statusCode: 200, message: 'Users fetched successfully', response: [{ id: 'uuid', name: 'Neha Singh', email: 'neha@company.com', is_active: true, role: { name: 'employee' }, department: { name: 'Engineering' }, manager: { id: 'uuid', name: 'Rohit Sharma', email: 'rohit@company.com' } }] },
              },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Access denied' },
        },
      },
      post: {
        tags: ['Users'],
        summary: 'Create new employee and generate invite token (HR only)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'role_id', 'department_id'],
                properties: {
                  name: { type: 'string', example: 'Neha Singh' },
                  email: { type: 'string', format: 'email', example: 'neha@company.com' },
                  role_id: { type: 'string', format: 'uuid', example: '<role-uuid>' },
                  department_id: { type: 'string', format: 'uuid', example: '<department-uuid>' },
                  manager_id: { type: 'string', format: 'uuid', nullable: true, example: '<manager-uuid>' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Employee created',
            content: {
              'application/json': {
                example: { status: true, statusCode: 201, message: 'Employee created. Invite token generated.', response: { user: { id: 'uuid', name: 'Neha Singh', email: 'neha@company.com' }, invite_token: 'abc123def456...' } },
              },
            },
          },
          409: { description: 'Email already exists' },
        },
      },
    },
    '/api/users/set-password': {
      post: {
        tags: ['Users'],
        summary: 'Set password using invite token (Public)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['token', 'password'],
                properties: {
                  token: { type: 'string', example: 'abc123def456' },
                  password: { type: 'string', example: 'MyPassword@123' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Password set successfully', content: { 'application/json': { example: { status: true, statusCode: 200, message: 'Password set successfully. You can now login.' } } } },
          400: { description: 'Invalid or expired token' },
        },
      },
    },
    '/api/users/managers': {
      get: {
        tags: ['Users'],
        summary: 'Get managers for dropdown with optional search (HR only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: 'query', name: 'search', schema: { type: 'string' }, description: 'Filter by name or email', example: 'rohit' },
        ],
        responses: {
          200: {
            description: 'Managers list',
            content: {
              'application/json': {
                example: { status: true, statusCode: 200, message: 'Managers fetched successfully', response: [{ id: 'uuid', name: 'Rohit Sharma', email: 'rohit@company.com', department: { name: 'Engineering' } }] },
              },
            },
          },
          401: { description: 'Unauthorized' },
          403: { description: 'Access denied (HR only)' },
        },
      },
    },
    '/api/users/{id}': {
      delete: {
        tags: ['Users'],
        summary: 'Delete user by ID (HR only)',
        security: [{ bearerAuth: [] }],
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'string', format: 'uuid' } },
        ],
        responses: {
          200: { description: 'User deleted', content: { 'application/json': { example: { status: true, statusCode: 200, message: 'User deleted successfully' } } } },
          404: { description: 'User not found' },
        },
      },
    },
    '/api/roles': {
      get: {
        tags: ['Roles'],
        summary: 'Get all roles for dropdown',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Roles list',
            content: {
              'application/json': {
                example: { status: true, statusCode: 200, message: 'Roles fetched successfully', response: [{ id: 'uuid', name: 'employee' }, { id: 'uuid', name: 'hr' }, { id: 'uuid', name: 'manager' }] },
              },
            },
          },
        },
      },
    },
    '/api/departments': {
      get: {
        tags: ['Departments'],
        summary: 'Get all departments',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Departments list',
            content: {
              'application/json': {
                example: {
                  status: true, statusCode: 200, message: 'Departments fetched successfully',
                  response: [{
                    id: 'uuid', name: 'Engineering', code: 'ENG',
                    description: 'Product development and engineering',
                    location: 'Floor 2', budget: '1200000.00', status: 'ACTIVE',
                    head: { id: 'uuid', name: 'Alice Johnson', email: 'alice@company.com' },
                  }],
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Departments'],
        summary: 'Create a department (HR only)',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'code'],
                properties: {
                  name:        { type: 'string', example: 'Engineering' },
                  code:        { type: 'string', example: 'ENG' },
                  description: { type: 'string', example: 'Product development and engineering' },
                  head_id:     { type: 'string', format: 'uuid', example: '<user-uuid>' },
                  location:    { type: 'string', example: 'Floor 2' },
                  budget:      { type: 'number', example: 1200000 },
                  status:      { type: 'string', enum: ['ACTIVE', 'INACTIVE'], example: 'ACTIVE' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Department created', content: { 'application/json': { example: { status: true, statusCode: 201, message: 'Department created', response: { id: 'uuid', name: 'Engineering', code: 'ENG', status: 'ACTIVE' } } } } },
          409: { description: 'Department name or code already exists' },
        },
      },
    },
    '/api/departments/{id}': {
      get: {
        tags: ['Departments'],
        summary: 'Get single department with full details and employee stats',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          200: {
            description: 'Department details',
            content: {
              'application/json': {
                example: {
                  status: true, statusCode: 200, message: 'Department fetched successfully',
                  response: {
                    id: 'uuid', name: 'Engineering', code: 'ENG',
                    description: 'Product development and engineering',
                    location: 'Floor 2', budget: '1200000.00', status: 'ACTIVE',
                    head: { id: 'uuid', name: 'Alice Johnson', email: 'alice@company.com' },
                    stats: { totalEmployees: 12, activeEmployees: 10, inactiveEmployees: 2 },
                    employees: [
                      { id: 'uuid', name: 'Neha Singh', email: 'neha@company.com', is_active: true, role: { name: 'employee' }, manager: { id: 'uuid', name: 'Alice Johnson', email: 'alice@company.com' } },
                    ],
                  },
                },
              },
            },
          },
          404: { description: 'Department not found' },
        },
      },
      put: {
        tags: ['Departments'],
        summary: 'Update a department (HR only)',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name:        { type: 'string', example: 'Product Engineering' },
                  code:        { type: 'string', example: 'PENG' },
                  description: { type: 'string' },
                  head_id:     { type: 'string', format: 'uuid' },
                  location:    { type: 'string' },
                  budget:      { type: 'number' },
                  status:      { type: 'string', enum: ['ACTIVE', 'INACTIVE'] },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Department updated' },
          404: { description: 'Department not found' },
        },
      },
      delete: {
        tags: ['Departments'],
        summary: 'Delete a department (HR only)',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          200: { description: 'Department deleted' },
          404: { description: 'Department not found' },
        },
      },
    },
    '/api/dashboard': {
      get: {
        tags: ['Dashboard'],
        summary: 'Get dashboard stats (HR and Manager only)',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Dashboard data',
            content: {
              'application/json': {
                example: {
                  status: true, statusCode: 200, message: 'Dashboard fetched successfully',
                  response: {
                    summary: {
                      totalEmployees: { title: 'Total Employees', count: '256' },
                      activeEmployees: { title: 'Active Employees', count: '226' },
                      pendingInvites: { title: 'Pending Invites', count: '56' },
                      departments: { title: 'Departments', count: '14' },
                    },
                    recentEmployees: [
                      { id: 'uuid', name: 'Rohit Sharma', email: 'rohit@company.com', role: 'manager', department: 'Engineering', manager: null, status: 'Active', avatar: null },
                    ],
                    pendingInvites: [
                      { email: 'neha@company.com', role: 'employee', expiresIn: '12 hours' },
                    ],
                    departmentStats: [
                      { department: 'Engineering', count: 12 },
                      { department: 'Human Resources', count: 5 },
                    ],
                  },
                },
              },
            },
          },
          403: { description: 'Access denied' },
        },
      },
    },
  },
};
