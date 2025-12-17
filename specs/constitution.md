# Project Constitution

## Core Principles

### 1. Performance First
- All database queries must use indexes
- API responses < 200ms for CRUD operations
- Frontend renders must be < 100ms (excluding network)

### 2. Security Standards
- All API endpoints require JWT authentication
- Passwords hashed with bcrypt (min 12 rounds)
- SQL injection prevention via parameterized queries
- XSS prevention via content sanitization

### 3. Code Quality
- TypeScript strict mode enabled
- Python type hints required
- 80%+ test coverage (not enforced in hackathon)
- No console.log in production

### 4. Architecture Patterns
- Frontend: Server Components by default, Client Components only when needed
- Backend: Dependency injection for database sessions
- API: RESTful conventions, JSON responses
- Database: Single source of truth, no cached data

### 5. Styling Standards
- Tailwind CSS only (no inline styles)
- Gradient theme: Blue → Purple → Red → Black
- Glassmorphism effects on cards
- Smooth transitions (200-300ms)
- Mobile-first responsive design

### 6. Development Workflow
- Spec-Driven Development (SDD) mandatory
- No code without approved spec
- Constitution > Specify > Plan > Tasks hierarchy
- Claude Code + Spec-Kit Plus integration