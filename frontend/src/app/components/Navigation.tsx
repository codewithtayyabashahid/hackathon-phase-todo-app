
'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

interface NavigationProps {
  userName?: string
}

export default function Navigation({ userName = 'Tayyaba Shahid' }: NavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    // Add logout logic here
    router.push('/')
  }

  return (
    <nav style={{
      position: 'relative',
      backdropFilter: 'blur(16px)',
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '1rem 2rem',
      animation: 'slide-down 0.5s ease-out',
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <span style={{
              fontSize: '2rem',
              animation: 'bounce-slow 3s ease-in-out infinite',
            }}>
              📝
            </span>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #c084fc, #f87171)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200%',
              animation: 'gradient-text 3s ease infinite',
            }}>
              Todo App
            </span>
          </div>
        </Link>
        
        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {pathname === '/dashboard' ? (
            <>
              {/* User Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              }}
              >
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
                  color: 'white',
                  position: 'relative',
                }}>
                  T
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom right, #3b82f6, #9333ea)',
                    borderRadius: '50%',
                    animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                    opacity: 0.75,
                  }} />
                </div>
                <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: '500' }}>
                  {userName}
                </span>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                style={{
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  color: '#ef4444',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.875rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <button style={{
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.875rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
                >
                  Sign In
                </button>
              </Link>
              
              <Link href="/signup" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: 'linear-gradient(to right, #2563eb, #9333ea, #dc2626)',
                  color: 'white',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '0.875rem',
                  boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(168, 85, 247, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(168, 85, 247, 0.3)'
                }}
                >
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes gradient-text {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </nav>
  )
}
