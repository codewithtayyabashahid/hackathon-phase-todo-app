
'use client'

import { InputHTMLAttributes, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: string
  helperText?: string
}

export default function Input({
  label,
  error,
  icon,
  helperText,
  className = '',
  type = 'text',
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === 'password'

  return (
    <div style={{ width: '100%' }}>
      {/* Label */}
      {label && (
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          marginBottom: '0.5rem',
          color: 'white',
          transition: 'color 0.2s ease',
        }}>
          {label}
          {props.required && (
            <span style={{
              color: '#ef4444',
              marginLeft: '0.25rem',
              animation: 'pulse-subtle 2s ease-in-out infinite',
            }}>
              *
            </span>
          )}
        </label>
      )}

      {/* Input Container */}
      <div style={{ position: 'relative' }}>
        {/* Icon */}
        {icon && (
          <div style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.25rem',
            transition: 'all 0.3s ease',
            opacity: isFocused ? 1 : 0.5,
          }}>
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          type={isPassword && showPassword ? 'text' : type}
          style={{
            width: '100%',
            backdropFilter: 'blur(16px)',
            backgroundColor: isFocused ? 'rgba(30, 41, 59, 0.7)' : 'rgba(30, 41, 59, 0.3)',
            border: `2px solid ${error ? '#ef4444' : isFocused ? '#a855f7' : '#475569'}`,
            borderRadius: '0.75rem',
            padding: icon ? '0.875rem 1rem 0.875rem 3rem' : '0.875rem 1rem',
            paddingRight: isPassword ? '3rem' : '1rem',
            color: 'white',
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            outline: 'none',
            boxShadow: isFocused ? (error ? '0 0 0 4px rgba(239, 68, 68, 0.1)' : '0 0 0 4px rgba(168, 85, 247, 0.1)') : 'none',
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.25rem',
              color: '#94a3b8',
              transition: 'all 0.2s ease',
              padding: '0.25rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#a855f7'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#94a3b8'
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
            }}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}

        {/* Gradient Border Animation */}
        {isFocused && !error && (
          <div style={{
            position: 'absolute',
            inset: '-2px',
            background: 'linear-gradient(45deg, #3b82f6, #a855f7, #ef4444, #3b82f6)',
            backgroundSize: '300%',
            borderRadius: '0.75rem',
            opacity: 0.3,
            filter: 'blur(8px)',
            zIndex: -1,
            animation: 'gradient-rotate 3s linear infinite',
          }} />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '0.5rem',
          animation: 'shake 0.3s ease',
        }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
            style={{ color: '#ef4444', flexShrink: 0 }}
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p style={{
            color: '#ef4444',
            fontSize: '0.875rem',
            margin: 0,
          }}>
            {error}
          </p>
        </div>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p style={{
          color: '#64748b',
          fontSize: '0.875rem',
          marginTop: '0.5rem',
        }}>
          {helperText}
        </p>
      )}

      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes gradient-rotate {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        input::placeholder {
          color: #64748b;
        }

        input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}
