# Points System

A full-stack application for managing user points with real-time leaderboard updates. Built with Node.js backend and React frontend.

## Features

### Backend (Node.js + Express + MongoDB)
- **User Management**: CRUD operations for users
- **Points System**: Random point claiming (1-10 points)
- **Real-time Updates**: Socket.IO integration for live leaderboard
- **History Tracking**: Complete claim history in database
- **RESTful API**: Clean API endpoints for all operations

### Frontend (React)
- **User Selection**: Dropdown to select users
- **Add Users**: Form to add new users
- **Claim Points**: Button to claim random points
- **Real-time Leaderboard**: Live updates via Socket.IO
- **Modern UI**: Beautiful responsive design

## Project Structure

```
├── backend/           # Node.js backend
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── server.js     # Main server file
│   └── package.json
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main app component
│   │   └── App.css      # Styles
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/points-system
   NODE_ENV=development
   ```

4. Start MongoDB server

5. Run the backend:
   ```bash
   npm run dev
   ```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Users
- `GET /api/users` - Get all users with rankings
- `POST /api/users` - Add a new user

### Claim Points
- `POST /api/claim` - Claim random points for a user

### History
- `GET /api/history` - Get claim history (optional user filter)

## Database Collections

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  totalPoints: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### ClaimHistory Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  points: Number,
  claimedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Default Users

The system automatically creates 10 default users:
- Rahul, Kamal, Sanak, Priya, Amit
- Neha, Raj, Sita, Vikram, Anjali

## Real-time Features

- **Socket.IO Integration**: Real-time leaderboard updates
- **Live Rankings**: Automatic rank calculation and updates
- **Instant Feedback**: Immediate UI updates when points are claimed

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- CORS

### Frontend
- React
- Vite
- Socket.IO Client
- Modern CSS with gradients and animations

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite development server
```

## Production Deployment

### Backend
1. Set environment variables for production
2. Use PM2 or similar process manager
3. Configure MongoDB connection for production

### Frontend
1. Build the project: `npm run build`
2. Serve static files with nginx or similar
3. Configure API endpoints for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
