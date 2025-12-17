# Todo App - Hackathon Phase II

## Project Context
Read @AGENTS.md for complete development workflow.

This is a Spec-Driven Development project using:
- Spec-Kit Plus for structured specifications
- Claude Code for implementation
- Better Auth for authentication
- Next.js 16 + FastAPI + Neon PostgreSQL

## Quick Links
- Constitution: @specs/constitution.md
- Features: @specs/features/
- API Docs: @specs/api/rest-endpoints.md
- Database: @specs/database/schema.md
- UI Components: @specs/ui/components.md

## Project Structure
- `/frontend` - Next.js 16 application
- `/backend` - FastAPI server
- `/specs` - All specifications

## Development Commands

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
uv sync
uv run uvicorn main:app --reload
```

### Both
```bash
docker-compose up
```

## Design Theme
Blue (#3B82F6) → Purple (#A855F7) → Red (#EF4444) → Black (#0F172A)

Glassmorphism effects, smooth animations, modern UI.