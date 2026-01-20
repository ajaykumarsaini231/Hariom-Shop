
# 🚀 [Project Name] – Full-Stack Web Application

> **Live Demo:** [https://your-project-domain.com](https://your-project-domain.com)
> 
> **Admin Panel:** [https://your-project-domain.com/admin](https://your-project-domain.com/admin)
> 
> **API Documentation:** [https://your-project-domain.com/api-docs](https://your-project-domain.com/api-docs)
> 
> **Client Repository:** [https://github.com/your-username/project-frontend](https://github.com/your-username/project-frontend)

_Empowering [Company/Sansthan Name] with modern digital solutions._

[![Live Website](https://img.shields.io/badge/Live-Website-2563eb?style=for-the-badge&logo=google-chrome&logoColor=white)](https://your-project-domain.com)
[![Admin Panel](https://img.shields.io/badge/Admin-Dashboard-dc2626?style=for-the-badge&logo=shield&logoColor=white)](https://your-project-domain.com/admin)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

---

<p align="center">
  <img src="https://github.com/user-attachments/assets/your-project-screenshot.png" alt="Project Screenshot" width="100%" />
</p>

---

## 📖 Table of Contents

1. [About the Project](#-about-the-project)
2. [Key Features](#-key-features)
   - [Public/User Features](#-publicuser-features)
   - [Admin Features](#-admin-features)
3. [Tech Stack](#-tech-stack)
   - [Frontend](#frontend-client-side)
   - [Backend](#backend-server-side)
   - [DevOps & Tools](#devops--tools)
4. [Project Structure](#-project-structure)
5. [Getting Started](#-getting-started)
   - [Prerequisites](#-prerequisites)
   - [Installation](#-installation)
   - [Database Setup](#-database-setup)
   - [Environment Variables](#-environment-variables)
6. [Running the Application](#-running-the-application)
7. [API Documentation](#-api-documentation)
   - [Authentication](#-authentication)
   - [Core Resources](#-core-resources)
   - [Admin Endpoints](#-admin-endpoints)
   - [Utility Endpoints](#-utility-endpoints)
8. [Database Schema](#-database-schema)
9. [Troubleshooting](#-troubleshooting)
10. [Deployment](#-deployment)
    - [Vercel Deployment](#vercel-recommended)
    - [Manual VPS Deployment](#manual-deployment-vpsnode)
    - [Docker Deployment](#docker-deployment)
11. [Security Considerations](#-security-considerations)
12. [Performance Optimizations](#-performance-optimizations)
13. [Testing](#-testing)
14. [Maintenance & Support](#-maintenance--support)
15. [Contributing](#-contributing)
16. [Changelog](#-changelog)
17. [License](#-license)
18. [Contact & Support](#-contact--support)
19. [Acknowledgements](#-acknowledgements)
20. [Screenshots](#-screenshots)

---

## 🌐 About the Project

**[Project Name]** is a comprehensive, production-ready full-stack web application developed for **[Company/Sansthan Name]**. This platform is designed to digitize and streamline [describe the main purpose: operations, services, e-commerce, management, etc.].

### Project Objectives

- **Digital Transformation:** Modernize traditional workflows with an intuitive web interface
- **Operational Efficiency:** Automate repetitive tasks and reduce manual intervention
- **User Experience:** Provide a seamless, responsive experience across all devices
- **Scalability:** Built with future growth and feature expansion in mind
- **Security:** Implement industry-standard security practices for data protection

### Target Audience

1. **End Users/Customers:** [Describe who will use the public-facing features]
2. **Administrators:** Staff members who manage content, users, and operations
3. **Super Admins:** Organization leadership with full system access

### Business Value

- Reduces operational overhead by **[X]%**
- Improves customer engagement through digital channels
- Provides real-time analytics and reporting capabilities
- Enables 24/7 accessibility for users worldwide

---

## ✨ Key Features

### 🛍️ Public/User Features

| Feature | Description |
|---------|-------------|
| **Modern Landing Page** | Responsive, SEO-optimized home page with dynamic content sections |
| **User Authentication** | Secure signup/login with email verification and password recovery |
| **User Dashboard** | Personal dashboard to manage profile, history, and preferences |
| **Search & Filters** | Advanced search with multiple filter options and sorting |
| **Responsive Design** | Mobile-first approach, works flawlessly on all screen sizes |
| **Real-time Notifications** | Toast notifications for important actions and updates |
| **Multi-language Support** | i18n ready architecture (if applicable) |
| **Dark/Light Mode** | Theme toggle for user preference |
| **Contact Forms** | Integrated contact and inquiry forms with validation |
| **Newsletter Subscription** | Email subscription for updates and announcements |

### 🛡️ Admin Features

| Feature | Description |
|---------|-------------|
| **Dashboard Analytics** | Real-time metrics, charts, and KPI tracking |
| **User Management** | Create, view, edit, delete users; role assignment |
| **Content Management** | Full CRUD operations for all content types |
| **Media Library** | Upload, organize, and manage images and documents |
| **Order/Request Management** | Track and update status of orders/requests |
| **Message Center** | View and respond to user inquiries; mark as resolved |
| **Reports & Exports** | Generate and download reports in CSV/PDF formats |
| **Activity Logs** | Track all admin actions for audit purposes |
| **Settings & Configuration** | System-wide settings management |
| **Backup & Restore** | Database backup functionality |

### 🔒 Security Features

- JWT-based authentication with refresh tokens
- Password hashing with bcrypt (salt rounds: 12)
- Role-based access control (RBAC)
- Rate limiting on all API endpoints
- Input validation and sanitization
- CORS configuration
- XSS and CSRF protection
- SQL injection prevention via Prisma ORM

---

## 🚀 Tech Stack

### Frontend (Client-Side)

| Technology | Purpose | Version |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | React Framework (App Router) | 14.x |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript | 5.x |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS Framework | 3.x |
| [Zustand](https://github.com/pmndrs/zustand) | State Management | 4.x |
| [React Hook Form](https://react-hook-form.com/) | Form Handling | 7.x |
| [Zod](https://zod.dev/) | Schema Validation | 3.x |
| [Framer Motion](https://www.framer.com/motion/) | Animations | 10.x |
| [Lucide React](https://lucide.dev/) | Icon Library | Latest |
| [React Hot Toast](https://react-hot-toast.com/) | Toast Notifications | 2.x |
| [Recharts](https://recharts.org/) | Charts & Graphs | 2.x |
| [TanStack Query](https://tanstack.com/query) | Server State Management | 5.x |

### Backend (Server-Side)

| Technology | Purpose | Version |
|------------|---------|---------|
| [Node.js](https://nodejs.org/) | JavaScript Runtime | 18.x+ |
| [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) | Serverless API | 14.x |
| [Prisma](https://www.prisma.io/) | ORM & Database Toolkit | 5.x |
| [PostgreSQL](https://www.postgresql.org/) | Relational Database | 15.x |
| [JSON Web Tokens](https://jwt.io/) | Authentication | - |
| [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Password Hashing | 5.x |
| [Nodemailer](https://nodemailer.com/) | Email Service | 6.x |
| [Multer](https://github.com/expressjs/multer) | File Upload Handling | 1.x |
| [Sharp](https://sharp.pixelplumbing.com/) | Image Processing | 0.32.x |

### DevOps & Tools

| Technology | Purpose |
|------------|---------|
| [Git](https://git-scm.com/) | Version Control |
| [GitHub Actions](https://github.com/features/actions) | CI/CD Pipeline |
| [Vercel](https://vercel.com/) | Hosting & Deployment |
| [Neon](https://neon.tech/) / [Supabase](https://supabase.com/) | Cloud Database |
| [Cloudinary](https://cloudinary.com/) | Media Storage (Optional) |
| [Postman](https://www.postman.com/) | API Testing |
| [ESLint](https://eslint.org/) | Code Linting |
| [Prettier](https://prettier.io/) | Code Formatting |
| [Husky](https://typicode.github.io/husky/) | Git Hooks |

---

## 📂 Project Structure

```bash
project-root/
│
├── .env                          # Environment variables (GIT IGNORED)
├── .env.example                  # Environment template
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Prettier configuration
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.js             # PostCSS configuration
├── LICENSE                       # License file
├── README.md                     # Project documentation
│
├── prisma/
│   ├── schema.prisma             # Database schema definition
│   ├── migrations/               # Database migration history
│   └── seed.ts                   # Database seeding script
│
├── public/
│   ├── images/                   # Static images
│   ├── fonts/                    # Custom fonts
│   ├── favicon.ico               # Favicon
│   └── robots.txt                # SEO robots file
│
├── logs/
│   ├── access.log                # Access logs
│   └── error.log                 # Error logs
│
└── src/
    │
    ├── app/                      # Next.js App Router
    │   ├── (auth)/               # Auth route group
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── signup/
    │   │   │   └── page.tsx
    │   │   ├── forgot-password/
    │   │   │   └── page.tsx
    │   │   └── layout.tsx
    │   │
    │   ├── (main)/               # Main public routes
    │   │   ├── page.tsx          # Home page
    │   │   ├── about/
    │   │   │   └── page.tsx
    │   │   ├── services/
    │   │   │   └── page.tsx
    │   │   ├── contact/
    │   │   │   └── page.tsx
    │   │   └── layout.tsx
    │   │
    │   ├── (dashboard)/          # Protected dashboard routes
    │   │   ├── user/
    │   │   │   ├── profile/
    │   │   │   │   └── page.tsx
    │   │   │   ├── settings/
    │   │   │   │   └── page.tsx
    │   │   │   └── layout.tsx
    │   │   │
    │   │   └── admin/
    │   │       ├── page.tsx      # Admin dashboard
    │   │       ├── users/
    │   │       │   └── page.tsx
    │   │       ├── content/
    │   │       │   └── page.tsx
    │   │       ├── messages/
    │   │       │   └── page.tsx
    │   │       ├── settings/
    │   │       │   └── page.tsx
    │   │       └── layout.tsx
    │   │
    │   ├── api/                  # API Routes (Backend)
    │   │   ├── auth/
    │   │   │   ├── signup/
    │   │   │   │   └── route.ts
    │   │   │   ├── login/
    │   │   │   │   └── route.ts
    │   │   │   ├── logout/
    │   │   │   │   └── route.ts
    │   │   │   ├── me/
    │   │   │   │   └── route.ts
    │   │   │   ├── forgot-password/
    │   │   │   │   └── route.ts
    │   │   │   └── reset-password/
    │   │   │       └── route.ts
    │   │   │
    │   │   ├── users/
    │   │   │   ├── route.ts
    │   │   │   └── [id]/
    │   │   │       └── route.ts
    │   │   │
    │   │   ├── [resource]/       # Dynamic resource routes
    │   │   │   ├── route.ts
    │   │   │   └── [id]/
    │   │   │       └── route.ts
    │   │   │
    │   │   ├── admin/
    │   │   │   ├── stats/
    │   │   │   │   └── route.ts
    │   │   │   ├── logs/
    │   │   │   │   └── route.ts
    │   │   │   └── backup/
    │   │   │       └── route.ts
    │   │   │
    │   │   ├── contact/
    │   │   │   └── route.ts
    │   │   │
    │   │   ├── newsletter/
    │   │   │   └── route.ts
    │   │   │
    │   │   ├── upload/
    │   │   │   └── route.ts
    │   │   │
    │   │   └── health/
    │   │       └── route.ts
    │   │
    │   ├── layout.tsx            # Root layout
    │   ├── loading.tsx           # Global loading state
    │   ├── error.tsx             # Global error boundary
    │   ├── not-found.tsx         # 404 page
    │   └── globals.css           # Global styles
    │
    ├── components/               # Reusable UI Components
    │   ├── ui/                   # Base UI components
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Card.tsx
    │   │   ├── Table.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Dropdown.tsx
    │   │   ├── Tabs.tsx
    │   │   ├── Skeleton.tsx
    │   │   └── index.ts
    │   │
    │   ├── layout/               # Layout components
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Sidebar.tsx
    │   │   ├── Navbar.tsx
    │   │   └── MobileMenu.tsx
    │   │
    │   ├── forms/                # Form components
    │   │   ├── LoginForm.tsx
    │   │   ├── SignupForm.tsx
    │   │   ├── ContactForm.tsx
    │   │   └── ProfileForm.tsx
    │   │
    │   ├── admin/                # Admin-specific components
    │   │   ├── AdminSidebar.tsx
    │   │   ├── StatsCard.tsx
    │   │   ├── DataTable.tsx
    │   │   ├── Charts.tsx
    │   │   └── ActivityLog.tsx
    │   │
    │   └── shared/               # Shared components
    │       ├── Logo.tsx
    │       ├── ThemeToggle.tsx
    │       ├── SearchBar.tsx
    │       ├── Pagination.tsx
    │       └── EmptyState.tsx
    │
    ├── lib/                      # Library & Configuration
    │   ├── db.ts                 # Prisma client instance
    │   ├── auth.ts               # Authentication utilities
    │   ├── api.ts                # API client wrapper
    │   ├── utils.ts              # General utility functions
    │   ├── constants.ts          # Application constants
    │   ├── validations.ts        # Zod schemas
    │   └── email.ts              # Email utilities
    │
    ├── hooks/                    # Custom React Hooks
    │   ├── useAuth.ts
    │   ├── useUser.ts
    │   ├── useDebounce.ts
    │   ├── useLocalStorage.ts
    │   ├── useMediaQuery.ts
    │   └── useClickOutside.ts
    │
    ├── store/                    # Zustand State Stores
    │   ├── useAuthStore.ts
    │   ├── useUIStore.ts
    │   └── useCartStore.ts
    │
    ├── types/                    # TypeScript Definitions
    │   ├── index.ts
    │   ├── api.ts
    │   ├── user.ts
    │   └── database.ts
    │
    ├── middleware/               # API Middleware
    │   ├── auth.ts               # Authentication middleware
    │   ├── admin.ts              # Admin authorization
    │   ├── rateLimit.ts          # Rate limiting
    │   └── validation.ts         # Request validation
    │
    ├── services/                 # Business Logic Services
    │   ├── userService.ts
    │   ├── emailService.ts
    │   ├── uploadService.ts
    │   └── analyticsService.ts
    │
    └── middleware.ts             # Next.js Edge Middleware


---

## 🏁 Getting Started

Follow these instructions to set up the project locally on your machine for development, testing, and customization.

### 📌 Prerequisites

Ensure you have the following installed on your system:

| Requirement | Version | Installation |
|-------------|---------|--------------|
| **Node.js** | v18.17.0+ | [Download](https://nodejs.org/) |
| **npm/yarn/pnpm** | Latest | Comes with Node.js |
| **PostgreSQL** | 14.x+ | [Download](https://www.postgresql.org/download/) or use cloud |
| **Git** | Latest | [Download](https://git-scm.com/) |

**Optional but Recommended:**
- [VS Code](https://code.visualstudio.com/) with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma

---

### 📥 Installation

**Step 1: Clone the Repository**

```bash
git clone https://github.com/your-username/project-name.git
cd project-name
```

**Step 2: Install Dependencies**

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

**Step 3: Set Up Environment Variables**

```bash
# Copy the example environment file
cp .env.example .env

# Open and edit with your values
nano .env
# or use any text editor
```

---

### 🗄️ Database Setup

**Step 1: Ensure PostgreSQL is Running**

For local development:
```bash
# Check PostgreSQL status (Linux/Mac)
sudo service postgresql status

# Or for Mac with Homebrew
brew services list
```

**Step 2: Create Database**

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE project_db;

# Exit
\q
```

**Step 3: Generate Prisma Client**

```bash
npx prisma generate
```

**Step 4: Run Database Migrations**

```bash
# Development (creates migration and applies)
npx prisma migrate dev --name init

# Production (applies existing migrations)
npx prisma migrate deploy
```

**Step 5: Seed Database (Optional)**

```bash
# Run seed script to populate demo data
npx prisma db seed

# Or manually
npx ts-node prisma/seed.ts
```

---

### 🔑 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# ============================================
# APPLICATION CONFIGURATION
# ============================================
NODE_ENV="development"
NEXT_PUBLIC_APP_NAME="Project Name"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# ============================================
# DATABASE CONFIGURATION
# ============================================
# Local PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/project_db?schema=public"

# Cloud PostgreSQL (Neon/Supabase/Railway)
# DATABASE_URL="postgresql://username:password@host.cloud.provider:5432/dbname?sslmode=require"

# ============================================
# AUTHENTICATION & SECURITY
# ============================================
# Generate with: openssl rand -base64 64
JWT_SECRET="your_super_secret_jwt_key_minimum_32_characters_long"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your_refresh_token_secret_key"
JWT_REFRESH_EXPIRES_IN="30d"

# Bcrypt salt rounds (10-12 recommended)
BCRYPT_SALT_ROUNDS=12

# ============================================
# EMAIL CONFIGURATION (SMTP)
# ============================================
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-specific-password"
EMAIL_FROM="Project Name <noreply@yourdomain.com>"

# ============================================
# FILE UPLOAD CONFIGURATION
# ============================================
UPLOAD_MAX_SIZE=5242880
UPLOAD_ALLOWED_TYPES="image/jpeg,image/png,image/webp,application/pdf"

# Cloudinary (Optional - for cloud storage)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# ============================================
# RATE LIMITING
# ============================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ============================================
# OPTIONAL SERVICES
# ============================================
# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Error Tracking (Sentry)
SENTRY_DSN="https://xxxx@sentry.io/xxxx"

# ============================================
# ADMIN CONFIGURATION
# ============================================
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_DEFAULT_PASSWORD="ChangeThisPassword123!"
```

**⚠️ Important Security Notes:**
- Never commit `.env` file to version control
- Use strong, unique secrets in production
- Rotate secrets periodically
- Use environment-specific values for each deployment

---

## ▶️ Running the Application

### Development Mode

Start the development server with hot-reloading:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Available Development URLs:**
- **Homepage:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **API Health:** http://localhost:3000/api/health

---

### Production Build

Build the optimized production bundle:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

### Prisma Studio

Inspect and manage database visually:

```bash
npx prisma studio
```

Opens at [http://localhost:5555](http://localhost:5555)

---

### Other Useful Commands

```bash
# Lint code
npm run lint

# Fix lint errors
npm run lint:fix

# Format code with Prettier
npm run format

# Type check
npm run type-check

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Generate Prisma client after schema changes
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View database in terminal
npx prisma db pull
```

---

## 📡 API Documentation

The backend exposes RESTful API endpoints. All routes are located in `src/app/api/`.

**Base URL:** `http://localhost:3000/api` (Development)

**Response Format:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "ERROR_CODE",
    "details": { ... }
  }
}
```

---

### 🔐 Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | Login & receive JWT | Public |
| POST | `/api/auth/logout` | Logout & clear session | Public |
| GET | `/api/auth/me` | Get current user profile | User |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| POST | `/api/auth/reset-password` | Reset password with token | Public |
| POST | `/api/auth/verify-email` | Verify email address | Public |
| POST | `/api/auth/refresh-token` | Refresh access token | User |

**Example: User Registration**

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!",
    "phone": "+91-9876543210"
  }'
```

**Example: Login**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

---

### 📦 Core Resources

#### Users

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users` | Get all users (paginated) | Admin |
| GET | `/api/users/[id]` | Get user by ID | Admin |
| PATCH | `/api/users/[id]` | Update user details | Admin/Self |
| DELETE | `/api/users/[id]` | Delete user | Admin |
| PATCH | `/api/users/[id]/role` | Update user role | Super Admin |

#### Content/Resources (Customize as needed)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/[resource]` | Get all items (w/ filters) | Public/User |
| GET | `/api/[resource]/[id]` | Get single item | Public/User |
| POST | `/api/[resource]` | Create new item | Admin |
| PATCH | `/api/[resource]/[id]` | Update item | Admin |
| DELETE | `/api/[resource]/[id]` | Delete item | Admin |

---

### 📩 Contact & Messages

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Submit contact inquiry | Public |
| GET | `/api/contact` | Get all inquiries | Admin |
| GET | `/api/contact/[id]` | Get single inquiry | Admin |
| PATCH | `/api/contact/[id]` | Update status (Solved/Pending) | Admin |
| DELETE | `/api/contact/[id]` | Delete inquiry | Admin |

---

### 📧 Newsletter

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter | Public |
| POST | `/api/newsletter/unsubscribe` | Unsubscribe from newsletter | Public |
| GET | `/api/newsletter/subscribers` | Get all subscribers | Admin |
| DELETE | `/api/newsletter/[id]` | Remove subscriber | Admin |

---

### 🛡️ Admin Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/admin/stats` | Dashboard statistics | Admin |
| GET | `/api/admin/logs` | System activity logs | Super Admin |
| GET | `/api/admin/analytics` | Analytics data | Admin |
| POST | `/api/admin/backup` | Create database backup | Super Admin |
| GET | `/api/admin/settings` | Get system settings | Admin |
| PATCH | `/api/admin/settings` | Update system settings | Super Admin |

---

### 🔧 Utility Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/health` | API health check | Public |
| GET | `/api/status` | System status | Public |
| POST | `/api/upload` | Upload file/image | User |
| DELETE | `/api/upload/[id]` | Delete uploaded file | User/Admin |

**Health Check Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-21T02:18:00.000Z",
  "uptime": "24h 30m 15s",
  "database": "connected",
  "version": "1.0.0"
}
```

---

## 🗃️ Database Schema

The database is designed using Prisma ORM with PostgreSQL. Below is the core schema structure:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
  SUPER_ADMIN
}

enum Status {
  PENDING
  ACTIVE
  INACTIVE
  SUSPENDED
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String
  name          String
  phone         String?
  avatar        String?
  role          Role      @default(USER)
  status        Status    @default(ACTIVE)
  emailVerified Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  messages      Message[]
  activities    ActivityLog[]
  
  @@map("users")
}

model Message {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String   @db.Text
  status    String   @default("pending")
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("messages")
}

model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  
  @@map("newsletters")
}

model ActivityLog {
  id        String   @id @default(cuid())
  action    String
  entity    String
  entityId  String?
  details   Json?
  ipAddress String?
  userAgent String?
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  
  @@map("activity_logs")
}

model Setting {
  id        String   @id @default(cuid())
  key       String   @unique
  value     Json
  updatedAt DateTime @updatedAt
  
  @@map("settings")
}
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

**1. `ECONNREFUSED` - Database Connection Failed**

```
Error: P1001: Can't reach database server at `localhost:5432`
```

**Causes:**
- PostgreSQL not running
- Incorrect credentials in `.env`
- Firewall blocking connection

**Solutions:**
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Start PostgreSQL
sudo service postgresql start

# Verify connection string format
# postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

---

**2. `Prisma Client Errors` - Type Mismatch**

```
Property 'newField' does not exist on type 'User'
```

**Cause:** Schema changed but client not regenerated

**Solution:**
```bash
npx prisma generate
# Restart your development server
npm run dev
```

---

**3. `CORS Errors` - API Requests Blocked**

```
Access to fetch has been blocked by CORS policy
```

**Solution:** Check `next.config.mjs`:
```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PATCH,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};
```

---

**4. `Images Not Loading` - Domain Not Whitelisted**

```
Invalid src prop on `next/image`, hostname "example.com" is not configured
```

**Solution:** Update `next.config.mjs`:
```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
};
```

---

**5. `JWT Token Expired` - Authentication Errors**

```
JsonWebTokenError: jwt expired
```

**Solution:**
- Implement refresh token logic
- Clear cookies and re-login
- Check `JWT_EXPIRES_IN` in `.env`

---

**6. `Build Errors` - TypeScript Compilation**

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Type check
npm run type-check
```

---

## 🚢 Deployment

### Vercel (Recommended)

**Step 1:** Push code to GitHub

**Step 2:** Visit [Vercel](https://vercel.com) and import your repository

**Step 3:** Configure environment variables in Vercel dashboard

**Step 4:** Deploy automatically

**Vercel Configuration (`vercel.json`):**
```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["bom1"]
}
```

---

### Manual Deployment (VPS/Node.js)

**Step 1: Prepare Server**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
npm install -g pm2
```

**Step 2: Clone and Setup**
```bash
git clone https://github.com/your-username/project.git
cd project
npm install
cp .env.example .env
nano .env  # Configure production values
```

**Step 3: Build and Start**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build application
npm run build

# Start with PM2
pm2 start npm --name "project-name" -- start
pm2 save
pm2 startup
```

**Step 4: Configure Nginx**
```nginx
# /etc/nginx/sites-available/project
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Step 5: Enable SSL with Certbot**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

### Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: project_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

**Commands:**
```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🔒 Security Considerations

### Implemented Security Measures

| Measure | Implementation |
|---------|----------------|
| **Password Hashing** | Bcrypt with 12 salt rounds |
| **JWT Authentication** | Signed tokens with expiration |
| **Rate Limiting** | 100 requests per 15 minutes |
| **Input Validation** | Zod schemas on all endpoints |
| **SQL Injection Prevention** | Prisma ORM parameterized queries |
| **XSS Protection** | React's built-in escaping + sanitization |
| **CORS Configuration** | Restricted to allowed origins |
| **HTTP-Only Cookies** | Secure cookie flags enabled |
| **Environment Variables** | Secrets kept out of codebase |

### Security Checklist for Production

- [ ] Change all default passwords
- [ ] Enable HTTPS/SSL
- [ ] Set secure cookie options
- [ ] Configure CSP headers
- [ ] Enable rate limiting
- [ ] Regular dependency updates
- [ ] Database backups enabled
- [ ] Error messages sanitized
- [ ] Admin routes protected
- [ ] Audit logging enabled

---

## ⚡ Performance Optimizations

### Implemented Optimizations

- **Server-Side Rendering (SSR)** for dynamic content
- **Static Site Generation (SSG)** for static pages
- **Image Optimization** via Next.js Image component
- **Code Splitting** automatic by Next.js
- **Lazy Loading** for non-critical components
- **Database Indexing** on frequently queried columns
- **API Response Caching** with appropriate headers
- **Gzip Compression** enabled
- **Bundle Analysis** for optimization tracking

### Lighthouse Score Targets

| Metric | Target | Current |
|--------|--------|---------|
| Performance | > 90 | ✅ |
| Accessibility | > 95 | ✅ |
| Best Practices | > 95 | ✅ |
| SEO | > 95 | ✅ |

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Test Structure

```
tests/
├── unit/
│   ├── utils.test.ts
│   └── services.test.ts
├── integration/
│   └── api.test.ts
└── e2e/
    └── user-flow.test.ts
```

---

## 🛠️ Maintenance & Support

### Regular Maintenance Tasks

| Task | Frequency | Command/Action |
|------|-----------|----------------|
| Update dependencies | Weekly | `npm update` |
| Security audit | Weekly | `npm audit` |
| Database backup | Daily | Automated via cron |
| Log rotation | Daily | Configured in PM2 |
| SSL renewal | Auto (Certbot) | Auto-renewal |
| Performance monitoring | Continuous | Vercel Analytics |

### Support Included

- **30 Days Post-Deployment Support**
- Bug fixes related to delivered features
- Minor text/content changes
- Deployment assistance
- Documentation updates

### Extended Support (Optional)

- Monthly maintenance packages available
- Feature additions quoted separately
- 24/7 emergency support available

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

**1. Fork the Repository**
```bash
git clone https://github.com/your-username/project.git
```

**2. Create Feature Branch**
```bash
git checkout -b feature/AmazingFeature
```

**3. Make Changes & Commit**
```bash
git add .
git commit -m "feat: Add AmazingFeature"
```

**4. Push to Branch**
```bash
git push origin feature/AmazingFeature
```

**5. Open Pull Request**

### Commit Message Convention

```
feat: Add new feature
fix: Bug fix
docs: Documentation updates
style: Formatting changes
refactor: Code restructuring
test: Adding tests
chore: Maintenance tasks
```

---

## 📋 Changelog

### Version 1.0.0 (January 2026)

**🎉 Initial Release**

- Core authentication system
- Admin dashboard with analytics
- User management
- Content management system
- Contact form with admin inbox
- Newsletter subscription
- Responsive design
- API documentation
- Deployment guides

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 [Your Name/Company]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact & Support

### Developer Contact

| Channel | Details |
|---------|---------|
| **Developer** | [Your Name] |
| **Email** | [your.email@domain.com](mailto:your.email@domain.com) |
| **Phone** | +91-XXXXXXXXXX |
| **LinkedIn** | [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile) |
| **GitHub** | [github.com/your-username](https://github.com/your-username) |
| **Portfolio** | [yourportfolio.com](https://yourportfolio.com) |

### Client/Organization

| Channel | Details |
|---------|---------|
| **Organization** | [Company/Sansthan Name] |
| **Website** | [https://client-website.com](https://client-website.com) |
| **Support Email** | [support@client-website.com](mailto:support@client-website.com) |

### Reporting Issues

Please report bugs and issues via:
1. **GitHub Issues** - For technical bugs
2. **Email** - For urgent production issues
3. **Phone** - For critical emergencies only

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Prisma](https://prisma.io/) - Next-generation ORM
- [Vercel](https://vercel.com/) - Deployment Platform
- [Lucide Icons](https://lucide.dev/) - Icon Library
- All open-source contributors

---

## 📸 Screenshots


---

<p align="center">
  <strong>Built with ❤️ by [Ajay Kumar Saini]</strong>
  <br>
  <sub>© 2026 All Rights Reserved</sub>
</p>
```

***


