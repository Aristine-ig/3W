# Points System Frontend

A React-based frontend for the points claiming system with real-time leaderboard updates.

## Features

- **User Selection**: Dropdown to select from existing users
- **Add New Users**: Form to add new users to the system
- **Claim Points**: Button to claim random points (1-10) for selected user
- **Real-time Leaderboard**: Live updates via Socket.IO
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure the backend server is running on `http://localhost:5000`

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## Components

- **App.jsx**: Main application component with state management
- **UserSelector.jsx**: Dropdown for selecting users
- **ClaimButton.jsx**: Button to claim points
- **Leaderboard.jsx**: Display users ranked by points
- **AddUserForm.jsx**: Form to add new users

## Features

### User Management
- View all users with their current points
- Add new users through the form
- Select users from dropdown

### Points System
- Claim random points (1-10) for selected user
- Real-time updates via Socket.IO
- Visual feedback for claimed points

### Leaderboard
- Dynamic ranking based on total points
- Medal icons for top 3 positions
- Real-time updates when points are claimed

## API Integration

The frontend connects to the backend API endpoints:
- `GET /api/users` - Fetch all users
- `POST /api/users` - Add new user
- `POST /api/claim` - Claim points for user

## Socket.IO Events

- Listens for `leaderboardUpdate` events for real-time updates
