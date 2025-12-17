# Tasks Command

## Purpose
Break down the plan into atomic, testable work units.

## Usage
```
/tasks [feature-name]
```

## Template

### Tasks: [Feature Name]

#### Task Breakdown

**Task ID: T-XXX**
- **Title**: Brief description
- **Priority**: High/Medium/Low
- **Estimated Time**: Hours
- **From Spec**: Reference to spec section
- **From Plan**: Reference to plan section
- **Description**: Detailed what needs to be done
- **Preconditions**: What must exist before starting
- **Acceptance Criteria**:
  - [ ] Criterion 1
  - [ ] Criterion 2
- **Files to Create/Modify**:
  - `path/to/file1.tsx`
  - `path/to/file2.py`
- **Dependencies**: Other tasks that must complete first
- **Testing**: How to verify it works

---

## Example: Task CRUD

### Tasks: Task CRUD Operations

#### Frontend Tasks

**Task ID: T-001**
- **Title**: Create TaskCard Component
- **Priority**: High
- **Estimated Time**: 2 hours
- **From Spec**: specs/features/task-crud.md §US-002
- **From Plan**: specs/architecture.md §Components.TaskCard
- **Description**: Create a component to display a single task with checkbox, title, description, and action buttons
- **Preconditions**: 
  - Button component exists
  - Checkbox component exists
  - Task type defined
- **Acceptance Criteria**:
  - [ ] Shows task title and description
  - [ ] Checkbox toggles completion
  - [ ] Edit and Delete buttons present
  - [ ] Completed tasks show strikethrough
  - [ ] Relative time display ("2 hours ago")
  - [ ] Hover effects work
- **Files to Create/Modify**:
  - `frontend/src/components/TaskCard.tsx` (create)
- **Dependencies**: None
- **Testing**: 
  - Render with sample task
  - Toggle completion
  - Click edit button
  - Click delete button

**Task ID: T-002**
- **Title**: Create TaskList Component
- **Priority**: High
- **Estimated Time**: 3 hours
- **From Spec**: specs/features/task-crud.md §US-002
- **From Plan**: specs/architecture.md §Components.TaskList
- **Description**: Create component to display list of tasks with filtering
- **Preconditions**: 
  - TaskCard component exists
- **Acceptance Criteria**:
  - [ ] Displays array of TaskCards
  - [ ] Filter tabs (All, Pending, Completed)
  - [ ] Empty state when no tasks
  - [ ] Loading state with skeleton
  - [ ] Responsive grid layout
- **Files to Create/Modify**:
  - `frontend/src/components/TaskList.tsx` (create)
- **Dependencies**: T-001
- **Testing**: 
  - Render with empty array
  - Render with tasks array
  - Test filtering
  - Test loading state

**Task ID: T-003**
- **Title**: Create TaskForm Component
- **Priority**: High
- **Estimated Time**: 3 hours
- **From Spec**: specs/features/task-crud.md §US-001, US-003
- **From Plan**: specs/architecture.md §Components.TaskForm
- **Description**: Create form component for creating/editing tasks
- **Preconditions**: 
  - Input component exists
  - Button component exists
- **Acceptance Criteria**:
  - [ ] Title input with validation
  - [ ] Description textarea
  - [ ] Character count display
  - [ ] Submit and Cancel buttons
  - [ ] Edit mode support
  - [ ] Error display
  - [ ] Loading state
- **Files to Create/Modify**:
  - `frontend/src/components/TaskForm.tsx` (create)
- **Dependencies**: None
- **Testing**: 
  - Submit empty form (validation)
  - Submit valid form
  - Edit existing task
  - Cancel action

**Task ID: T-004**
- **Title**: Create Dashboard Page
- **Priority**: High
- **Estimated Time**: 4 hours
- **From Spec**: specs/features/task-crud.md §All
- **From Plan**: specs/architecture.md §Pages.Dashboard
- **Description**: Create main dashboard page that integrates all task components
- **Preconditions**: 
  - TaskList component exists
  - TaskForm component exists
  - API client exists
