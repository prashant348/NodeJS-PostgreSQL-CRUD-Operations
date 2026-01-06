# Node.js + PostgreSQL (TypeScript) — Example Project

A minimal Express + PostgreSQL integration using TypeScript. Includes CRUD APIs for a simple `users` table.

## Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL (and optional pgAdmin)
- Windows terminal / PowerShell

## Database: create `users` table
Run this in pgAdmin or psql:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE
);
```

## Quick setup
Open a terminal in your desired folder (example uses the repo root):

1. Create project folder (if needed)
```bash
mkdir nodejs-integration
cd nodejs-integration
```

2. Init & install
```bash
npm init -y
npm i express pg dotenv
npm i -D tsx typescript @types/node @types/express @types/pg
npx tsc --init
```

3. Recommended folder structure
```
nodejs-integration/
├─ src/
│  ├─ db/
│  │  └─ connection.ts   # postgres pool + connect logic
│  ├─ routes/
│  │  └─ users.ts        # CRUD route handlers
│  └─ index.ts           # express app + middleware
├─ .env
├─ package.json
└─ tsconfig.json
```

## .env (sample)
```
PORT=3000
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
```
Replace DB_PASSWORD with your PostgreSQL password.

## package.json scripts
Add:
```json
"scripts": {
  "dev": "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

## Run
```bash
npm run dev
```
Expected logs:
```
db connected successfully!
Server running on http://localhost:3000
```

## API Endpoints
Base: http://localhost:3000/api/users

- GET all users
  ```
  GET /api/users
  ```

- GET single user
  ```
  GET /api/users/:id
  ```

- Create user
  ```
  POST /api/users
  Content-Type: application/json
  Body: { "name": "Test User", "email": "test@example.com" }
  ```

- Update user
  ```
  PUT /api/users/:id
  Content-Type: application/json
  Body: { "name": "New Name", "email": "new@example.com" }
  ```

- Delete user
  ```
  DELETE /api/users/:id
  ```

## Notes & tips
- Ensure PostgreSQL server is running and credentials in .env match.
- Use pgAdmin or psql to verify table and rows.
- For production, add migrations, input validation, and error handling middleware.
