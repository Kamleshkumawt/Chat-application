# Chat Application Backend

## Project Description
This is the backend service for the Chat Application. It handles user authentication, message routing, and other server-side functionalities.

## Features
- User authentication and authorization.
- Real-time messaging using WebSockets.
- Scalable architecture for handling multiple users.
- RESTful APIs for managing user data and messages.
- Group chat functionality with project-based grouping.
- Redis integration for session management and token blacklisting.
- MongoDB for database storage.
- Socket.IO for real-time communication.
- Validation using `express-validator`.
- Secure password hashing with bcrypt.
- JWT-based authentication.
- Modular service and controller architecture.

## File Structure
```
Backend/
├── controllers/         # Contains logic for handling requests
│   ├── message.controller.js
│   ├── project.controller.js
│   └── user.controller.js
├── db/                  # Database connection setup
│   └── db.js
├── middlewares/         # Middleware for authentication and validation
│   └── user.middleware.js
├── models/              # Mongoose models for MongoDB collections
│   ├── message.model.js
│   ├── project.model.js
│   └── user.model.js
├── routes/              # API route definitions
│   ├── message.routes.js
│   ├── project.routes.js
│   └── user.routes.js
├── services/            # Business logic and reusable services
│   ├── message.service.js
│   ├── project.service.js
│   ├── redis.service.js
│   └── user.service.js
├── .env                 # Environment variables
├── .gitignore           # Files and directories to ignore in Git
├── app.js               # Express app setup
├── package.json         # Project metadata and dependencies
├── server.js            # Entry point for the backend server
└── README.md            # Documentation for the backend

```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Kamleshkumawt/Chat-application.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the development server:
   ```bash
   npm run dev
   ```
2. The backend will be available at `http://localhost:3000`.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Submit a pull request.
