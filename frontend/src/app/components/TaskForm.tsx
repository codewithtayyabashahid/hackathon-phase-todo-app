
'use client'

import { useState } from 'react'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

interface TaskFormProps {
  task?: Task | null
  onSubmit: (data: { title: string; description: string }) => void
  onCancel: () => void
}

export default function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }

    if (formData.title.length > 200) {
      setError('Title must be less than 200 characters')
      return
    }

    if (formData.description.length > 1000) {
      setError('Description must be less than 1000 characters')
      return
    }

    onSubmit(formData)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        padding: '1rem',
        animation: 'fade-in 0.2s ease-out',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '32rem',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          animation: 'scale-up 0.3s ease-out',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient Border */}
        <div style={{
          position: 'absolute',
          inset: '-2px',
          background: 'linear-gradient(45deg, #3b82f6, #a855f7, #ef4444)',
          borderRadius: '1.5rem',
          opacity: 0.5,
          filter: 'blur(10px)',
          zIndex: -1,
        }} />

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            background: 'linear-gradient(to right, #60a5fa, #c084fc, #f87171)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            {task ? 'Update your task details' : 'Fill in the details to create a new task'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            animation: 'shake 0.5s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>⚠️</span>
              <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: 0 }}>{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Title Input */}
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'white',
            }}>
              <span>Title</span>
              <span style={{ color: '#ef4444' }}>*</span>
              <span style={{
                marginLeft: 'auto',
                color: '#64748b',
                fontSize: '0.75rem',
              }}>
                {formData.title.length}/200
              </span>
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
                padding: '0.875rem 1rem',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7'
                e.target.style.boxShadow = '0 0 0 4px rgba(168, 85, 247, 0.1)'
                e.target.style.backgroundColor = 'rgba(30, 41, 59, 0.7)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#475569'
                e.target.style.boxShadow = 'none'
                e.target.style.backgroundColor = 'rgba(30, 41, 59, 0.5)'
              }}
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'white',
            }}>
              <span>Description</span>
              <span style={{ color: '#64748b', fontWeight: 'normal' }}>(optional)</span>
              <span style={{
                marginLeft: 'auto',
                color: '#64748b',
                fontSize: '0.75rem',
              }}>
                {formData.description.length}/1000
              </span>
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
                padding: '0.875rem 1rem',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                resize: 'vertical',
                fontFamily: 'inherit',
                minHeight: '100px',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7'
                e.target.style.boxShadow = '0 0 0 4px rgba(168, 85, 247, 0.1)'
                e.target.style.backgroundColor = 'rgba(30, 41, 59, 0.7)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#475569'
                e.target.style.boxShadow = 'none'
                e.target.style.backgroundColor = 'rgba(30, 41, 59, 0.5)'
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onCancel}
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
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '0.875rem',
                borderRadius: '0.75rem',
                border: 'none',
                background: 'linear-gradient(to right, #2563eb, #9333ea, #dc2626)',
                backgroundSize: '200%',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)',
                animation: 'gradient-shift 3s ease infinite',
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
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}
