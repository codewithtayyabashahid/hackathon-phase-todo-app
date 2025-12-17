# Feature: Task CRUD Operations

## User Stories

### US-001: Create Task
**As a** logged-in user  
**I want to** create a new task  
**So that** I can track things I need to do

**Acceptance Criteria:**
- Title is required (1-200 characters)
- Description is optional (max 1000 characters)
- Task is automatically associated with logged-in user
- Task defaults to incomplete status
- Created timestamp is auto-generated
- User receives confirmation upon successful creation

### US-002: View Tasks
**As a** logged-in user  
**I want to** view all my tasks  
**So that** I can see what I need to do

**Acceptance Criteria:**
- Only tasks belonging to the user are displayed
- Tasks show title, description, status, and created date
- Completed tasks are visually distinct from incomplete
- Empty state shown when no tasks exist
- Tasks load within 2 seconds

### US-003: Update Task
**As a** logged-in user  
**I want to** edit my task details  
**So that** I can correct or enhance task information

**Acceptance Criteria:**
- User can edit title and description
- Changes save immediately
- Updated timestamp is refreshed
- Cannot update other users' tasks
- Validation errors shown for invalid input

### US-004: Delete Task
**As a** logged-in user  
**I want to** delete a task  
**So that** I can remove tasks I no longer need

**Acceptance Criteria:**
- Confirmation dialog shown before deletion
- Task permanently removed from database
- Cannot delete other users' tasks
- User receives confirmation of deletion
- Deleted tasks cannot be recovered

### US-005: Mark Complete
**As a** logged-in user  
**I want to** mark tasks as complete or incomplete  
**So that** I can track my progress

**Acceptance Criteria:**
- Single click toggles completion status
- Visual feedback immediate (optimistic update)
- Completed tasks show checkmark
- Completion can be toggled multiple times
- Cannot modify other users' tasks

## Data Model

### Task Entity
```typescript
interface Task {
  id: number;              // Auto-increment primary key
  user_id: string;         // Foreign key to users.id
  title: string;           // Required, 1-200 chars
  description: string;     // Optional, max 1000 chars
  completed: boolean;      // Default: false
  created_at: datetime;    // Auto-generated
  updated_at: datetime;    // Auto-updated
}
```

## Business Rules

1. **Ownership**
   - Tasks belong to a single user
   - Users can only access their own tasks
   - User ID from JWT token (not from request body)

2. **Validation**
   - Title: Required, trimmed, 1-200 characters
   - Description: Optional, max 1000 characters
   - Completed: Boolean, defaults to false

3. **Timestamps**
   - created_at: Set on creation, never changes
   - updated_at: Updated on every modification

4. **Deletion**
   - Hard delete (permanent removal)
   - No soft delete or archiving in Phase II

### When proposing architecture:

## Hierarchy
**Constitution > Specify > Plan > Tasks > Implement**

## Developer-Agent Alignment
Before each session, re-read:
1. `specs/constitution.md`
2. `AGENTS.md` (this file)

This ensures predictable, deterministic development.