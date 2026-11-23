# twitter-backend

A Twitter-like backend API built with Node.js, Express 5, and MongoDB (Mongoose).

## Tech
- Node.js, Express 5
- MongoDB with Mongoose — models for users, tweets, comments, likes, and hashtags
- JWT authentication with Passport (`passport-jwt`), password hashing with bcrypt
- File uploads with Multer and Multer-S3 (AWS S3)
- Layered structure: routes, controllers, services, repositories, models

## API endpoints
Base path: `/api/v1` (mounted at `/api` in `src/index.js`).

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/v1/signup` | No | Create a user account |
| POST | `/api/v1/login` | No | Log in and get a JWT |
| POST | `/api/v1/tweets` | Yes | Create a tweet |
| POST | `/api/v1/comments` | Yes | Create a comment |
| POST | `/api/v1/likes/toggle` | Yes | Toggle a like |

## How to run
```bash
npm install
cp .env.example .env   # set MongoDB URI, JWT secret, and AWS/S3 settings used in src/config
npm start              # nodemon src/index.js, port 3000
```

## Structure
```
src/
  config/      # database (MongoDB), JWT middleware, S3 file-upload config
  controllers/ # auth, tweet, comment, like
  middleware/  # JWT authentication
  models/      # user, tweet, comment, like, hashtags
  repository/  # CRUD and per-model repositories
  routes/      # /api/v1 routes
  services/    # user, tweet, comment, like
  index.js     # Express app, port 3000
```

## License
MIT
