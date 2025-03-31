'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DashboardPage() {
  const route = useRouter()
  const [user, setUser] = useState({ email: '' })

  const handleProfile = async () => {
    const res = await fetch('/api/v1/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.ok) {
      const data = await res.json()
      setUser({ email: data.email })
    }
  }

  const handleLogout = async () => {
    const res = await fetch('/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.ok) {
      route.push('/auth/login')
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      {JSON.stringify(user)}
      <button onClick={handleProfile}>Get Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
