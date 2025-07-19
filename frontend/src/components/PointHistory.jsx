import React, { useState, useEffect } from 'react'
import './PointHistory.css'

const PointHistory = ({ selectedUser, allUsers }) => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all') // 'all', 'specific_user'

  // Load history from localStorage or API
  useEffect(() => {
    loadPointHistory()
  }, [selectedUser, filter])

  const loadPointHistory = async () => {
    setLoading(true)
    try {
      // For now, load from localStorage (mock backend)
      const storedHistory = localStorage.getItem('pointHistory')
      let historyData = storedHistory ? JSON.parse(storedHistory) : []
      
      // Filter history based on selection
      if (filter === 'specific_user' && selectedUser) {
        historyData = historyData.filter(entry => entry.userId === selectedUser._id)
      }
      
      // Sort by timestamp (most recent first)
      historyData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      
      setHistory(historyData)
    } catch (error) {
      console.error('Error loading point history:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getUserName = (userId) => {
    const user = allUsers.find(u => u._id === userId)
    return user ? user.name : 'Unknown User'
  }

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all point history?')) {
      localStorage.removeItem('pointHistory')
      setHistory([])
    }
  }

  return (
    <div className="point-history">
      <div className="history-header">
        <h2>Point History</h2>
        <div className="history-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="history-filter"
          >
            <option value="all">All Users</option>
            <option value="specific_user" disabled={!selectedUser}>
              {selectedUser ? `${selectedUser.name} Only` : 'Select a user first'}
            </option>
          </select>
          <button 
            onClick={clearHistory}
            className="clear-history-btn"
            disabled={history.length === 0}
          >
            Clear History
          </button>
        </div>
      </div>

      <div className="history-content">
        {loading ? (
          <div className="loading">Loading history...</div>
        ) : history.length === 0 ? (
          <div className="empty-history">
            <p>No point history available.</p>
            <p>Points will be tracked when users claim them.</p>
          </div>
        ) : (
          <div className="history-table">
            <div className="history-table-header">
              <div className="col-user">User</div>
              <div className="col-points">Points</div>
              <div className="col-date">Date & Time</div>
              <div className="col-total">Total After</div>
            </div>
            <div className="history-table-body">
              {history.map((entry, index) => (
                <div key={entry.id || index} className="history-row">
                  <div className="col-user">
                    <div className="user-info">
                      <span className="user-name">{getUserName(entry.userId)}</span>
                      <span className="user-id">ID: {entry.userId}</span>
                    </div>
                  </div>
                  <div className="col-points">
                    <span className="points-earned">+{entry.pointsAwarded}</span>
                  </div>
                  <div className="col-date">
                    {formatDate(entry.timestamp)}
                  </div>
                  <div className="col-total">
                    {entry.totalPointsAfter}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="history-stats">
        <div className="stat-item">
          <span className="stat-label">Total Entries:</span>
          <span className="stat-value">{history.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Points Distributed:</span>
          <span className="stat-value">
            {history.reduce((sum, entry) => sum + entry.pointsAwarded, 0)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PointHistory
