import { useState, useEffect } from 'react';
import './App.css';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import AddUserForm from './components/AddUserForm';
import { io } from 'socket.io-client';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * The main application component.
 * This component manages the state of the application, including the list of users,
 * the selected user, loading state, and messages. It also handles real-time updates
 * from the backend using Socket.IO.
 */
function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    const newSocket = io(socketUrl);
    setSocket(newSocket);

    // Listen for real-time leaderboard updates
    newSocket.on('leaderboardUpdate', (data) => {
      setUsers(data.updatedLeaderboard);
      
      // Update selected user if it was affected by the points claim
      setSelectedUser(currentSelected => {
        if (currentSelected && data.updatedLeaderboard) {
          const updatedSelectedUser = data.updatedLeaderboard.find(user => user._id === currentSelected._id);
          return updatedSelectedUser || currentSelected;
        }
        return currentSelected;
      });
      
      setMessage(`${data.updatedUser.name} claimed ${data.pointsAwarded} points!`);
      setTimeout(() => setMessage(''), 3000);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * Fetches the list of users from the API.
   */
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.message === 'Failed to fetch') {
        setMessage('Cannot connect to server. Please make sure the backend is running on http://localhost:5000');
      } else {
        setMessage(`Error fetching users: ${error.message}`);
      }
    }
  };

  /**
   * Handles the claim points button click.
   */
  const handleClaimPoints = async () => {
    if (!selectedUser) {
      setMessage('Please select a user first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedUser._id }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.updatedLeaderboard);
        
        // Update the selected user with the new points total
        const updatedSelectedUser = data.updatedLeaderboard.find(user => user._id === selectedUser._id);
        if (updatedSelectedUser) {
          setSelectedUser(updatedSelectedUser);
        }
        
        setMessage(`🎉 ${selectedUser.name} claimed ${data.pointsAwarded} points! 🎉`);
        setTimeout(() => setMessage(''), 4000);
        
        // Add visual feedback
        const pointsElement = document.querySelector(`[data-user-id="${selectedUser._id}"] .points`);
        if (pointsElement) {
          pointsElement.classList.add('points-earned');
          setTimeout(() => pointsElement.classList.remove('points-earned'), 600);
        }
      } else {
        setMessage(data.message || 'Error claiming points');
      }
    } catch (error) {
      console.error('Error claiming points:', error);
      setMessage('Error claiming points');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the addition of a new user.
   * @param {object} newUser - The new user object.
   */
  const handleUserAdded = (newUser) => {
    setUsers(prev => [...prev, { ...newUser, rank: prev.length + 1 }]);
    setMessage(`User ${newUser.name} added successfully!`);
    setTimeout(() => setMessage(''), 3000);
  };

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
  );
}

export default App;
