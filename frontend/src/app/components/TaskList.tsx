
'use client'

import TaskCard from './TaskCard'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  created_at: string
}

interface TaskListProps {
  tasks: Task[]
  loading?: boolean
  filter: 'all' | 'pending' | 'completed'
  onToggle: (id: number) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export default function TaskList({ tasks, loading, filter, onToggle, onEdit, onDelete }: TaskListProps) {
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem',
        gap: '1rem',
      }}>
        <div style={{
          width: '4rem',
          height: '4rem',
          border: '4px solid rgba(168, 85, 247, 0.2)',
          borderTopColor: '#a855f7',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <p style={{
          color: '#94a3b8',
          fontSize: '1rem',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          Loading your tasks...
        </p>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '4rem',
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1.5rem',
        animation: 'fade-in 0.5s ease-out',
      }}>
        <div style={{
          fontSize: '5rem',
          marginBottom: '1rem',
          animation: 'bounce-slow 3s ease-in-out infinite',
        }}>
          {filter === 'completed' ? '✅' : filter === 'pending' ? '⏳' : '📝'}
        </div>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'white',
          marginBottom: '0.5rem',
          background: 'linear-gradient(to right, #60a5fa, #c084fc, #f87171)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          No {filter !== 'all' && filter} tasks
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
          {filter === 'completed'
            ? 'Complete some tasks to see them here'
            : filter === 'pending'
            ? 'All tasks are completed! 🎉'
            : 'Create your first task to get started'}
        </p>
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
    }}>
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          index={index}
        />
      ))}
    </div>
  )
}
