# 💻 LaptopSolutions.shop – Full-Stack E-Commerce & Repair Platform

[![Live Website](https://img.shields.io/badge/Live-Website-2563eb?style=for-the-badge&logo=google-chrome&logoColor=white)](https://laptopsolutions.shop)
[![Admin Panel](https://img.shields.io/badge/Admin-Dashboard-dc2626?style=for-the-badge&logo=admin&logoColor=white)](https://laptopsolutions.shop/dashboard)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

---

## 📖 Table of Contents

1.  [About the Project](#-about-the-project)
2.  [Key Features](#-key-features)
    * [User Features](#-user-features)
    * [Admin Features](#-admin-features)
3.  [Tech Stack](#-tech-stack)
4.  [Project Structure](#-project-structure)
5.  [Getting Started](#-getting-started)
    * [Prerequisites](#-prerequisites)
    * [Installation](#-installation)
    * [Database Setup](#-database-setup)
    * [Environment Variables](#-environment-variables)
6.  [Running the Application](#-running-the-application)
7.  [API Documentation](#-api-documentation)
    * [Authentication](#-authentication)
    * [Products](#-products)
    * [Messages](#-messages-contact-form)
    * [Orders](#-orders)
8.  [Troubleshooting](#-troubleshooting)
9.  [Deployment](#-deployment)
10. [Contributing](#-contributing)
11. [License](#-license)

---

## 🌐 About the Project

**LaptopSolutions.shop** is a robust, full-stack web platform designed to bridge the gap between e-commerce and service management for computer hardware. It serves two primary audiences:
1.  **Customers:** Who can browse laptops/accessories, place orders, and book repair services.
2.  **Administrators:** Who manage the entire lifecycle of products, orders, user data, and customer inquiries through a secure dashboard.

The project is built with performance and scalability in mind, utilizing **Next.js 14 (App Router)** for server-side rendering and static generation, **Prisma** for type-safe database interactions, and **PostgreSQL** for reliable data storage.

This platform automates the traditional repair shop workflow, allowing customers to track repairs, purchase upgrades, and communicate with technicians directly through the web interface.

---

## ✨ Key Features

### 🛍️ User Features
* **Modern Storefront:** A responsive, visually appealing home page showcasing featured products, services, and offers using modern UI principles.
* **Product Catalog:** Advanced filtering, sorting, and search capabilities to find specific laptops, RAM, SSDs, or spare parts.
* **Service Booking:** Dedicated pages for users to request repairs, replacements, upgrades, or diagnostics.
* **Secure Cart & Checkout:** A seamless flow from product selection to purchase confirmation, including address management.
* **User Accounts:** Personal dashboard to view order history, profile settings, and wishlist items.
* **Contact & Support:** Integrated contact forms for general inquiries and support tickets, with email confirmation.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices using Tailwind CSS mobile-first approach.

### 🛡️ Admin Features
* **Dashboard Analytics:** Real-time overview of total sales, active orders, pending tickets, and new user registrations.
* **Product Management:**
    * Create, update, and delete products.
    * Manage inventory levels, pricing, and category assignments.
    * Upload and manage product images securely.
* **Order Management:**
    * View all incoming orders in a list view.
    * Update order status (Pending, Processing, Shipped, Delivered, Cancelled).
    * View detailed customer information and shipping addresses.
* **Customer Inquiries (Helpdesk):**
    * View messages sent via the "Contact Us" form.
    * **Mark as Solved/Unsolved** toggle for efficient ticket tracking.
    * Filter messages by status (All, Pending, Solved).
    * **Delete** spam or irrelevant inquiries.
    * Direct email integration for replies.
* **Newsletter Management:** View and manage subscribed email addresses for marketing campaigns.
* **Security:** Role-based access control (RBAC) protecting all admin routes via middleware.

---

## 🚀 Tech Stack

### Frontend (Client-Side)
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing for reliability)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework)
* **UI Components:** Custom components built with accessibility in mind.
* **Icons:** [Lucide React](https://lucide.dev/) (Consistent, lightweight icons)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Simple, scalable state management)
* **Animations:** [Framer Motion](https://www.framer.com/motion/) (Smooth transitions)
* **Notifications:** [React Hot Toast](https://react-hot-toast.com/) (Beautiful toast notifications)

### Backend (Server-Side)
* **Runtime:** Node.js
* **API:** Next.js API Routes (Serverless functions)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on Neon/AWS/Vercel)
* **ORM:** [Prisma](https://www.prisma.io/) (Type-safe database client)
* **Authentication:**
    * JSON Web Tokens (JWT) for stateless session management.
    * Bcrypt for secure password hashing.
    * Custom middleware for route protection.
* **Email:** Nodemailer (for sending automated emails/notifications).

---

## 📂 Project Structure

```bash
laptopshop/
├── .env                    # Environment variables (GIT IGNORED)
├── .gitignore              # Git ignore rules
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── prisma/
│   └── schema.prisma       # Database schema definition
├── public/                 # Static assets (images, fonts, favicons)
└── src/
    ├── app/                # Next.js App Router (Pages & Layouts)
    │   ├── api/            # Backend API Routes
    │   │   ├── auth/       # Authentication endpoints
    │   │   ├── products/   # Product management endpoints
    │   │   ├── orders/     # Order processing endpoints
    │   │   └── quary-messages/ # Contact form endpoints
    │   ├── dashboard/      # Admin Panel Pages
    │   │   ├── admin/      # Protected Admin Routes
    │   │   └── user/       # Protected User Routes
    │   ├── shop/           # Product Listing Pages
    │   ├── cart/           # Shopping Cart Page
    │   ├── auth/           # Login/Signup Pages
    │   ├── layout.tsx      # Root Layout
    │   └── page.tsx        # Home Page
    ├── components/         # Reusable UI Components
    │   ├── admin/          # Admin-specific components (Sidebar, Tables)
    │   ├── ui/             # Generic UI (Buttons, Inputs, Modals)
    │   └── layout/         # Header, Footer, Sidebar
    ├── lib/                # Library & Configuration
    │   ├── api.ts          # Centralized API Client (Axios/Fetch wrapper)
    │   ├── db.ts           # Prisma Client Instance
    │   └── utils.ts        # Helper functions
    ├── hooks/              # Custom React Hooks
    │   └── useAuth.ts      # Authentication hook
    ├── store/              # Global State (Zustand)
    │   └── useCart.ts      # Cart state management
    ├── types/              # TypeScript Type Definitions
    └── middleware/         # Backend middleware (Auth, Validation)
```

## 🏁 Getting Started

Follow these instructions to set up the project locally on your machine for development and testing purposes.

### 📌 Prerequisites

Ensure you have the following installed on your local machine:
* **Node.js** (v18.17.0 or higher recommended)
* **npm**, **yarn**, or **pnpm** (Package managers)
* **PostgreSQL Database** (Local instance or Cloud provider like Neon/Supabase)
* **Git** (Version control)

### 📥 Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/laptop-solutions-shop.git](https://github.com/your-username/laptop-solutions-shop.git)
    cd laptop-solutions-shop
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or if using yarn
    yarn install
    ```

### 🗄️ Database Setup

1.  Make sure you have a PostgreSQL database running.
2.  Update your `.env` file with the connection string (see "Environment Variables" section below).
3.  **Generate Prisma Client:**
    This command reads your `schema.prisma` and generates the TypeScript client.
    ```bash
    npx prisma generate
    ```
4.  **Push Schema to Database:**
    This command syncs your database schema with your Prisma file.
    ```bash
    npx prisma db push
    ```
    *(Note: For production environments, it is recommended to use `npx prisma migrate dev` to manage migration history properly)*

### 🔑 Environment Variables

Create a `.env` file in the root directory and populate it with the following configuration. Replace the placeholder values with your actual secrets.

```env
# Database Connection
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
DATABASE_URL="postgresql://postgres:password@localhost:5432/laptopshop?schema=public"

# Authentication Secrets
JWT_SECRET="your_super_secret_jwt_key_here_make_it_long_and_complex"
NEXTAUTH_SECRET="your_nextauth_secret_key" # If utilizing NextAuth.js

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Email Configuration (Optional - for Nodemailer)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-email-app-password"

```
Here’s a properly formatted **GitHub README (`README.md`)** file version of your content, written entirely in Markdown syntax so you can copy and save it directly.  

***

# ▶️ Running the Application

## Development Mode
To start the development server with hot-reloading features:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

***

## Production Build
To build the application for production usage:

```bash
npm run build
```

To start the production server after building:

```bash
npm start
```

***

## Prisma Studio
To inspect and manage your database data visually:

```bash
npx prisma studio
```

This opens a GUI at [http://localhost:5555](http://localhost:5555).

***

# 📡 API Documentation

The backend exposes several RESTful endpoints.  
All API routes are located in `src/app/api`.

***

## 🔐 Authentication

| Method | Endpoint          | Description               | Access |
|---------|------------------|---------------------------|---------|
| POST    | /api/auth/signup | Register a new user       | Public  |
| POST    | /api/auth/login  | Login and receive JWT     | Public  |
| POST    | /api/auth/logout | Logout (Clear cookies)    | Public  |
| GET     | /api/auth/me     | Get current user profile  | User    |

***

## 📦 Products

| Method | Endpoint                | Description               | Access |
|---------|------------------------|---------------------------|---------|
| GET     | /api/products          | Get all products (w/ filters) | Public |
| GET     | /api/products/[id]     | Get single product details    | Public |
| POST    | /api/products          | Create a new product          | Admin  |
| PATCH   | /api/products/[id]     | Update product details        | Admin  |
| DELETE  | /api/products/[id]     | Delete a product              | Admin  |

***

## 📩 Messages (Contact Form)

| Method | Endpoint | Description | Access |
|---------|-----------|-------------|---------|
| POST | /api/quary-messages/messages | Submit a new inquiry | Public |
| GET | /api/quary-messages/messages | Get all inquiries | Admin |
| PATCH | /api/quary-messages/messages/[id] | Mark as Solved/Unsolved | Admin |
| DELETE | /api/quary-messages/messages/[id] | Delete an inquiry | Admin |

***

## 🛒 Orders

| Method | Endpoint | Description | Access |
|---------|-----------|-------------|---------|
| POST | /api/orders | Create a new order | User |
| GET | /api/orders | Get user's order history | User |
| GET | /api/admin/orders | Get all system orders | Admin |
| PATCH | /api/orders/[id] | Update order status | Admin |

***

# 🔧 Troubleshooting

### Common Issues

**1. net::ERR_FAILED or CORS Errors**  
- **Symptom:** API requests (especially PATCH/DELETE) fail immediately in the browser console.  
- **Cause:** Browser blocked the request due to incorrect CORS configuration.  
- **Fix:** Check your `next.config.mjs` or backend middleware. Allow `PATCH`, `DELETE`, and `OPTIONS` in CORS setup.

**2. Database Connection Failed**  
- **Symptom:** `P1001: Can't reach database server.`  
- **Cause:** Wrong `DATABASE_URL` or database server down.  
- **Fix:** Verify `.env` credentials. For cloud DB (e.g. Neon), ensure IP whitelisted and SSL enabled.

**3. Prisma Client Errors**  
- **Symptom:** `"Property 'x' does not exist on type 'y'"`.  
- **Cause:** Prisma schema changed but client not regenerated.  
- **Fix:** Run `npx prisma generate` after schema changes.

**4. Images Not Loading**  
- **Symptom:** Next.js Image component throws domain error.  
- **Cause:** Domain not whitelisted.  
- **Fix:** Add the external domain under `images.remotePatterns` in `next.config.mjs`.

***

# 🚢 Deployment

## Vercel (Recommended)
This project is optimized for deployment on **Vercel**, the creators of Next.js.

1. Push your code to a GitHub repository.  
2. Log in to [Vercel](https://vercel.com) and click **"Import Project"**.  
3. Select your repository.  
4. Add environment variables (`DATABASE_URL`, `JWT_SECRET`, etc.) from the project settings.  
5. Click **Deploy** — Vercel will automatically build and provide SSL certificates.

***

## Manual Deployment (VPS / Node.js)
1. Run the production build:
   ```bash
   npm run build
   ```
2. Use **PM2** to manage the process:
   ```bash
   pm2 start npm --name "laptopshop" -- start
   ```
3. Configure **Nginx** as a reverse proxy to route ports 80/443 to 3000.  
4. Set up **Certbot** for SSL.

***

# 🤝 Contributing
We love contributions! Here’s how you can help:

1. **Fork** the repository.  
2. **Create a New Branch**  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit Your Changes**  
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push to GitHub**  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request** on GitHub.

***

# 📄 License
This project is licensed under the **MIT License** — meaning you can freely use, modify, and distribute the code as long as you include the original copyright notice.

See the [LICENSE](./LICENSE) file for more details.

***

# 📞 Contact & Support

If you need help or have feedback, reach out through:

- **Email:** [support@laptopsolutions.shop](mailto:support@laptopsolutions.shop)  
- **Website:** [https://laptopsolutions.shop](https://laptopsolutions.shop)  
- **GitHub Issues:** Please report bugs via the *Issues* tab on GitHub.

***

Would you like me to include a **table of contents** or **badges (e.g., build, license, version)** at the top for better GitHub presentation?
