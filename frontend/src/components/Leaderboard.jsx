import React from 'react'

const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <div className="rank">Rank</div>
          <div className="name">Name</div>
          <div className="points">Points</div>
        </div>
        {users.map((user, index) => (
          <div key={user._id} className="leaderboard-row">
            <div className="rank">
              {user.rank === 1 && '🥇'}
              {user.rank === 2 && '🥈'}
              {user.rank === 3 && '🥉'}
              {user.rank > 3 && user.rank}
            </div>
            <div className="name">{user.name}</div>
            <div className="points">{user.totalPoints}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard