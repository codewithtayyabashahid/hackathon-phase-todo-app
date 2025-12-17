
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Task {
  id: number
  user_id: string
  title: string
  description: string
  completed: boolean
  created_at: string
  updated_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [formError, setFormError] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Mock data for demo - replace with actual API call
    const mockTasks: Task[] = [
      { id: 1, user_id: 'user-1', title: 'Complete Phase II', description: 'Finish the todo app with beautiful design', completed: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 2, user_id: 'user-1', title: 'Review specifications', description: 'Go through all the project requirements', completed: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 3, user_id: 'user-1', title: 'Deploy to Vercel', description: 'Deploy the frontend application', completed: false, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    ]
    
    setTimeout(() => {
      setTasks(mockTasks)
      setLoading(false)
    }, 1000)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const handleCreateTask = () => {
    if (!formData.title.trim()) {
      setFormError('Title is required')
      return
    }
    
    const newTask: Task = {
      id: Date.now(),
      user_id: 'user-1',
      title: formData.title,
      description: formData.description,
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    
    setTasks([newTask, ...tasks])
    setFormData({ title: '', description: '' })
    setShowForm(false)
    setFormError('')
  }

  const handleToggle = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(t => t.id !== id))
    }
  }

  const handleLogout = () => {
    router.push('/')
  }

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
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
      backgroundSize: '200% 200%',
      animation: 'gradient-shift 15s ease infinite',
    }}>
      {/* Floating Orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '30rem',
          height: '30rem',
          background: 'rgba(59, 130, 246, 0.2)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 25s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '30rem',
          height: '30rem',
          background: 'rgba(168, 85, 247, 0.2)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float-delayed 30s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '25rem',
          height: '25rem',
          background: 'rgba(239, 68, 68, 0.15)',
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'pulse-slow 8s ease-in-out infinite',
        }} />
      </div>

      {/* Mouse Follower */}
      <div style={{
        position: 'absolute',
        left: mousePosition.x - 200,
        top: mousePosition.y - 200,
        width: '25rem',
        height: '25rem',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        transition: 'all 0.3s ease-out',
        zIndex: 0,
      }} />

      {/* Navigation */}
      <nav style={{
        position: 'relative',
        zIndex: 10,
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1rem 2rem',
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem' }}>📝</span>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #c084fc, #f87171)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Todo App
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '0.875rem',
              }}>
                T
              </div>
              <span style={{ color: 'white', fontSize: '0.875rem' }}>Tayyaba Shahid</span>
            </div>
            
            <button
              onClick={handleLogout}
              style={{
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '2rem',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <div>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #c084fc, #f87171)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
            }}>
              My Tasks
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.125rem' }}>
              {tasks.length} total • {tasks.filter(t => !t.completed).length} pending • {tasks.filter(t => t.completed).length} completed
            </p>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '1rem 2rem',
              borderRadius: '1rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'white',
              border: 'none',
              background: 'linear-gradient(to right, #2563eb, #9333ea, #dc2626)',
              backgroundSize: '200%',
              animation: 'gradient-shift 5s ease infinite',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(168, 85, 247, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(168, 85, 247, 0.3)'
            }}
          >
            + Create Task
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0.5rem',
          borderRadius: '1rem',
          width: 'fit-content',
          marginBottom: '2rem',
        }}>
          {(['all', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ...(filter === f ? {
                  background: 'linear-gradient(to right, #2563eb, #9333ea, #dc2626)',
                  color: 'white',
                  boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
                } : {
                  background: 'transparent',
                  color: '#94a3b8',
                }),
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              margin: '0 auto',
              border: '4px solid rgba(168, 85, 247, 0.2)',
              borderTopColor: '#a855f7',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            backdropFilter: 'blur(16px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1.5rem',
          }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
              {filter === 'completed' ? '✅' : '📝'}
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
              No {filter !== 'all' && filter} tasks
            </h3>
            <p style={{ color: '#94a3b8' }}>
              {filter === 'completed' ? 'Complete some tasks to see them here' : 'Create your first task to get started'}
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
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
                {/* Checkbox */}
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
                  <button
                    onClick={() => handleToggle(task.id)}
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
                    }}
                  >
                    {task.completed && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
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
                    }}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p style={{
                        color: '#94a3b8',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
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
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {formatTimeAgo(task.created_at)}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleDelete(task.id)}
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
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      {showForm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          padding: '1rem',
        }}
        onClick={() => setShowForm(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '32rem',
              backdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '1.5rem',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              animation: 'scale-up 0.3s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              background: 'linear-gradient(to right, #60a5fa, #c084fc, #f87171)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Create New Task
            </h2>

            {formError && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid #ef4444',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                marginBottom: '1rem',
              }}>
                <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{formError}</p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: 'white',
                }}>
                  Title <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title"
                  maxLength={200}
                  style={{
                    width: '100%',
                    backdropFilter: 'blur(16px)',
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    border: '2px solid #475569',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 1rem',
                    color: 'white',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#a855f7'
                    e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#475569'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                  {formData.title.length}/200 characters
                </p>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: 'white',
                }}>
                  Description <span style={{ color: '#64748b', fontWeight: 'normal' }}>(optional)</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add more details..."
                  maxLength={1000}
                  rows={4}
                  style={{
                    width: '100%',
                    backdropFilter: 'blur(16px)',
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    border: '2px solid #475569',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 1rem',
                    color: 'white',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    resize: 'none',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#a855f7'
                    e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#475569'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                  {formData.description.length}/1000 characters
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setFormData({ title: '', description: '' })
                    setFormError('')
                  }}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    background: 'linear-gradient(to right, #2563eb, #9333ea, #dc2626)',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(168, 85, 247, 0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(168, 85, 247, 0.3)'
                  }}
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-30px, 30px); }
          66% { transform: translate(20px, -20px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

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

        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
