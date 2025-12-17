
'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(to right, #2563eb, #9333ea, #dc2626)',
          backgroundSize: '200%',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)',
        }
      case 'secondary':
        return {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
        }
      case 'danger':
        return {
          background: 'linear-gradient(to right, #dc2626, #b91c1c)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
        }
      case 'ghost':
        return {
          background: 'transparent',
          border: 'none',
          color: '#94a3b8',
        }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '0.5rem 1rem', fontSize: '0.875rem' }
      case 'md':
        return { padding: '0.75rem 1.5rem', fontSize: '1rem' }
      case 'lg':
        return { padding: '1rem 2rem', fontSize: '1.125rem' }
    }
  }

  const baseStyles = {
    borderRadius: '0.75rem',
    fontWeight: '600',
    cursor: loading || disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    opacity: loading || disabled ? 0.5 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    ...getVariantStyles(),
    ...getSizeStyles(),
  }

  return (
    <button
      style={baseStyles}
      disabled={loading || disabled}
      onMouseEnter={(e) => {
        if (!loading && !disabled) {
          e.currentTarget.style.transform = 'translateY(-2px)'
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(168, 85, 247, 0.5)'
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!loading && !disabled) {
          e.currentTarget.style.transform = 'translateY(0)'
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(168, 85, 247, 0.3)'
          }
        }
      }}
      {...props}
    >
      {loading ? (
        <>
          <div style={{
            width: '1rem',
            height: '1rem',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  )
}
