# Frontend Development Guidelines

## Stack
- Next.js 16 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- Better Auth

## Project Structure
src/
├── app/             # Pages using App Router
├── components/      # Reusable components
│   ├── ui/         # Base UI components
│   └── ...         # Business components
├── lib/            # Utilities and configs
└── styles/         # Global styles

## Patterns

### Server vs Client Components
- **Default**: Server Components (better performance)
- **Client Components**: Only when needed
  - Use `'use client'` directive
  - Needed for: interactivity, hooks, browser APIs

### API Calls
All backend calls through `/lib/api.ts`:
```typescript
import { api } from '@/lib/api';

const tasks = await api.getTasks(userId);
```

### Styling
- ✅ Tailwind CSS classes only
- ❌ No inline styles
- ✅ Gradient theme: Blue → Purple → Red → Black
- ✅ Glassmorphism effects

### State Management
- Use React hooks (useState, useEffect)
- Server actions for mutations
- Optimistic updates for better UX

## Component Guidelines

### File Structure
```typescript
'use client';

import { useState } from 'react';

interface Props {
  // Props here
}

export default function Component({ }: Props) {
  // Implementation
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### Naming Conventions
- Components: PascalCase (`TaskCard.tsx`)
- Functions: camelCase (`handleSubmit`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

## Running
```bash
npm run dev        # Development
npm run build      # Production build
npm run start      # Production server
```