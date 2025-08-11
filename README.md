# Project Management Tool

A simple project management tool with user authentication, project creation, and task tracking.

## Features

- **User Authentication**: Register and login with email and password (JWT-based, bcrypt for password hashing).
- **Projects**: Create, update, delete, and view projects (fields: title, description, status).
- **Tasks**: CRUD operations on tasks associated with projects (fields: title, description, status, due date).
- **Task Filtering**: Filter tasks by status.
- **Pagination & Search**: Paginated project list with search functionality.
- **Form Validation**: Client-side validation using React Hook Form and Yup.
- **State Management**: React Context for authentication state.
- **Seed Script**: Populates database with 1 user, 2 projects, and 6 tasks.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, TypeScript, Tailwind CSS
- **Libraries**: bcrypt, jsonwebtoken, axios, react-hook-form, yup, react-router-dom

## Setup Instructions

### Prerequisites

- Node.js (>= 22.x)
- MongoDB ( MongoDB Atlas)
- Git

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
