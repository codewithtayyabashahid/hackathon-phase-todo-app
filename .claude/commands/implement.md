# Implement Command

## Purpose
Execute the implementation of tasks, referencing specs and plans.

## Usage
```
/implement [task-id]
```

## Template

### Implementation: [Task ID] - [Task Title]

#### Task Reference
- **Task ID**: T-XXX
- **From Spec**: Link to spec section
- **From Plan**: Link to plan section
- **Files to Create/Modify**: List of files

#### Implementation Notes

**Step 1: [Step Name]**
- What: Description
- Why: Reasoning
- How: Implementation approach

**Step 2: [Step Name]**
- What: Description
- Why: Reasoning
- How: Implementation approach

#### Code Implementation

**File: path/to/file**
```language
// Code implementation here
```

**Explanation:**
- Key decision 1
- Key decision 2
- Why this approach

#### Testing

**Manual Testing:**
1. Step 1
2. Step 2
3. Expected result

**Automated Testing:**
```language
// Test code here
```

#### Verification Checklist
- [ ] Code follows constitution principles
- [ ] All acceptance criteria met
- [ ] Code is properly typed
- [ ] Error handling implemented
- [ ] Code is commented where necessary
- [ ] Manual testing passed
- [ ] No console errors
- [ ] Responsive design verified (if UI)

#### Related Tasks
- Depends on: [Task IDs]
- Blocks: [Task IDs]
- Related: [Task IDs]

---

## Example: TaskCard Component

### Implementation: T-001 - TaskCard Component

#### Task Reference
- **Task ID**: T-001
- **From Spec**: specs/features/task-crud.md §US-002
- **From Plan**: specs/architecture.md §Components.TaskCard
- **Files to Create/Modify**: 
  - `frontend/src/components/TaskCard.tsx` (create)

#### Implementation Notes

**Step 1: Define Props Interface**
- What: Create TypeScript interface for component props
- Why: Type safety and better IDE support
- How: Define Task type and callback functions

**Step 2: Implement Layout Structure**
- What: Create card with checkbox, title, description, actions
- Why: Following the design in plan
- How: Use Tailwind classes for glassmorphism effect

**Step 3: Add Time Formatting**
- What: Display "2 hours ago" format
- Why: Better UX than raw timestamps
- How: Create formatDate helper function

**Step 4: Add Hover Effects**
- What: Smooth animations on hover
- Why: Modern, polished feel
- How: Tailwind transition classes

#### Code Implementation

**File: frontend/src/components/TaskCard.tsx**
```typescript
'use client'

interface Task {
  id: number
  user_id: string
  title: string
  description: string
  completed: boolean
  created_at: string
  updated_at: string
}

interface TaskCardProps {
  task: Task
  onToggleComplete: (id: number) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export default function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className={`glass-card space-y-3 ${task.completed ? 'opacity-60' : ''}`}>
      {/* Header with checkbox and title */}
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all ${
            task.completed
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-purple-500'
              : 'border-slate-600 hover:border-purple-500'
          } flex items-center justify-center`}
        >
          {task.completed && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
            {task.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-slate-400 text-sm line-clamp-2 pl-9">
          {task.description}
        </p>
      )}

      {/* Footer with timestamp and actions */}
      <div className="flex items-center justify-between pl-9 pt-2 border-t border-slate-700/50">
        <span className="text-xs text-slate-500">
          {formatDate(task.created_at)}
        </span>

        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
```

**Explanation:**
- Used `glass-card` class from globals.css for glassmorphism effect
- Checkbox has gradient background when checked (matches theme)
- Description uses `line-clamp-2` to limit to 2 lines
- Completed tasks get reduced opacity and strikethrough
- formatDate function converts timestamp to relative time
- All callbacks use proper TypeScript types

#### Testing

**Manual Testing:**
1. Render TaskCard with test data
2. Click checkbox → verify onToggleComplete called
3. Click Edit button → verify onEdit called with task
4. Click Delete button → verify onDelete called with id
5. Check completed state styling
6. Verify hover effects work
7. Test responsive layout on mobile

**Expected Results:**
- ✅ Card renders with glassmorphism effect
- ✅ Checkbox toggles visually
- ✅ Edit/Delete buttons are clickable
- ✅ Completed tasks show strikethrough
- ✅ Time displays in relative format
- ✅ Hover effects animate smoothly

#### Verification Checklist
- [x] Code follows constitution principles (glassmorphism, gradients)
- [x] All acceptance criteria met
- [x] Code is properly typed (TypeScript interfaces)
- [x] Error handling not needed (presentation component)
- [x] Code is clear and readable
- [x] Manual testing passed
- [x] No console errors
- [x] Responsive design verified

#### Related Tasks
- Depends on: None
- Blocks: T-002 (TaskList needs TaskCard)
- Related: T-003 (TaskForm for editing)

---

## Output
Document implementation in code comments or separate implementation log
Reference in commit messages: `[T-001] Create TaskCard component`