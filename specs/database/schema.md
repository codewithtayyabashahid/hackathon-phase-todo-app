# Database Schema

## Overview
Using Neon Serverless PostgreSQL with SQLModel ORM

## Connection
```python
DATABASE_URL = "postgresql://user:password@host/database"
```

## Tables

### users
Managed by Better Auth library
```sql
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

**Fields**
- `id`: UUID string, primary key
- `email`: User's email address, unique
- `password_hash`: Bcrypt hashed password
- `name`: Optional display name
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

**Indexes**
- PRIMARY KEY on `id`
- UNIQUE INDEX on `email`

---

### tasks
User's todo items
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
```

**Fields**
- `id`: Auto-incrementing integer, primary key
- `user_id`: Owner of the task, foreign key to users.id
- `title`: Task title, required, max 200 chars
- `description`: Optional detailed description
- `completed`: Completion status, defaults to false
- `created_at`: Task creation timestamp
- `updated_at`: Last modification timestamp

**Indexes**
- PRIMARY KEY on `id`
- INDEX on `user_id` (for fast user task lookups)
- INDEX on `completed` (for filtering by status)

**Constraints**
- `user_id` FOREIGN KEY references `users(id)` ON DELETE CASCADE
- `title` NOT NULL

---

## SQLModel Models

### Task Model (backend/models.py)
```python
from sqlmodel import Field, SQLModel
from datetime import datetime
from typing import Optional

class Task(SQLModel, table=True):
    __tablename__ = "tasks"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="users.id", index=True)
    title: str = Field(max_length=200)
    description: Optional[str] = None
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

## Relationships
users (1) ────── (N) tasks
id                  user_id

- One user has many tasks
- Each task belongs to one user
- Cascade delete: When user is deleted, all their tasks are deleted

## Database Migrations

For Phase II, using direct SQLModel table creation:
```python
# database.py
from sqlmodel import create_engine, SQLModel

engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
```

## Query Patterns

### Get all tasks for user
```python
tasks = session.exec(
    select(Task)
    .where(Task.user_id == user_id)
    .order_by(Task.created_at.desc())
).all()
```

### Get pending tasks
```python
tasks = session.exec(
    select(Task)
    .where(Task.user_id == user_id, Task.completed == False)
).all()
```

### Update task
```python
task.title = new_title
task.updated_at = datetime.utcnow()
session.add(task)
session.commit()
session.refresh(task)
```