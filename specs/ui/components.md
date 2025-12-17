# UI Components Specification

## Design System

### Color Palette
```typescript
const colors = {
  primary: {
    blue: '#3B82F6',
    purple: '#A855F7',
    red: '#EF4444',
    black: '#0F172A'
  },
  gradients: {
    primary: 'from-blue-500 via-purple-500 to-red-500',
    dark: 'from-slate-900 via-purple-900 to-slate-900',
    card: 'from-slate-800/50 via-purple-900/30 to-slate-800/50'
  }
}
```

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: font-bold, tracking-tight
- **Body**: font-normal, leading-relaxed

### Spacing Scale
- xs: 0.5rem (8px)
- sm: 0.75rem (12px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

---

## Base UI Components

### Button Component
**Location**: `frontend/src/components/ui/button.tsx`

**Variants**:
1. **Primary**: Gradient background, white text
2. **Secondary**: Transparent with border, gradient text
3. **Danger**: Red gradient background
4. **Ghost**: No background, hover gradient

**Sizes**: sm, md, lg

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

**Example**:
```tsx

  Add Task

```

---

### Input Component
**Location**: `frontend/src/components/ui/input.tsx`

**Features**:
- Gradient border on focus
- Glassmorphism effect
- Error state styling
- Label support

**Props**:
```typescript
interface InputProps {
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent) => void;
  required?: boolean;
}
```

**Styling**:
- Background: `bg-slate-800/30`
- Border: `border-2 border-slate-700`
- Focus: `focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50`
- Text: `text-white placeholder-slate-400`

---

### Card Component
**Location**: `frontend/src/components/ui/card.tsx`

**Features**:
- Glassmorphism background
- Gradient border
- Backdrop blur effect
- Hover animation

**Props**:
```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}
```

**Styling**:
```css
bg-gradient-to-br from-slate-800/50 via-purple-900/30 to-slate-800/50
backdrop-blur-xl
border border-slate-700/50
rounded-2xl
shadow-xl
hover:shadow-2xl hover:border-purple-500/50
transition-all duration-300
```

---

### Checkbox Component
**Location**: `frontend/src/components/ui/checkbox.tsx`

**Features**:
- Custom gradient checkmark
- Smooth animation
- Accessible (keyboard support)

**Props**:
```typescript
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}
```

**Styling**:
- Unchecked: `border-2 border-slate-600 bg-slate-800`
- Checked: `bg-gradient-to-br from-blue-500 to-purple-600`
- Checkmark: SVG icon with white color

---

## Business Components

### TaskCard Component
**Location**: `frontend/src/components/TaskCard.tsx`

**Purpose**: Display a single task with actions

**Features**:
- Checkbox to toggle completion
- Title and description display
- Edit and delete buttons
- Completed visual state
- Hover effects

**Props**:
```typescript
interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}
```

**Layout**:
┌─────────────────────────────────────────┐
│ ☐ Task Title                     [Edit] │
│   Task description here...       [Delete]│
│   Created: 2 hours ago                  │
└─────────────────────────────────────────┘

**Completed State**:
- Title: `line-through text-slate-500`
- Background: `opacity-60`
- Checkmark: Filled with gradient

---

### TaskForm Component
**Location**: `frontend/src/components/TaskForm.tsx`

**Purpose**: Create or edit tasks

**Features**:
- Title input (required)
- Description textarea (optional)
- Submit and cancel buttons
- Validation and error display
- Edit mode support

**Props**:
```typescript
interface TaskFormProps {
  task?: Task;  // If editing
  onSubmit: (data: TaskInput) => Promise<void>;
  onCancel: () => void;
}
```

**Layout**:
┌─────────────────────────────────────────┐
│ Create New Task                         │
│                                         │
│ Title *                                 │
│ [                                     ] │
│                                         │
│ Description (optional)                  │
│ [                                     ] │
│ [                                     ] │
│ [                                     ] │
│                                         │
│             [Cancel] [Create Task]      │
└─────────────────────────────────────────┘

---

### TaskList Component
**Location**: `frontend/src/components/TaskList.tsx`

**Purpose**: Display list of tasks with filtering

**Features**:
- Filter tabs (All, Pending, Completed)
- Empty state
- Loading state
- Task cards grid/list

**Props**:
```typescript
interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}
```

**Layout**:
┌─────────────────────────────────────────┐
│ [All] [Pending] [Completed]             │
├─────────────────────────────────────────┤
│ TaskCard 1                              │
│ TaskCard 2                              │
│ TaskCard 3                              │
│ ...                                     │
└─────────────────────────────────────────┘

**Empty State**:
```tsx
<div className="text-center py-12">
  <p className="text-slate-400 text-lg">No tasks yet</p>
  <p className="text-slate-500">Create your first task to get started</p>
</div>
```

---

### Navigation Component
**Location**: `frontend/src/components/Navigation.tsx`

**Purpose**: App header with navigation and user menu

**Features**:
- Logo and app name
- User email display
- Logout button
- Gradient background

**Props**:
```typescript
interface NavigationProps {
  userEmail: string;
  onLogout: () => void;
}
```

**Layout**:
┌──────────────────────────────────────────────────┐
│ 📝 Todo App          user@example.com [Logout]  │
└──────────────────────────────────────────────────┘

**Styling**:
```css
bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900
border-b border-slate-700/50
px-6 py-4
```

---

## Animation Classes

### Transitions
```css
.transition-smooth {
  @apply transition-all duration-300 ease-in-out;
}

.transition-fast {
  @apply transition-all duration-200 ease-in-out;
}
```

### Hover Effects
```css
.hover-lift {
  @apply hover:-translate-y-1 hover:shadow-xl;
}

.hover-glow {
  @apply hover:shadow-lg hover:shadow-purple-500/50;
}
```

### Loading Animations
```css
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## Responsive Breakpoints
```css
/* Mobile-first approach */
sm: 640px   /* Tablet */
md: 768px   /* Small laptop */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

**Usage**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```