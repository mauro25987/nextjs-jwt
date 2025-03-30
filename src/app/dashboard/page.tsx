"use client"

export default function DashboardPage() {
  const handleProfile = async () => {
    const res = await fetch("/api/v1/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    if (res.ok) {
      const data = await res.json()
      console.log(data)
    }
  }
  const handleLogout = () => {
    fetch("/api/v1/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(res => {
        if (res.ok) {
          window.location.href = "/auth/login"
        }
      })
      .catch(error => {
        console.error("Error logging out:", error)
      })
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <button onClick={handleProfile}>Get Profile</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
