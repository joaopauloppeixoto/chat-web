# ChatWeb: Full-Stack Real-Time Messaging System

*ChatWeb* is a modern communication platform built with a decoupled architecture, focusing on high performance, scalability, and security. It leverages .NET 9 for a robust business logic engine and Next.js for a high-performance, accessible user interface.

## Architecture & Technologies

![Project Architecture](/ChatWeb.Doc/Architecture.png)

### Backend (C#)

- **Framework**: .NET 9 (Web API).
- **Design Patterns**: Domain-Driven Design (DDD), Clean Architecture, and Repository Pattern.
- **Database**: MySQL 8.0 managed via Entity Framework Core.
- **Security**: JWT Authentication with custom Middleware for Global Exception Handling.
- **Containerization**: Docker & Docker Compose.

### Frontend (ReactJS)

- **Framework**: ReactJS 19.
- **Styling**: Tailwind CSS.
- **UI Components**: shadcn/ui (Built on Radix UI primitives for maximum accessibility).
- **BFF Pattern**: Server Actions for secure API orchestration and data transformation.

### Infrastructure (DevOps)

The project is fully containerized to ensure environment consistency.

- **Orchestration**: Docker Compose manages the API and MySQL containers.
- **Networking**: Internal bridge network for secure communication between the API and the Database.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Prerequisites

- Docker Desktop installed.
- .NET 9 SDK installed (for running migrations).

### 2. Spin up the Containers

From the root directory of the project, run:

```Bash
docker-compose up -d
```

This will start the MySQL Database and the C# API.

### 3. Database Migrations

Once the database container is healthy and running, you need to apply the Entity Framework migrations to create the schema. Run the following command from the backend root folder:

```Bash
dotnet ef database update --project .\ChatWeb.API\ -- "Server=localhost;Port=3306;Database=ChatWebDB;User=root;Password=ChatWeb.2026;AllowPublicKeyRetrieval=True;SslMode=None"
```

### 4. Run the Frontend

Navigate to the frontend folder and start the development server:

```Bash
npm install
npm run dev
```

The application will be available at http://localhost:3000.

## Security Note

This project uses hardcoded credentials for demonstration purposes in the docker-compose.yml. In a production environment, these would be managed via Docker Secrets or Environment Variables stored in a secure vault (e.g., Azure Key Vault or AWS Secrets Manager).

## License

This project is for portfolio purposes. Feel free to explore the code.
