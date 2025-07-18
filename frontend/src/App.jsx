import { useState, useEffect } from 'react'
import './App.css'
import UserSelector from './components/UserSelector'
import ClaimButton from './components/ClaimButton'
import Leaderboard from './components/Leaderboard'
import AddUserForm from './components/AddUserForm'
import { io } from 'socket.io-client'

const API_BASE_URL = 'http://localhost:5000/api'

function App() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    // Initialize Socket.IO connection
    const newSocket = io('http://localhost:5000')
    setSocket(newSocket)

    // Listen for real-time leaderboard updates
    newSocket.on('leaderboardUpdate', (data) => {
      setUsers(data.updatedLeaderboard)
      setMessage(`${data.updatedUser.name} claimed ${data.pointsAwarded} points!`)
      setTimeout(() => setMessage(''), 3000)
    })

    return () => newSocket.close()
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`)
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      setMessage('Error fetching users')
    }
  }

  const handleClaimPoints = async () => {
    if (!selectedUser) {
      setMessage('Please select a user first')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedUser._id }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setUsers(data.updatedLeaderboard)
        setMessage(`${selectedUser.name} claimed ${data.pointsAwarded} points!`)
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(data.message || 'Error claiming points')
      }
    } catch (error) {
      console.error('Error claiming points:', error)
      setMessage('Error claiming points')
    } finally {
      setLoading(false)
    }
  }

  const handleUserAdded = (newUser) => {
    setUsers(prev => [...prev, { ...newUser, rank: prev.length + 1 }])
    setMessage(`User ${newUser.name} added successfully!`)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Points System</h1>
        {message && <div className="message">{message}</div>}
      </header>

      <main className="app-main">
        <div className="user-section">
          <UserSelector 
            users={users} 
            selectedUser={selectedUser} 
            onUserSelect={setSelectedUser} 
          />
          <ClaimButton 
            onClaim={handleClaimPoints} 
            loading={loading} 
            disabled={!selectedUser}
          />
        </div>

        <AddUserForm onUserAdded={handleUserAdded} />

        <Leaderboard users={users} />
      </main>
    </div>
  )
}

export default App
