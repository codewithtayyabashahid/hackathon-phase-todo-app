import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'  // ← This line is critical

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App - Phase II',
  description: 'Modern todo application with authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}