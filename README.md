# Agent Tracker Web App

## Overview

Agent Tracker is a MERN stack web application that allows admins to manage agents/users and assign tasks efficiently. Admins can create users, upload tasks via CSV files, and users can sign in to view their assigned tasks.

---

## Features

- **Admin Panel**

  - Admin login and authentication
  - Add new agents/users manually
  - Upload CSV files to assign tasks to multiple users at once

- **User Panel**
  - User login and authentication
  - View tasks assigned to the logged-in user

---

## Technology Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **CSV Parsing:** ("fast-csv" used for control)

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB instance (local or cloud)
- npm or yarn

### Installation

1. Clone the repository: https://github.com/Ghanishth-Ahuja/agent-tracker
   cd agent-tracker

Install backend dependencies:

cd backend
npm install
Install frontend dependencies:

cd ../frontend
npm install
Configure environment variables:

Create a .env file in the backend folder with the following variables:

env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Run the development servers:

In one terminal, start the backend:

cd backend
npm run dev
In another terminal, start the frontend:

cd frontend
npm start

# Usage

Admin Workflow
Log in using admin credentials.

Add new users/agents manually or upload a CSV file with user/task details.

View all users and the tasks assigned to them.

User Workflow
Sign up or log in with user credentials.

View the dashboard to see tasks assigned specifically to the logged-in user.

CSV Format for Task Assignment
The CSV file should have the following columns:

userEmail taskTitle taskDescription dueDate
user@example.com Call client A Follow-up call 2025-06-05
user2@example.com Prepare report Monthly report 2025-06-10

userEmail should match an existing user.

Tasks will be assigned to the corresponding user based on their email.

Folder Structure

agent-tracker/
├── backend/  
├── frontend
├── README.md
