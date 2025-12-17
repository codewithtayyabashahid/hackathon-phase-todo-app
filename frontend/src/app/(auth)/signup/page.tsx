
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signUp } from '@/lib/auth-client'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name.trim()) {
      setError('Name is required')
      return
    }

    if (!formData.email.trim()) {
      setError('Email is required')
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      // Call real backend API
      await signUp(formData.email, formData.password, formData.name)
      
      console.log('✅ Account created successfully!')
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Signup error:', err)
      setError(err.message || 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
      backgroundSize: '200% 200%',
      animation: 'gradient-shift 15s ease infinite',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      {/* Floating Orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '20rem',
          height: '20rem',
          background: 'rgba(59, 130, 246, 0.3)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '20rem',
          height: '20rem',
          background: 'rgba(168, 85, 247, 0.3)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float-delayed 25s ease-in-out infinite',
        }} />
      </div>

      {/* Signup Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '28rem',
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'slide-up 0.6s ease-out',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '0.5rem',
            animation: 'bounce-slow 3s ease-in-out infinite',
          }}>
            ✨
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            background: 'linear-gradient(to right, #60a5fa, #c084fc, #f87171)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Create Account
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Join us today
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '1.5rem',
            animation: 'shake 0.3s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>⚠️</span>
              <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: 0 }}>{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'white',
            }}>
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                backdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(30, 41, 59, 0.3)',
                border: '2px solid #475569',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
              }}
              placeholder="John Doe"
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7'
                e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#475569'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'white',
            }}>
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                backdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(30, 41, 59, 0.3)',
                border: '2px solid #475569',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
              }}
              placeholder="you@example.com"
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7'
                e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#475569'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'white',
            }}>
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                width: '100%',
                backdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(30, 41, 59, 0.3)',
                border: '2px solid #475569',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
              }}
              placeholder="••••••••"
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
              Must be at least 8 characters
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
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              style={{
                width: '100%',
                backdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(30, 41, 59, 0.3)',
                border: '2px solid #475569',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                color: 'white',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
              }}
              placeholder="••••••••"
              onFocus={(e) => {
                e.target.style.borderColor = '#a855f7'
                e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#475569'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: 'white',
              border: 'none',
              background: 'linear-gradient(to right, #2563eb, #9333ea, #dc2626)',
              backgroundSize: '200%',
              animation: 'gradient-shift 5s ease infinite',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.5 : 1,
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)',
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: 'white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Creating account...
              </span>
            ) : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#94a3b8',
          fontSize: '0.875rem',
        }}>
          Already have an account?{' '}
          <Link
            href="/login"
            style={{
              color: '#c084fc',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#a855f7'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#c084fc'}
          >
            Sign In
          </Link>
        </p>
      </div>

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

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
