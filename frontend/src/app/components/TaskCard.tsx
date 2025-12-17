
'use client'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  created_at: string
}

interface TaskCardProps {
  task: Task
  onToggle: (id: number) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  index?: number
}

export default function TaskCard({ task, onToggle, onEdit, onDelete, index = 0 }: TaskCardProps) {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (seconds < 60) return 'just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div
      style={{
        position: 'relative',
        backdropFilter: 'blur(16px)',
        backgroundColor: task.completed ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        opacity: task.completed ? 0.7 : 1,
        animation: `slide-up 0.4s ease-out ${index * 0.1}s both`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.backgroundColor = task.completed ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.05)'
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Gradient Border Effect */}
      <div style={{
        position: 'absolute',
        inset: '-1px',
        background: 'linear-gradient(45deg, #3b82f6, #a855f7, #ef4444)',
        borderRadius: '1.5rem',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
      }} />

      {/* Checkbox */}
      <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggle(task.id)
          }}
          style={{
            flexShrink: 0,
            width: '1.5rem',
            height: '1.5rem',
            borderRadius: '0.5rem',
            border: '2px solid',
            borderColor: task.completed ? '#a855f7' : '#475569',
            background: task.completed ? 'linear-gradient(to bottom right, #3b82f6, #9333ea)' : 'transparent',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            if (!task.completed) {
              e.currentTarget.style.borderColor = '#a855f7'
              e.currentTarget.style.transform = 'scale(1.1)'
            }
          }}
          onMouseLeave={(e) => {
            if (!task.completed) {
              e.currentTarget.style.borderColor = '#475569'
              e.currentTarget.style.transform = 'scale(1)'
            }
          }}
        >
          {task.completed && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"
              style={{ animation: 'check-pop 0.3s ease-out' }}
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'white',
            marginBottom: '0.5rem',
            textDecoration: task.completed ? 'line-through' : 'none',
            opacity: task.completed ? 0.6 : 1,
            transition: 'all 0.3s ease',
          }}>
            {task.title}
          </h3>
          {task.description && (
            <p style={{
              color: '#94a3b8',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '50%',
            background: task.completed ? '#22c55e' : '#3b82f6',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {formatTimeAgo(task.created_at)}
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(task)
            }}
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'rgba(59, 130, 246, 0.2)',
              color: '#3b82f6',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(task.id)
            }}
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes check-pop {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
