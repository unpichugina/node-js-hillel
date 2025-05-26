# Hotel Booking App

This project contains:
- **Frontend** with React (`frontend/`)
- **Backend** with Node.js + Express (`backend/`)
- JWT authentication
- Guest, room, and booking management
- Role-based access (`user` / `admin`)

---

## Quick Start

> Requires **Node.js 18+**  
> (Node 23+ may cause issues with `mysql2`)

### 1. Clone the repository
```bash
git clone ...
cd homework_25
```

### 2. Install dependencies
```bash
cd frontend && npm install
cd ../backend && npm install
```

### 3. Start MySQL (via Docker or manually)

> With Docker:
```bash
docker-compose up -d
```

Or create the `hotel_booking` database manually and apply `dump.sql`

---

## Run frontend + backend simultaneously

In the root directory:
```bash
npm install   # installs concurrently
npm run dev
```

- React: http://localhost:3001
- API: http://localhost:3000

---

## Project Structure

```
homework_25/
├── frontend/          # React SPA
├── backend/           # Node.js + Express API
├── package.json       # shared scripts (npm run dev)
└── docker-compose.yml # optional
```

---

## Authentication

- `/auth/register` — register
- `/auth/login` — login, returns `accessToken`
- Private routes are protected by middleware

### Roles:
- `user`: can create/view their bookings
- `admin`: can see all bookings, income summary

---

## 🔗 API Endpoints

| Method | Route                | Role    | Description                |
|--------|----------------------|---------|----------------------------|
| GET    | `/rooms/available`   | user    | check available rooms      |
| POST   | `/bookings`          | user    | create a booking           |
| GET    | `/reviews`           | user    | all	get all reviews        |
| POST   | `/reviews`           | user    | add a new review (with JWT)|
| GET    | `/bookings/my`       | user    | view my bookings           |
| GET    | `/income`            | admin   | view total income          |

---

## `.env` example (for `backend/`)

```
MYSQL_HOST=localhost
MYSQL_USER=hotel_user
MYSQL_PASSWORD=hotel_password
MYSQL_DATABASE=hotel_booking

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

---

## Useful Scripts

| Command                | Description                   |
|------------------------|-------------------------------|
| `npm start` (frontend) | Starts React app              |
| `npm start` (backend)  | Starts Node.js API            |

---