- **Acceptance Criteria**:
  - [ ] Loads tasks on mount
  - [ ] Create task button opens modal
  - [ ] Edit task opens modal with data
  - [ ] Delete task shows confirmation
  - [ ] Toggle completion updates immediately
  - [ ] Handles authentication
- **Files to Create/Modify**:
  - `frontend/src/app/dashboard/page.tsx` (create)
- **Dependencies**: T-001, T-002, T-003, T-007
- **Testing**: 
  - Navigate to /dashboard
  - Create new task
  - Edit task
  - Delete task
  - Toggle completion

#### Backend Tasks

**Task ID: T-005**
- **Title**: Create Task Model
- **Priority**: High
- **Estimated Time**: 1 hour
- **From Spec**: specs/features/task-crud.md §Data Model
- **From Plan**: specs/architecture.md §Database.tasks
- **Description**: Define SQLModel Task model with all fields and validation
- **Preconditions**: 
  - SQLModel installed
  - Database connection configured
- **Acceptance Criteria**:
  - [ ] Task class with all fields
  - [ ] Proper field types and constraints
  - [ ] Foreign key to users table
  - [ ] Timestamps auto-generated
  - [ ] Table name configured
- **Files to Create/Modify**:
  - `backend/models.py` (create/modify)
- **Dependencies**: None
- **Testing**: 
  - Create tables
  - Insert test task
  - Query test task

**Task ID: T-006**
- **Title**: Create JWT Middleware
- **Priority**: High
- **Estimated Time**: 2 hours
- **From Spec**: specs/features/authentication.md §Protected Routes
- **From Plan**: specs/architecture.md §Security
- **Description**: Create middleware to verify JWT tokens and extract user_id
- **Preconditions**: 
  - python-jose installed
  - JWT secret configured
- **Acceptance Criteria**:
  - [ ] Extracts token from Authorization header
  - [ ] Validates token signature
  - [ ] Checks token expiration
  - [ ] Returns user_id
  - [ ] Handles errors (401)
- **Files to Create/Modify**:
  - `backend/middleware/jwt_middleware.py` (create)
- **Dependencies**: None
- **Testing**: 
  - Test with valid token
  - Test with expired token
  - Test with invalid token
  - Test without token

**Task ID: T-007**
- **Title**: Create Task CRUD Endpoints
- **Priority**: High
- **Estimated Time**: 4 hours
- **From Spec**: specs/features/task-crud.md §All
- **From Plan**: specs/api/rest-endpoints.md
- **Description**: Implement all task CRUD API endpoints
- **Preconditions**: 
  - Task model exists
  - JWT middleware exists
  - Database session configured
- **Acceptance Criteria**:
  - [ ] GET /api/{user_id}/tasks (list)
  - [ ] POST /api/{user_id}/tasks (create)
  - [ ] GET /api/{user_id}/tasks/{id} (get one)
  - [ ] PUT /api/{user_id}/tasks/{id} (update)
  - [ ] DELETE /api/{user_id}/tasks/{id} (delete)
  - [ ] PATCH /api/{user_id}/tasks/{id}/complete (toggle)
  - [ ] All endpoints validate JWT
  - [ ] All endpoints verify user_id match
  - [ ] Proper error handling
- **Files to Create/Modify**:
  - `backend/routes/tasks.py` (create)
  - `backend/main.py` (modify to register routes)
- **Dependencies**: T-005, T-006
- **Testing**: 
  - Test each endpoint with curl/Postman
  - Test authentication
  - Test authorization
  - Test error cases

---

## Task Status Tracking

| Task ID | Title | Status | Assignee | Notes |
|---------|-------|--------|----------|-------|
| T-001 | TaskCard Component | ✅ Done | - | - |
| T-002 | TaskList Component | ✅ Done | - | - |
| T-003 | TaskForm Component | ✅ Done | - | - |
| T-004 | Dashboard Page | 🔄 In Progress | - | - |
| T-005 | Task Model | ✅ Done | - | - |
| T-006 | JWT Middleware | ✅ Done | - | - |
| T-007 | Task CRUD Endpoints | ✅ Done | - | - |

---

## Output
Save to: `specs/tasks/[feature-name]-tasks.md` or append to feature spec