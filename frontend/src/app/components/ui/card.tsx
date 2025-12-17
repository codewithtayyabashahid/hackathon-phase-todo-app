
'use client'

import { ReactNode, HTMLAttributes, useState } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  gradient?: boolean
  glow?: boolean
  clickable?: boolean
}

export default function Card({
  children,
  hover = false,
  gradient = false,
  glow = false,
  clickable = false,
  className = '',
  ...props
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        position: 'relative',
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        transition: 'all 0.3s ease',
        cursor: clickable ? 'pointer' : 'default',
        transform: isHovered && hover ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered && hover
          ? '0 20px 40px rgba(168, 85, 247, 0.2)'
          : '0 10px 25px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
      {...props}
    >
      {/* Gradient Border Effect */}
      {gradient && isHovered && (
        <div style={{
          position: 'absolute',
          inset: '-2px',
          background: 'linear-gradient(45deg, #3b82f6, #a855f7, #ef4444, #3b82f6)',
          backgroundSize: '300%',
          borderRadius: '1.5rem',
          opacity: 0.5,
          filter: 'blur(10px)',
          zIndex: -1,
          animation: 'gradient-rotate 3s linear infinite',
        }} />
      )}

      {/* Glow Effect */}
      {glow && isHovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          borderRadius: '1.5rem',
          pointerEvents: 'none',
          animation: 'pulse-glow 2s ease-in-out infinite',
        }} />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      <style jsx>{`
        @keyframes gradient-rotate {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

// Card Sub-components
export function CardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 style={{
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      background: 'linear-gradient(to right, #60a5fa, #c084fc, #f87171)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p style={{
      color: '#94a3b8',
      fontSize: '0.875rem',
      lineHeight: '1.5',
    }}>
      {children}
    </p>
  )
}

export function CardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div style={{ padding: '0.5rem 0' }}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div style={{
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      {children}
    </div>
  )
}
