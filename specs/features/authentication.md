# Feature: User Authentication

## User Stories

### US-006: User Signup
**As a** new user  
**I want to** create an account  
**So that** I can start managing my tasks

**Acceptance Criteria:**
- Email must be unique and valid format
- Password must be at least 8 characters
- Password is securely hashed (bcrypt)
- User receives JWT token upon successful signup
- User is automatically logged in after signup
- Validation errors displayed for invalid input

### US-007: User Login
**As a** registered user  
**I want to** log into my account  
**So that** I can access my tasks

**Acceptance Criteria:**
- User provides email and password
- Credentials are validated against database
- JWT token issued on successful authentication
- Token valid for 7 days
- Invalid credentials show error message
- User redirected to dashboard on success

### US-008: Protected Routes
**As a** the system  
**I want to** protect task endpoints  
**So that** only authenticated users can access their data

**Acceptance Criteria:**
- All `/api/{user_id}/tasks` endpoints require JWT
- Requests without token receive 401 Unauthorized
- Expired tokens receive 401 Unauthorized
- Invalid tokens receive 401 Unauthorized
- User ID from token must match URL user_id

## Authentication Architecture

### Better Auth Configuration
```typescript
// Frontend: lib/auth.ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    // Better Auth manages its own tables in Neon DB
    provider: "postgresql",
    url: process.env.DATABASE_URL,
  },
  jwt: {
    enabled: true,
    expiresIn: "7d",
    issuer: "todo-app",
  },
  secret: process.env.BETTER_AUTH_SECRET,
});
```

### JWT Token Structure
```json
{
  "sub": "user-id-123",
  "email": "user@example.com",
  "iat": 1701234567,
  "exp": 1701839367,
  "iss": "todo-app"
}
```

### Backend JWT Validation
```python
# Backend: middleware/jwt_middleware.py
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

security = HTTPBearer()

async def verify_jwt(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"],
            issuer="todo-app"
        )
        return payload["sub"]  # Returns user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

## Security Requirements

1. **Password Security**
   - Minimum 8 characters
   - Hashed with bcrypt (12 rounds)
   - Never stored in plaintext
   - Never returned in API responses

2. **Token Security**
   - JWT signed with HS256
   - Shared secret between frontend/backend
   - Stored in httpOnly cookie (frontend)
   - Sent in Authorization header (API calls)

3. **Session Security**
   - Token expires after 7 days
   - No automatic refresh in Phase II
   - User must re-login after expiry

4. **API Security**
   - All task endpoints require valid JWT
   - User ID extracted from token (not trusted from request)
   - Cross-user access prevented
   - CORS restricted to frontend domain