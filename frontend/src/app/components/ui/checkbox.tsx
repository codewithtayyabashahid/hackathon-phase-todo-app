
'use client'

import { InputHTMLAttributes, useState } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Checkbox({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  className = '',
  ...props
}: CheckboxProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div style={{
      display: 'flex',
      alignItems: 'start',
      gap: '0.75rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
    }}>
      {/* Checkbox Container */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: '1.5rem',
            height: '1.5rem',
            borderRadius: '0.5rem',
            border: '2px solid',
            borderColor: checked ? '#a855f7' : isHovered ? '#a855f7' : '#475569',
            background: checked
              ? 'linear-gradient(to bottom right, #3b82f6, #9333ea)'
              : isHovered
              ? 'rgba(168, 85, 247, 0.1)'
              : 'transparent',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            position: 'relative',
            transform: isHovered && !disabled ? 'scale(1.1)' : 'scale(1)',
            boxShadow: checked ? '0 4px 12px rgba(168, 85, 247, 0.4)' : 'none',
          }}
        >
          {/* Checkmark */}
          {checked && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                animation: 'check-pop 0.3s ease-out',
              }}
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Glow Effect */}
        {checked && (
          <div style={{
            position: 'absolute',
            inset: '-4px',
            background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)',
            borderRadius: '0.5rem',
            opacity: 0.3,
            filter: 'blur(8px)',
            zIndex: -1,
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
        )}

        {/* Hidden native input for form compatibility */}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          style={{ display: 'none' }}
          {...props}
        />
      </div>

      {/* Label and Description */}
      {(label || description) && (
        <div
          style={{ flex: 1 }}
          onClick={() => !disabled && onChange(!checked)}
        >
          {label && (
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'white',
              marginBottom: description ? '0.25rem' : 0,
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'color 0.2s ease',
            }}>
              {label}
            </label>
          )}
          {description && (
            <p style={{
              fontSize: '0.875rem',
              color: '#94a3b8',
              margin: 0,
              lineHeight: '1.4',
            }}>
              {description}
            </p>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes check-pop {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}
