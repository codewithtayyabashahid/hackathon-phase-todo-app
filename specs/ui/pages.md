# UI Pages Specification

## Page Structure

All pages use the Next.js 16 App Router structure.

---

## Root Layout
**Location**: `frontend/src/app/layout.tsx`

**Purpose**: Global layout wrapper for all pages

**Features**:
- HTML structure and metadata
- Global CSS imports
- Font configuration (Inter)
- Theme provider (if using)

**Structure**:
```tsx
export default function RootLayout({ children }) {
  return (
    
      
        Todo App - Phase II
        
      
      
        {children}
      
    
  );
}
```

**Background**:
```css
bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
min-h-screen
text-white
```

---

## Landing Page
**Location**: `frontend/src/app/page.tsx`

**Purpose**: Landing page with login/signup links

**Features**:
- Hero section with gradient title
- Call-to-action buttons
- Feature highlights
- Animations

**Layout**:
┌───────────────────────────────────────────┐
│                                           │
│          📝 Todo App                      │
│     Organize Your Life with AI            │
│                                           │
│      [Get Started]  [Sign In]             │
│                                           │
│  ✨ Features:                             │
│   • Beautiful gradient design             │
│   • Secure authentication                 │
│   • Multi-device sync                     │
└───────────────────────────────────────────┘

**Styling**:
- Title: `text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent`
- Subtitle: `text-2xl text-slate-300`
- Buttons: Gradient with hover effects

---

## Login Page
**Location**: `frontend/src/app/(auth)/login/page.tsx`

**Purpose**: User authentication

**Features**:
- Email input
- Password input
- Login button
- Link to signup
- Error display
- Loading state

**Layout**:
┌─────────────────────────────────────┐
│        Welcome Back                 │
│                                     │
│  Email                              │
│  [                               ]  │
│                                     │
│  Password                           │
│  [                               ]  │
│                                     │
│  [          Sign In            ]    │
│                                     │
│  Don't have an account? Sign Up     │
└─────────────────────────────────────┘

**Form Structure**:
```tsx
interface LoginForm {
  email: string;
  password: string;
}
```

**Validation**:
- Email: Required, valid email format
- Password: Required, min 8 characters

**On Success**:
- Store JWT token
- Redirect to `/dashboard`

**Error Messages**:
- Invalid credentials: "Email or password is incorrect"
- Network error: "Unable to connect. Please try again."

---

## Signup Page
**Location**: `frontend/src/app/(auth)/signup/page.tsx`

**Purpose**: New user registration

**Features**:
- Name input
- Email input
- Password input
- Confirm password input
- Signup button
- Link to login
- Error display
- Loading state

**Layout**:
┌─────────────────────────────────────┐
│        Create Account               │
│                                     │
│  Name                               │
│  [                               ]  │
│                                     │
│  Email                              │
│  [                               ]  │
│                                     │
│  Password                           │
│  [                               ]  │
│                                     │
│  Confirm Password                   │
│  [                               ]  │
│                                     │
│  [         Create Account      ]    │
│                                     │
│  Already have an account? Sign In   │
└─────────────────────────────────────┘

**Form Structure**:
```tsx
interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
```

**Validation**:
- Name: Required, 2-50 characters
- Email: Required, valid email format, unique
- Password: Required, min 8 characters
- Confirm Password: Must match password

**On Success**:
- Store JWT token
- Redirect to `/dashboard`

**Error Messages**:
- Email exists: "This email is already registered"
- Passwords don't match: "Passwords do not match"
- Weak password: "Password must be at least 8 characters"

---

## Dashboard Page
**Location**: `frontend/src/app/dashboard/page.tsx`

**Purpose**: Main application interface

**Features**:
- Navigation header
- Create task button
- Task list with filtering
- Task cards with actions
- Empty state
- Loading state

**Layout**:
┌──────────────────────────────────────────────────┐
│ Navigation Component                             │
├──────────────────────────────────────────────────┤
│                                                  │
│  My Tasks                    [+ Create Task]     │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │ TaskList Component                         │ │
│  │  [All] [Pending] [Completed]               │ │
│  │  ────────────────────────────────────────  │ │
│  │  TaskCard 1                                │ │
│  │  TaskCard 2                                │ │
│  │  TaskCard 3                                │ │
│  └────────────────────────────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘

**Page States**:

1. **Loading State**:
```tsx
<div className="animate-pulse">
  <div className="h-24 bg-slate-700/50 rounded-xl mb-4"></div>
  <div className="h-24 bg-slate-700/50 rounded-xl mb-4"></div>
  <div className="h-24 bg-slate-700/50 rounded-xl"></div>
</div>
```

2. **Empty State**:
```tsx
<div className="text-center py-16">
  <div className="text-6xl mb-4">📝</div>
  <h3 className="text-2xl font-bold mb-2">No tasks yet</h3>
  <p className="text-slate-400 mb-6">
    Create your first task to get started
  </p>
  <Button onClick={handleCreate}>Create Task</Button>
</div>
```

3. **Task List State**:
- Display TaskList component
- Show filtered tasks
- Enable CRUD operations

**Modals**:

1. **Create Task Modal**:
- Overlay with backdrop blur
- TaskForm component
- Close on outside click or cancel

2. **Edit Task Modal**:
- Same as create but pre-filled
- Update instead of create

3. **Delete Confirmation**:
┌────────────────────────────────┐
│  Delete Task?                  │
│                                │
│  Are you sure you want to      │
│  delete "Task title"?          │
│                                │
│  [Cancel]    [Delete]          │
└────────────────────────────────┘

**Interactions**:
- Click "+ Create Task" → Open create modal
- Click task checkbox → Toggle completion
- Click "Edit" → Open edit modal
- Click "Delete" → Show confirmation
- Filter tabs → Filter task list

---

## Authentication Flow

### Protected Routes
Dashboard page checks authentication:
```tsx
export default async function DashboardPage() {
  const session = await auth.getSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return <Dashboard user={session.user} />;
}
```

### Session Management
- Token stored in httpOnly cookie
- Checked on every protected page load
- Expired tokens redirect to login

---

## Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Stack navigation items
- Full-width task cards
- Bottom sheet modals

### Tablet (640px - 1024px)
- Two column layout
- Side-by-side auth forms
- Grid task cards (2 columns)

### Desktop (> 1024px)
- Three column layout (when applicable)
- Centered auth forms (max 500px)
- Grid task cards (3 columns)
- Larger modals

---

## Loading and Error States

### Loading Pattern
```tsx
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
    </div>
  );
}
```

### Error Pattern
```tsx
if (error) {
  return (
    <div className="bg-red-500/10 border border-red-500 rounded-xl p-4">
      <p className="text-red-500">{error}</p>
    </div>
  );
}
```

---

## SEO and Metadata
```tsx
// metadata object for each page
export const metadata = {
  title: 'Dashboard - Todo App',
  description: 'Manage your tasks efficiently',
  openGraph: {
    title: 'Todo App',
    description: 'Modern todo application',
    images: ['/og-image.png'],
  },
};
```