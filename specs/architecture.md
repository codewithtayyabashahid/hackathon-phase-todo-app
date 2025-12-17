# System Architecture

## High-Level Architecture
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│                 │     │                  │     │                 │
│  Next.js 16     │────▶│  FastAPI         │────▶│  Neon           │
│  (Frontend)     │     │  (Backend)       │     │  PostgreSQL     │
│                 │     │                  │     │                 │
│  - App Router   │     │  - SQLModel      │     │  - tasks        │
│  - Better Auth  │     │  - JWT Auth      │     │  - users        │
│  - Tailwind CSS │     │  - CORS enabled  │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
↓                        ↓
JWT Token in              Validates
Authorization             JWT & filters
header                    by user_id

## Component Breakdown

### Frontend Components
1. **Layout Component** (`app/layout.tsx`)
   - Global navigation
   - Theme provider
   - Auth context

2. **Authentication Pages**
   - Login page (`app/(auth)/login/page.tsx`)
   - Signup page (`app/(auth)/signup/page.tsx`)

3. **Dashboard** (`app/dashboard/page.tsx`)
   - Task list display
   - Task creation form
   - Task actions (edit, delete, complete)

4. **UI Components** (`components/ui/`)
   - Button, Input, Card, Checkbox
   - Reusable styled components

5. **Business Components** (`components/`)
   - TaskCard: Display individual task
   - TaskForm: Create/edit task
   - TaskList: List all tasks
   - Navigation: App navigation

### Backend Components
1. **Main App** (`main.py`)
   - FastAPI initialization
   - CORS configuration
   - Route registration

2. **Models** (`models.py`)
   - Task model
   - User model (Better Auth managed)

3. **Database** (`database.py`)
   - SQLModel engine
   - Session management

4. **Routes** (`routes/`)
   - `/api/tasks` - Task CRUD operations
   - `/api/health` - Health check

5. **Middleware** (`middleware/`)
   - JWT validation
   - User extraction

## Data Flow

### Task Creation Flow
1. User fills TaskForm → POST request with JWT token
2. Frontend API client sends to `/api/{user_id}/tasks`
3. Backend JWT middleware validates token
4. Backend creates task with user_id
5. Backend returns created task
6. Frontend updates UI optimistically

### Authentication Flow
1. User submits login form
2. Better Auth validates credentials
3. JWT token issued (7-day expiry)
4. Token stored in httpOnly cookie
5. All API requests include token in header
6. Backend validates token on each request

## Security Architecture

### Authentication
- Better Auth handles user management
- JWT tokens for API authentication
- Shared secret between frontend/backend
- Token refresh on expiry

### Authorization
- User ID embedded in JWT claims
- Backend extracts user_id from token
- All queries filter by user_id
- No cross-user data access

### Data Protection
- HTTPS in production
- SQL injection prevention (parameterized queries)
- XSS prevention (sanitized inputs)
- CORS restricted to frontend domain

### When proposing new features: