# Fitness Chatbot - Developer Guide

## Overview
This is a full-stack fitness chatbot application with a React frontend and Node.js/Express backend using Prisma ORM and PostgreSQL.

## Tech Stack
- **Frontend**: React + Vite, CSS Modules
- **Backend**: Node.js + Express, Prisma ORM
- **Database**: PostgreSQL (Docker)
- **Authentication**: JWT

## Quick Start

### 1. Start Database
```bash
docker compose up -d
```

### 2. Setup Backend
```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev
```
API will run on `http://localhost:4000`

### 3. Setup Frontend
```bash
npm install
npm run dev
```
Frontend will run on `http://localhost:5174`

### 4. Access Adminer
Open `http://localhost:8080` to view database
- System: PostgreSQL
- Server: db
- Username: postgres
- Password: password
- Database: fitnessdb

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/fitnessdb?schema=public"
JWT_SECRET="your_secure_jwt_secret_here"
PORT=4000
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:4000
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Protected Routes (require JWT token)
- `GET /nutrition` - Get all nutrition items
- `GET /workouts` - Get all workouts
- `GET/POST /profiles` - User profile management
- `GET/POST /weekly-plans` - Weekly plan management
- `GET/POST /progress` - Progress tracking
- `GET/POST /checklist` - Daily checklist

## Database Schema

The application uses the following main entities:
- **User**: Authentication and basic info
- **Profile**: Detailed user fitness profile
- **Nutrition**: Food items with nutritional info
- **Workout**: Exercise definitions
- **WeeklyPlan**: User's workout/nutrition plans
- **ProgressEntry**: Weight and progress tracking
- **ChecklistItem**: Daily task completion

## Development Commands

### Backend
```bash
cd server
npm run dev          # Start development server
npm run prisma:migrate  # Run database migrations
npm run prisma:seed    # Seed database with sample data
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Testing

### API Testing
```bash
# Test nutrition endpoint
curl http://localhost:4000/nutrition

# Test workouts endpoint
curl http://localhost:4000/workouts

# Register a test user
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password","name":"Test User"}'

# Login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### Frontend Testing
1. Open `http://localhost:5174`
2. Navigate to nutrition and workout pages
3. Verify data loads from API
4. Test weekly plan generation
5. Check responsive design on different screen sizes

## Project Structure

```
/
├── docker-compose.yml          # Database setup
├── server/                     # Backend
│   ├── index.js               # Express server
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.js           # Sample data
│   └── .env                   # Environment variables
├── src/                        # Frontend
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   └── ...               # Feature components
│   ├── styles/               # CSS files
│   ├── utils/                # Utilities (API wrapper)
│   └── ...
├── .env                        # Frontend env vars
└── README-DEVELOPER.md         # This file
```

## Deployment Notes

1. **Database**: Use a production PostgreSQL instance
2. **JWT Secret**: Generate a secure random secret for production
3. **Environment Variables**: Set appropriate values for production
4. **CORS**: Configure CORS settings for production domain
5. **HTTPS**: Enable HTTPS in production
6. **Database Migrations**: Run migrations before deploying

## Troubleshooting

### Database Connection Issues
- Ensure Docker containers are running: `docker ps`
- Check database logs: `docker logs fitness-db`
- Verify DATABASE_URL in server/.env

### API Connection Issues
- Check if backend is running on port 4000
- Verify VITE_API_BASE_URL in frontend .env
- Check browser network tab for failed requests

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check for syntax errors in modified files