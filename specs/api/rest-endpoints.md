# REST API Endpoints

## Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://your-backend.com`

## Authentication
All task endpoints require JWT token in header:
Authorization: Bearer <jwt_token>

## Endpoints

### Health Check

#### GET /api/health
Check API status

**Response** (200 OK)
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

---

### Task Endpoints

#### GET /api/{user_id}/tasks
List all tasks for authenticated user

**Path Parameters**
- `user_id` (string, required): User identifier

**Query Parameters**
- `status` (string, optional): Filter by status
  - Values: `"all"`, `"pending"`, `"completed"`
  - Default: `"all"`

**Response** (200 OK)
```json
[
  {
    "id": 1,
    "user_id": "user-123",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "created_at": "2025-12-14T10:30:00Z",
    "updated_at": "2025-12-14T10:30:00Z"
  }
]
```

**Error Responses**
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id in URL doesn't match JWT token

---

#### POST /api/{user_id}/tasks
Create a new task

**Path Parameters**
- `user_id` (string, required): User identifier

**Request Body**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"  // Optional
}
```

**Response** (201 Created)
```json
{
  "id": 1,
  "user_id": "user-123",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2025-12-14T10:30:00Z",
  "updated_at": "2025-12-14T10:30:00Z"
}
```

**Error Responses**
- `400 Bad Request`: Invalid request body (missing title, title too long)
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id in URL doesn't match JWT token

---

#### GET /api/{user_id}/tasks/{id}
Get single task details

**Path Parameters**
- `user_id` (string, required): User identifier
- `id` (integer, required): Task ID

**Response** (200 OK)
```json
{
  "id": 1,
  "user_id": "user-123",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2025-12-14T10:30:00Z",
  "updated_at": "2025-12-14T10:30:00Z"
}
```

**Error Responses**
- `404 Not Found`: Task doesn't exist or doesn't belong to user
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id in URL doesn't match JWT token

---

#### PUT /api/{user_id}/tasks/{id}
Update a task

**Path Parameters**
- `user_id` (string, required): User identifier
- `id` (integer, required): Task ID

**Request Body**
```json
{
  "title": "Buy groceries and fruits",
  "description": "Milk, eggs, bread, apples"
}
```

**Response** (200 OK)
```json
{
  "id": 1,
  "user_id": "user-123",
  "title": "Buy groceries and fruits",
  "description": "Milk, eggs, bread, apples",
  "completed": false,
  "created_at": "2025-12-14T10:30:00Z",
  "updated_at": "2025-12-14T14:45:00Z"
}
```

**Error Responses**
- `400 Bad Request`: Invalid request body
- `404 Not Found`: Task doesn't exist or doesn't belong to user
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id in URL doesn't match JWT token

---

#### DELETE /api/{user_id}/tasks/{id}
Delete a task

**Path Parameters**
- `user_id` (string, required): User identifier
- `id` (integer, required): Task ID

**Response** (200 OK)
```json
{
  "message": "Task deleted successfully",
  "id": 1
}
```

**Error Responses**
- `404 Not Found`: Task doesn't exist or doesn't belong to user
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id in URL doesn't match JWT token

---

#### PATCH /api/{user_id}/tasks/{id}/complete
Toggle task completion status

**Path Parameters**
- `user_id` (string, required): User identifier
- `id` (integer, required): Task ID

**Request Body**
```json
{
  "completed": true
}
```

**Response** (200 OK)
```json
{
  "id": 1,
  "user_id": "user-123",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": true,
  "created_at": "2025-12-14T10:30:00Z",
  "updated_at": "2025-12-14T15:00:00Z"
}
```

**Error Responses**
- `404 Not Found`: Task doesn't exist or doesn't belong to user
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: user_id in URL doesn't match JWT token

---

## Error Response Format

All error responses follow this structure:
```json
{
  "detail": "Error message describing what went wrong"
}
```

**Common HTTP Status Codes**
- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: User doesn't have permission
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error