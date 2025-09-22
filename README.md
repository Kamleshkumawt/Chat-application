# Chat Application

A full-stack real-time chat application built with React, Vite, Node.js, Express, MongoDB, Socket.IO, and Redis. This project supports private messaging, group chats, online status, authentication, and more.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Assets](#assets)

---

## Project Overview

This chat application enables users to communicate in real-time, either privately or in groups. It features secure authentication, online status tracking, and a modern, responsive UI.

---

## Features

### Backend

- **User Authentication & Authorization**: Register, login, logout, JWT-based sessions.
- **Real-time Messaging**: Instant message delivery using Socket.IO.
- **Group Chat**: Create and manage group chats (projects).
- **Online Status**: Track and broadcast online users.
- **RESTful APIs**: CRUD operations for users, messages, and groups.
- **Redis Integration**: Session management and token blacklisting.
- **MongoDB Storage**: Persistent storage for users, messages, and groups.
- **Validation**: Input validation using `express-validator`.
- **Secure Passwords**: Password hashing with bcrypt.

### Frontend

- **Modern UI**: Built with React, TailwindCSS, DaisyUI.
- **State Management**: Redux Toolkit for global state.
- **Real-time Updates**: Socket.IO client for instant messaging and online status.
- **Authentication Flows**: Login, registration, protected routes.
- **Group & Private Chat**: Switch between private and group conversations.
- **Search**: Find users and groups.
- **Responsive Design**: Works on desktop and mobile.

---

## Architecture

- **Frontend**: React SPA using Vite for fast development. Communicates with backend via REST and Socket.IO.
- **Backend**: Express server with REST APIs and Socket.IO for real-time events. Uses MongoDB for data and Redis for session/token management.
- **Socket.IO**: Enables real-time communication between clients and server.
- **Redis**: Used for token blacklisting and session management.

---

## Technologies Used

- **Frontend**: React, Vite, Redux Toolkit, TailwindCSS, DaisyUI, Axios, Socket.IO Client
- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.IO, Redis, bcrypt, JWT, express-validator

---

## File Structure

```
chatAplication/
├── Backend/
│   ├── controllers/         # Request handlers
│   ├── db/                  # Database connection
│   ├── middlewares/         # Auth & validation
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   ├── services/            # Business logic
│   ├── .env                 # Environment variables
│   ├── app.js               # Express app setup
│   ├── server.js            # Server entry point
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── auth/            # Auth components
│   │   ├── config/          # Axios/socket config
│   │   ├── context/         # React context
│   │   ├── redux/           # Redux slices/store
│   │   ├── routes/          # App routes
│   │   ├── screens/         # UI screens/components
│   │   ├── statemange/      # Custom hooks
│   │   ├── App.jsx          # Main app
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md                # Project documentation
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Kamleshkumawt/Chat-application.git
cd chatAplication
```

### 2. Backend Setup

```bash
cd Backend
npm install
# Create a .env file with MongoDB, Redis, JWT_SECRET, etc.
npm run dev
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
npm run dev
```

---

## Usage

- **Backend** runs at `http://localhost:3000`
- **Frontend** runs at `http://localhost:5173`
- Register a new user, login, and start chatting!

---

## API Endpoints

### User

- `POST /users/register` - Register a new user
- `POST /users/login` - Login
- `GET /users/profile` - Get profile (auth required)
- `GET /users/logout` - Logout (auth required)
- `GET /users/all-users` - List all users (auth required)

### Message

- `GET /messages/:id` - Get messages with user/group (auth required)
- `POST /messages/send/:id` - Send message to user/group (auth required)

### Project (Group Chat)

- `POST /projects/create` - Create group (auth required)
- `GET /projects/get-all` - List groups (auth required)
- `PUT /projects/add-user` - Add users to group (auth required)
- `GET /projects/get-project/:projectId` - Get group details (auth required)

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Author

Developed by [Kamlesh Kumawat](https://github.com/Kamleshkumawt)

---

## Assets

All static images and icons used in the application are stored in the `assets` folder. You can use these images for user avatars, group icons, backgrounds, and other UI elements.

### How to Use Images

#### Frontend (React)

To use an image from the assets folder in your React components:

```jsx
import avatarImg from '../assets/LoginPage.png'; // adjust path as needed

<img src={avatarImg} alt="Avatar" />
```

Or, if using public assets (e.g., in `public/assets`):

```jsx
<img src="/assets/User-profile.png" alt="userProfile" />
```

#### Backend

For serving static images from the backend, ensure you set up static middleware in Express:

```js
app.use('/assets', express.static(path.join(__dirname, 'assets')));
```

Then you can reference images via URLs like `http://localhost:3000/assets/avatar.png`.

### List of Images

Below are all images currently available in the `assets` folder:

```
assets/
├── avatar.png
├── group-icon.png
├── background.jpg
├── logo.svg
```

> **Note:** Add or update images in the `assets` folder as needed. Make sure to use descriptive filenames.
