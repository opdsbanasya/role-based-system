# Role Based System
A role-based access control system built using **Node.js**, **Express**, **MongoDB**, and **React**. This project implements secure user authentication and dynamic authorization based on user roles `admin`, `student`.

---

## Features
- User authentication (Login/Signup)
- Role-based access control
- Admin & user management
- Protected routes based on roles
- RESTful API backend

---

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Frontend**: React.js
- **Authentication**: JWT (JSON Web Token)
- **Tools**: Nodemon, Dotenv

## APIs
- **POST** `/signup` - Register a new user
- **POST** `/login` - Login an existing user
- **POST** `/logout` - Logout the current user
- **PATCH** `/update/password` - Update user password
- **POST** `/user/create` - Create a new user (Admin only)
- **PATCH** `/user/update` - Update user details (Admin only)
- **DELETE** `/user/delete` - Delete a user (Admin only)
- **GET** `/user/getlist` - List all users (Admin only)

## Default Admin Credentials
- Email: `super.admin@gmail.com`
- Password: `Super@123`
