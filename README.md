# Git CRM - GitHub Repository Management

<img src="image.png">

## Project Overview

Git CRM is a web application for managing and monitoring GitHub repositories. It allows users to register, add GitHub projects, and track their statistics (stars, forks, issues).

## Tech Stack

### Backend (apps/server)

- **Framework**: NestJS 11
- **API**: tRPC for type-safe client-server interaction
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + cookie-parser
- **Testing**: Jest

### Frontend (apps/web)

- **Framework**: Next.js 15 with App Router
- **State Management**: React Query, tRPC client
- **UI Framework**: Mantine UI 7
- **Styling**: TailwindCSS 4
- **Form Management**: Mantine Form with Zod validation

## Application Architecture

The project is built as a monorepo with two main packages:

### Server (apps/server)

- **Structure**:
  - `/src/auth` - User authentication
  - `/src/user` - User management
  - `/src/project` - GitHub project logic
  - `/src/trpc` - tRPC router and context setup
  - `/src/prisma` - Prisma ORM service
  - `/prisma` - Database schema

### Web (apps/web)

- **Structure**:
  - `/src/app` - Next.js routing
  - `/src/features` - Business logic
  - `/src/entities` - Data models
  - `/src/shared` - Reusable components and utilities
  - `/src/widgets` - Composite components

## Running the Project

### Server Setup

```bash
cd apps/server
npm install
# Create .env file and add DATABASE_URL
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

### Client Setup

```bash
cd apps/web
npm install
npm run dev
```

## Docker Deployment

You can also run the entire application using Docker Compose:

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down
```

### Environment Variables

#### Server (.env file in apps/server)

```
# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/ghcrm

# Server Configuration
PORT=4000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5000
```

#### Web (.env file in apps/web)

```
NEXT_PUBLIC_NESTJS_SERVER=http://localhost:4000
PORT=5000
```

## Key Features

- User authentication
- GitHub repository integration via GitHub API
- Repository statistics tracking
- Type-safe interaction through tRPC

## Database

The project uses two main models:

- `User` - user information
- `Project` - GitHub project information

## API

The API is built using tRPC, ensuring full type safety between client and server:

- `auth.login` - User authentication
- `auth.register` - New user registration
- `project.getAll` - Get all user projects
- `project.add` - Add a new project

## Testing

To run server tests:

```bash
cd apps/server
npm run test
```
