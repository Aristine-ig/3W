import React, { useState, useRef, useEffect } from 'react'

const UserSelector = ({ users, selectedUser, onUserSelect }) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setOpen((prev) => !prev)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  // Handle option selection with keyboard
  const handleOptionKeyDown = (e, user) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      onUserSelect(user)
      setOpen(false)
    }
  }

  return (
    <div className="user-selector" ref={dropdownRef}>
      <h3>Select User</h3>
      <div
        className={`custom-dropdown${open ? ' open' : ''}`}
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        role="button"
      >
        <span className={`dropdown-selected${!selectedUser ? ' placeholder' : ''}`}>{selectedUser ? `${selectedUser.name} (${selectedUser.totalPoints} points)` : 'Choose a user...'}</span>
        <span className="dropdown-arrow" />
        {open && (
          <ul className="dropdown-list" role="listbox">
            {users.map(user => (
              <li
                key={user._id}
                className={`dropdown-option${selectedUser && selectedUser._id === user._id ? ' selected' : ''}`}
                onClick={(e) => { e.stopPropagation(); onUserSelect(user); setOpen(false) }}
                onKeyDown={(e) => handleOptionKeyDown(e, user)}
                role="option"
                aria-selected={selectedUser && selectedUser._id === user._id}
                tabIndex={0}
              >
                {user.name} ({user.totalPoints} points)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserSelector