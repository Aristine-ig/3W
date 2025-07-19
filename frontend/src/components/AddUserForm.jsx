import React, { useState } from 'react'

const API_BASE_URL = 'http://localhost:5000/api'
// const API_BASE_URL = 'https://threew-frontend-ybsj.onrender.com/api'



const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError('Name is required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        onUserAdded(data)
        setName('')
      } else {
        setError(data.message || 'Error adding user')
      }
    } catch (error) {
      console.error('Error adding user:', error)
      setError('Error adding user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-user-form user-selector">
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            disabled={loading}
          />
          <button type="submit" disabled={loading || !name.trim()}>
            {loading ? 'Adding...' : 'Add User'}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default AddUserForm