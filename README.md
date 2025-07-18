# MongoDB + React Demo

This project demonstrates how to set up and use MongoDB with a React application. It includes a full-stack setup with a React frontend and Express backend API.

## Features

- ✅ MongoDB database setup
- ✅ Express.js backend API
- ✅ React frontend with Tailwind CSS
- ✅ User management (Create, Read, Delete)
- ✅ Modern UI with responsive design
- ✅ Error handling and loading states

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (installed and running)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Linux/macOS
sudo systemctl start mongod

# Or start manually
mongod --dbpath /data/db
```

### 3. Start the Application

You have two options:

#### Option A: Run both frontend and backend together
```bash
npm run dev:full
```

#### Option B: Run them separately

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- API Health Check: http://localhost:3001/api/health

## Project Structure

```
├── src/
│   ├── components/
│   │   └── UserManager.jsx    # Main user management component
│   ├── db/
│   │   ├── config.js          # MongoDB connection configuration
│   │   └── services.js        # Database service functions
│   └── App.jsx               # Main React component
├── server.js                 # Express backend server
├── package.json
└── README.md
```

## API Endpoints

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `DELETE /api/users/:id` - Delete a user
- `PUT /api/users/:id` - Update a user
- `GET /api/health` - Health check

## Database Configuration

The application uses the following default settings:
- MongoDB URI: `mongodb://localhost:27017`
- Database Name: `myproject`
- Collection: `users`

You can customize these by setting environment variables:
- `MONGODB_URI` - MongoDB connection string
- `DB_NAME` - Database name
- `PORT` - Backend server port (default: 3001)

## Usage

1. Open the application in your browser
2. Use the form to add new users
3. View the list of all users
4. Delete users using the delete button
5. All changes are persisted in MongoDB

## Troubleshooting

### MongoDB Connection Issues

If you're having trouble connecting to MongoDB:

1. Make sure MongoDB is running:
   ```bash
   sudo systemctl status mongod
   ```

2. Check if MongoDB is listening on the default port:
   ```bash
   netstat -tlnp | grep 27017
   ```

3. Try connecting manually:
   ```bash
   mongosh
   ```

### Port Conflicts

If you get port conflicts:

1. Change the backend port in `server.js`:
   ```javascript
   const PORT = process.env.PORT || 3002;
   ```

2. Update the API URL in `UserManager.jsx`:
   ```javascript
   const API_BASE_URL = 'http://localhost:3002/api';
   ```

## Development

### Adding New Collections

To add new collections, update the `server.js` file with new routes:

```javascript
app.get('/api/your-collection', async (req, res) => {
  try {
    const collection = db.collection('your-collection');
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=myproject
PORT=3001
```

## License

This project is open source and available under the MIT License.
