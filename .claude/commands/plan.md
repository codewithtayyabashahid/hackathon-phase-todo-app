# Plan Command

## Purpose
Define HOW the feature will be built - architecture, components, APIs, database schema.

## Usage
```
/plan [feature-name]
```

## Template

### Technical Plan: [Feature Name]

#### Architecture Overview
High-level architecture diagram and description.
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│  Backend    │────▶│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
```

#### Component Breakdown

**Frontend Components:**
1. **ComponentName**
   - Location: `path/to/component.tsx`
   - Purpose: What it does
   - Props: List of props
   - State: Local state needed
   - Dependencies: Other components used

**Backend Components:**
1. **ModuleName**
   - Location: `path/to/module.py`
   - Purpose: What it does
   - Endpoints: API routes
   - Dependencies: External packages

#### API Endpoints

**Endpoint: [HTTP Method] /api/path**
- Purpose: What it does
- Auth: Required/Optional
- Request:
```json
  {
    "field": "type"
  }
```
- Response (200):
```json
  {
    "field": "type"
  }
```
- Error Responses: 400, 401, 404, 500

#### Database Schema

**Table: table_name**
```sql
CREATE TABLE table_name (
    id SERIAL PRIMARY KEY,
    field1 TYPE CONSTRAINTS,
    field2 TYPE CONSTRAINTS,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Indexes:**
- Index on field1 for fast lookups
- Composite index on (field1, field2)

#### Data Flow

1. User action in UI
2. API call with JWT token
3. Backend validates token
4. Database query
5. Response back to UI
6. UI update

#### Security Considerations
- Authentication: How users are authenticated
- Authorization: How access is controlled
- Input validation: What is validated
- XSS prevention: How XSS is prevented
- SQL injection: How SQLi is prevented

#### Error Handling
- Network errors: Retry logic
- Validation errors: Show user feedback
- Server errors: Log and show generic message

#### Testing Strategy
- Unit tests: What to test
- Integration tests: What to test
- E2E tests: Critical user flows

---

## Example: Task CRUD

### Technical Plan: Task CRUD Operations

#### Architecture Overview
```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────┐
│  TaskList.tsx    │────▶│  FastAPI         │────▶│  PostgreSQL  │
│  TaskCard.tsx    │     │  /api/tasks      │     │  tasks table │
│  TaskForm.tsx    │     │  JWT middleware  │     │              │
└──────────────────┘     └──────────────────┘     └──────────────┘
```

#### Component Breakdown

**Frontend Components:**

1. **TaskList**
   - Location: `src/components/TaskList.tsx`
   - Purpose: Display list of tasks with filtering
   - Props: `tasks[], loading, onToggle, onEdit, onDelete`
   - State: `filter: 'all' | 'pending' | 'completed'`

2. **TaskCard**
   - Location: `src/components/TaskCard.tsx`
   - Purpose: Display single task with actions
   - Props: `task, onToggle, onEdit, onDelete`
   - State: None

3. **TaskForm**
   - Location: `src/components/TaskForm.tsx`
   - Purpose: Create/edit task
   - Props: `task?, onSubmit, onCancel`
   - State: `formData: {title, description}, loading, error`

**Backend Components:**

1. **Task Routes**
   - Location: `backend/routes/tasks.py`
   - Purpose: Handle task CRUD operations
   - Endpoints: GET, POST, PUT, DELETE, PATCH
   - Dependencies: SQLModel, FastAPI, JWT middleware

#### API Endpoints

**Endpoint: GET /api/{user_id}/tasks**
- Purpose: Get all tasks for user
- Auth: Required (JWT)
- Query params: `?status=all|pending|completed`
- Response (200):
```json
  [
    {
      "id": 1,
      "user_id": "user-123",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "created_at": "2025-12-15T10:30:00Z",
      "updated_at": "2025-12-15T10:30:00Z"
    }
  ]
```

**Endpoint: POST /api/{user_id}/tasks**
- Purpose: Create new task
- Auth: Required (JWT)
- Request:
```json
  {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread"
  }
```
- Response (201):
```json
  {
    "id": 1,
    "user_id": "user-123",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "created_at": "2025-12-15T10:30:00Z",
    "updated_at": "2025-12-15T10:30:00Z"
  }
```

#### Database Schema

**Table: tasks**
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_completed ON tasks(completed);
```

#### Data Flow

1. User clicks "Create Task" button
2. TaskForm modal opens
3. User fills title and description
4. Form submits → API POST /api/{user_id}/tasks
5. Backend validates JWT, creates task
6. Response returns created task
7. Frontend adds task to state (optimistic update)
8. UI shows new task in list

#### Security Considerations
- JWT token validated on every request
- User ID from token (not from request body)
- SQL injection prevented via parameterized queries
- XSS prevented via React's automatic escaping
- CORS restricted to frontend domain

---

## Output
Save to: `specs/architecture.md` or `specs/features/[feature-name]-plan.md`