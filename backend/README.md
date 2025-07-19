# Backend API for Real-Time Leaderboard

This directory contains the backend server for the real-time leaderboard application. It is built with Node.js, Express, and MongoDB, and it uses Socket.IO for real-time communication with the frontend.

## Features

- **User Management**: Add new users and retrieve a list of all users with their rankings.
- **Point-Based Leaderboard**: Users can claim random points, and their total scores are updated in real time.
- **Claim History**: Track when users claim points.
- **Real-Time Updates**: The leaderboard is updated instantly across all connected clients using WebSockets.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)
- A running [MongoDB](https://www.mongodb.com/) instance (either local or on a cloud service like MongoDB Atlas)

## Getting Started

### 1. Installation

Clone the repository and navigate to the `backend` directory. Then, install the required dependencies:

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend` directory. This file will store your environment variables.

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

- `MONGODB_URI`: Your MongoDB connection string.
- `PORT`: The port on which the server will run (defaults to 5000).

### 3. Running the Server

You can run the server in development mode, which automatically restarts on file changes, or in production mode.

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

The server will connect to MongoDB and start listening on the specified port.

## API Endpoints

The server exposes the following RESTful API endpoints:

### Users

- `GET /api/users`
  - **Description**: Retrieves a list of all users, sorted by their total points in descending order. Each user object includes their rank.
  - **Response**: `200 OK` with an array of user objects.

- `POST /api/users`
  - **Description**: Creates a new user.
  - **Request Body**: `{ "name": "string" }`
  - **Response**: `201 Created` with the newly created user object.

### Claiming Points

- `POST /api/claim`
  - **Description**: Allows a user to claim a random number of points (between 1 and 10). This endpoint also triggers a real-time update to all connected clients.
  - **Request Body**: `{ "userId": "string" }`
  - **Response**: `200 OK` with the number of points awarded and the user's updated data.

### History

- `GET /api/history`
  - **Description**: Retrieves the entire claim history for all users.
  - **Query Parameters**:
    - `userId` (optional): Filter the history for a specific user.
  - **Response**: `200 OK` with an array of claim history records.

## Real-Time Events (Socket.IO)

The server uses Socket.IO to push real-time updates to connected clients.

- **Event**: `leaderboardUpdate`
  - **Description**: Emitted whenever a user claims points.
  - **Payload**: An object containing the updated leaderboard, the user who claimed points, and the number of points awarded.

## Project Structure

- `models/`: Contains the Mongoose schemas for `User` and `ClaimHistory`.
- `routes/`: Defines the API routes for users, claims, and history.
- `server.js`: The main entry point for the application, where the server, database connection, and Socket.IO are initialized.
- `.env`: Stores environment variables (must be created manually).
- `package.json`: Lists project dependencies and scripts.
