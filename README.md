<div align="center">

# 🍱 KhabarBox

### A Sophisticated Full-Stack Food Delivery Ecosystem

![Khabarbox](https://i.postimg.cc/BZr5Yrc7/Screenshot-8.png)

[![Next.js](https://img.shields.io/badge/Next.js--black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript--3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS--38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

*KhabarBox is a production-ready food delivery platform built with a focus on granular role-based access control, security, and a seamless multi-role user experience.*

</div>

---

## ✨ Features

### 🔍 Advanced Meal Discovery
- **Smart Filtering** : Find the perfect meal using advanced filters including Price Range, Tags, and Categories.
- **Top-Rated Restaurants** : Homepage highlights top-performing restaurants for quick decision-making.
- **Category-Based Browsing** : Clean, intuitive navigation through different cuisines and food types.

---

### 👥 Multi-Role System

KhabarBox is built around a strict **three-role architecture** — each role has a dedicated, isolated experience.

#### 🛍️ Customer Experience
- **Personalized Order Page** : A dedicated page for customers to track their culinary journey.
- **Real-Time Order Tracking** : Live visibility of all ordered meals and their current delivery status (`PLACED` → `PREPARING` → `READY` → `DELIVERED` → `CANCELLED`).
- **Dynamic Review System** : Customers can leave star ratings and written reviews once their order is successfully **Delivered**.
- **Review Ownership** : Full control to **Edit** or **Delete** their own past reviews.
- **Streamlined UX** : Designed for a straightforward ordering experience without unnecessary dashboard clutter.

#### 🛠️ Admin Dashboard
- **Full Platform Management** : Total control over every entity: Users, Providers, Meals, and Orders.
- **User & Provider Management** : Ability to **Suspend** or **Delete** any account on the platform.
- **Strict Suspension Protocol** : Suspending an account blocks access immediately. If the user is already logged in, they are **automatically logged out within 5 seconds**.
- **Content Moderation** : Admins can edit or delete any meal and manage the global list of categories.
- **Global Order Supervision** : Authority to update the status of any order across the entire platform.
- **Review Moderation** : Power to delete any review to maintain community standards.

#### 👨‍🍳 Provider Dashboard
- **Full Meal Management** : Complete **CRUD** operations (Create, Read, Update, Delete) for their own listed meals.
- **Order Management** : Real-time tracking and status updates for all incoming orders from customers.

---

### 🛡️ Security & Authentication
- **Email Verification** : Secure onboarding with mandatory email verification upon signup.
- **Strict Role Isolation:**
  - Admins **cannot** access Provider dashboards.
  - Providers **cannot** access the Admin panel.
  - Customers are **strictly prohibited** from accessing any specialized dashboard area.
- **Smart Redirects** : Logic-based routing prevents already-logged-in users from accessing the Login or Signup pages.
- **Role-Based Access Control (RBAC)** : Every API call and frontend route is guarded by role-specific middleware, enforced on both client and server.

---

## 🧰 Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.6 | React Framework (App Router) |
| **React** | 19.2.3 | UI Library |
| **TypeScript** | ^5 | Type Safety |
| **Tailwind CSS** | ^4 | Utility-First Styling |
| **shadcn/ui** | ^3.8.4 | Accessible UI Component Library |
| **Radix UI** | ^1.4.3 | Headless UI Primitives |
| **Framer Motion** | ^12.34.0 | Animations & Transitions |
| **Lucide React** | ^0.563.0 | Icon Library |
| **Recharts** | ^2.15.4 | Data Visualization / Charts |

### Forms & Validation

| Technology | Version | Purpose |
|---|---|---|
| **React Hook Form** | ^7.71.1 | Performant Form Management |
| **Zod** | ^4.3.6 | Schema Declaration & Validation |
| **@hookform/resolvers** | ^5.2.2 | RHF + Zod Integration |

### Auth & Utilities

| Technology | Version | Purpose |
|---|---|---|
| **better-auth** | ^1.4.18 | Authentication Library |
| **@t3-oss/env-nextjs** | ^0.13.10 | Type-Safe Environment Variables |
| **Sonner** | ^2.0.7 | Toast Notifications |
| **use-debounce** | ^10.1.0 | Input Debouncing |
| **clsx + tailwind-merge** | latest | Conditional Class Merging |

---

<div align="center">

Made with ❤️ by Rubaid

</div>
