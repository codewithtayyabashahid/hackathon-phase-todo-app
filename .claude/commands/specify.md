# Specify Command

## Purpose
Capture WHAT needs to be built - requirements, user stories, acceptance criteria.

## Usage
```
/specify [feature-name]
```

## Template

### Feature: [Feature Name]

#### Overview
Brief description of what this feature does and why it's needed.

#### User Stories

**US-XXX: [Story Title]**
**As a** [user type]
**I want to** [action]
**So that** [benefit]

**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

#### Business Rules
1. **Rule Name**: Description
2. **Rule Name**: Description

#### Data Requirements
- Field 1: Type, constraints
- Field 2: Type, constraints

#### Non-Functional Requirements
- Performance: [requirement]
- Security: [requirement]
- Scalability: [requirement]

#### Dependencies
- Depends on: [other features]
- Blocks: [other features]

#### Out of Scope
- What is NOT included in this feature

---

## Example: Task CRUD

### Feature: Task CRUD Operations

#### Overview
Users need to create, read, update, and delete tasks to manage their todo list.

#### User Stories

**US-001: Create Task**
**As a** logged-in user
**I want to** create a new task
**So that** I can track things I need to do

**Acceptance Criteria:**
- [ ] Title is required (1-200 characters)
- [ ] Description is optional (max 1000 characters)
- [ ] Task is automatically associated with logged-in user
- [ ] Task defaults to incomplete status
- [ ] User receives confirmation upon successful creation

**US-002: View Tasks**
**As a** logged-in user
**I want to** view all my tasks
**So that** I can see what I need to do

**Acceptance Criteria:**
- [ ] Only tasks belonging to the user are displayed
- [ ] Tasks show title, description, status, and created date
- [ ] Completed tasks are visually distinct
- [ ] Empty state shown when no tasks exist

#### Business Rules
1. **Ownership**: Tasks belong to a single user
2. **Validation**: Title required, max 200 chars
3. **Timestamps**: Auto-generated on create/update

#### Data Requirements
- id: Integer, auto-increment, primary key
- user_id: String, foreign key, required
- title: String, 1-200 chars, required
- description: String, max 1000 chars, optional
- completed: Boolean, default false
- created_at: Timestamp, auto-generated
- updated_at: Timestamp, auto-updated

#### Non-Functional Requirements
- Performance: List loads in < 2 seconds
- Security: User can only access their own tasks
- Scalability: Support 10,000+ tasks per user

---

## Output
Save to: `specs/features/[feature-name].md`