# Points System Backend

A Node.js backend for a points claiming system with real-time leaderboard updates.

## Features

- User management (add new users)
- Random points claiming (1-10 points)
- Real-time leaderboard updates via Socket.IO
- Claim history tracking
- MongoDB database integration

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/points-system
   NODE_ENV=development
   ```

3. Start MongoDB server

4. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Users
- `GET /api/users` - Get all users with rankings
- `POST /api/users` - Add a new user (body: `{ name: string }`)

### Claim Points
- `POST /api/claim` - Claim random points for a user (body: `{ userId: string }`)

### History
- `GET /api/history` - Get claim history (query: `?userId=string` for filtering)

## Socket.IO Events

- `leaderboardUpdate` - Emitted when points are claimed, includes updated leaderboard

## Default Users

The system automatically creates 10 default users:
- Rahul, Kamal, Sanak, Priya, Amit, Neha, Raj, Sita, Vikram, Anjali