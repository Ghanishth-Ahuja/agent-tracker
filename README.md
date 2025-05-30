# Agent Tracker Web App

## Overview

Agent Tracker is a MERN stack web application where admins manage agents/users and assign tasks. Admins can create users and upload CSV files to assign tasks, while users sign in to see their assigned tasks.

---

## Features

- Admin login and authentication
- Add agents/users manually
- Upload CSV to assign tasks to users
- User login and view assigned tasks

---

## Tech Stack

- React.js (Frontend)
- Node.js & Express.js (Backend)
- MongoDB (Database)
- JWT for authentication
- `fast-csv` for CSV parsing

---

## Setup & Run

Clone the repo:

```bash
git clone https://github.com/Ghanishth-Ahuja/agent-tracker.git
cd agent-tracker
```

Install backend dependencies and frontend dependencies:

```bash
cd backend && npm install
cd ../frontend && npm install
```

Create `.env` in the `backend` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start backend (in one terminal):

```bash
cd backend
npm run dev
```

Start frontend (in another terminal):

```bash
cd frontend
npm start
```

---

## Usage

- Admin logs in, adds users or uploads CSV with tasks assigned to users by email.
- Users log in to see their assigned tasks.

---

## CSV Format

| userEmail         | taskTitle      | taskDescription | dueDate    |
| ----------------- | -------------- | --------------- | ---------- |
| user@example.com  | Call client A  | Follow-up call  | 2025-06-05 |
| user2@example.com | Prepare report | Monthly report  | 2025-06-10 |

Emails must match existing users to assign tasks properly.

---

## Folder Structure

```
agent-tracker/
├── backend/
├── frontend/
├── README.md
```

---

## License

MIT License
