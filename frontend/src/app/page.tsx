
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '24rem',
          height: '24rem',
          background: 'rgba(59, 130, 246, 0.2)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 20s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '25%',
          right: '25%',
          width: '24rem',
          height: '24rem',
          background: 'rgba(168, 85, 247, 0.2)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float-delayed 25s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '24rem',
          height: '24rem',
          background: 'rgba(239, 68, 68, 0.2)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'pulse-slow 6s ease-in-out infinite',
        }} />
      </div>

      {/* Mouse Follower */}
      {mounted && (
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
        }} />
      )}

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}>
        <div style={{ maxWidth: '72rem', width: '100%', textAlign: 'center' }}>
          
          {/* Hero Section */}
          <div style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease',
            marginBottom: '3rem',
          }}>
            {/* Animated Emoji */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
              <div style={{
                fontSize: '8rem',
                animation: 'bounce-slow 3s ease-in-out infinite',
                filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))',
              }}>
                📝
              </div>
              <div style={{
                position: 'absolute',
                inset: '-1rem',
                background: 'linear-gradient(to right, #3b82f6, #a855f7, #ef4444)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                opacity: 0.5,
                animation: 'pulse 2s ease-in-out infinite',
              }} />
            </div>

            {/* Title */}
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <h1 style={{
                fontSize: 'clamp(3rem, 10vw, 8rem)',
                fontWeight: 900,
                marginBottom: '1rem',
                background: 'linear-gradient(to right, #60a5fa, #c084fc, #f87171)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '300%',
                animation: 'gradient-text 5s ease infinite',
              }}>
                Todo App
              </h1>
              <div style={{
                height: '8px',
                width: '16rem',
                margin: '0 auto',
                background: 'linear-gradient(to right, #3b82f6, #a855f7, #ef4444)',
                borderRadius: '9999px',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
            </div>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              color: '#e2e8f0',
              fontWeight: 300,
              marginBottom: '2rem',
            }}>
              Organize Your Life with <span style={{
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #3b82f6, #a855f7, #ef4444)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Style</span> ✨
            </p>

            {/* Creator Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backdropFilter: 'blur(16px)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              animation: mounted ? 'slide-in-bottom 1s ease-out' : 'none',
            }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: 'white',
                  animation: 'spin-slow 10s linear infinite',
                }}>
                  T
                </div>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)',
                  borderRadius: '50%',
                  animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                  opacity: 0.75,
                }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.125rem',
                }}>
                  Created by
                </p>
                <p style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(to right, #3b82f6, #a855f7, #ef4444)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Tayyaba Shahid
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            justifyContent: 'center',
            marginBottom: '5rem',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease 0.3s',
          }}
          className="sm:flex-row"
          >
            <Link
              href="/signup"
              style={{
                position: 'relative',
                padding: '1.25rem 2.5rem',
                borderRadius: '1rem',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'white',
                textDecoration: 'none',
                overflow: 'hidden',
                background: 'linear-gradient(to right, #2563eb, #9333ea, #dc2626)',
                backgroundSize: '200%',
                animation: 'gradient-shift 5s ease infinite',
                boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)',
                transition: 'all 0.3s ease',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(168, 85, 247, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(168, 85, 247, 0.3)'
              }}
            >
              Get Started 🚀
            </Link>
            
            <Link
              href="/login"
              style={{
                padding: '1.25rem 2.5rem',
                borderRadius: '1rem',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'white',
                textDecoration: 'none',
                backdropFilter: 'blur(16px)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              }}
            >
              Sign In →
            </Link>
          </div>

          {/* Feature Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease 0.5s',
          }}>
            {[
              { icon: '✨', title: 'Beautiful Design', desc: 'Stunning gradient theme with glassmorphism effects' },
              { icon: '🔒', title: 'Secure Auth', desc: 'Enterprise-grade authentication with JWT tokens' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'Built with Next.js 16 and optimized for performance' }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  backdropFilter: 'blur(16px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  transition: 'all 0.5s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1))',
                  transition: 'all 0.3s ease',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  color: 'white',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#94a3b8',
                  lineHeight: '1.6',
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            marginTop: '5rem',
            color: '#64748b',
            fontSize: '0.875rem',
            opacity: mounted ? 1 : 0,
            transition: 'all 1s ease 0.7s',
          }}>
            <p style={{ animation: 'pulse-subtle 3s ease-in-out infinite' }}>
              Phase II • Hackathon Project • 2025
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
          50% { opacity: 0.8; box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }

        @keyframes gradient-text {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        @keyframes slide-in-bottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @media (min-width: 640px) {
          .sm\\:flex-row {
            flex-direction: row !important;
          }
        }
      `}</style>
    </div>
  )
}
