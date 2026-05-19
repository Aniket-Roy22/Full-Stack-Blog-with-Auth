# Full Stack Blog with Authentication

A modern full-stack blogging platform built using React, Express, Prisma, PostgreSQL, and JWT Authentication.

This project demonstrates complete authentication flow implementation, protected API routes, token refresh handling, relational database management, and a responsive frontend architecture.

---

# Table of Contents

- [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
- [Folder Structure](#folder-structure)
- [Authentication System](#authentication-system)
    - [Access Token](#access-token)
    - [Refresh Token](#refresh-token)
- [Authentication Flow](#authentication-flow)
- [Database Schema](#database-schema)
    - [Users Table](#users-table)
    - [Posts Table](#posts-table)
- [API Endpoints](#api-endpoints)
    - [Authentication Routes](#authentication-routes)
    - [Blog Routes](#blog-routes)
- [Installation Guide](#installation-guide)
    - [1. Clone Repository](#1-clone-repository)
    - [2. Backend Setup](#2-backend-setup)
    - [3. Configure Environment Variables](#3-configure-environment-variables)
    - [4. Run Prisma Migration](#4-run-prisma-migration)
    - [5. Start Backend Server](#5-start-backend-server)
    - [6. Frontend Setup](#6-frontend-setup)
    - [7. Start Frontend](#7-start-frontend)
- [Frontend Architecture](#frontend-architecture)
    - [Context API](#context-api)
    - [Axios Interceptors](#axios-interceptors)
    - [Protected Routes](#protected-routes)
- [Security Features](#security-features)
    - [Password Hashing](#password-hashing)
    - [JWT Authentication](#jwt-authentication)
    - [HTTP-Only Cookies](#http-only-cookies)
    - [Authorization Checks](#authorization-checks)
- [Screenshots](#screenshots)
    - [Home Page](#home-page)
    - [Login Page](#login-page)
    - [Single Blog View](#single-blog-view)
- [Learning Outcomes](#learning-outcomes)
- [Author](#author)

---

# Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- CSS

---

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Passport.js
- JWT
- bcrypt

---

# Folder Structure

```bash
Full-Stack-Blog-with-Auth/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   │
│   └── package.json
│
└── README.md
```

---

# Authentication System

This project uses a dual-token authentication system.

## Access Token

- Short-lived JWT
- Stored in localStorage
- Sent with every protected request

---

## Refresh Token

- Long-lived JWT
- Stored in HTTP-only cookies
- Used to automatically generate new access tokens

---

# Authentication Flow

```text
User Login
    ↓
Server validates credentials
    ↓
Access Token returned
Refresh Token stored in cookie
    ↓
Frontend stores access token
    ↓
Protected requests include token
    ↓
Access token expires
    ↓
Frontend automatically calls /auth/token
    ↓
New access token issued
```

---

# Database Schema

## Users Table

| Column   | Type         |
| -------- | ------------ |
| id       | UUID         |
| username | VARCHAR(100) |
| email    | VARCHAR(150) |
| password | VARCHAR(255) |

---

## Posts Table

| Column     | Type         |
| ---------- | ------------ |
| id         | UUID         |
| title      | VARCHAR(255) |
| content    | TEXT         |
| author_id  | UUID         |
| created_at | TIMESTAMP    |

---

# API Endpoints

# Authentication Routes

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | `/auth/register` | Register new user    |
| POST   | `/auth/login`    | Login user           |
| POST   | `/auth/token`    | Refresh access token |
| POST   | `/auth/logout`   | Logout user          |

---

# Blog Routes

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/blogs/all`        | Get all blogs              |
| GET    | `/blogs/:id`        | Get single blog            |
| GET    | `/blogs/user`       | Get logged-in user's blogs |
| POST   | `/blogs/create`     | Create blog                |
| PATCH  | `/blogs/update/:id` | Update blog                |
| DELETE | `/blogs/delete/:id` | Delete blog                |

---

# Installation Guide

# 1. Clone Repository

```bash
git clone https://github.com/Aniket-Roy22/Full-Stack-Blog-with-Auth.git
```

---

# 2. Backend Setup

```bash
cd server
npm install
```

---

# 3. Configure Environment Variables

Create a `.env` file inside `server/`

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/blogdb"

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

---

# 4. Run Prisma Migration

```bash
npx prisma migrate dev
```

---

# 5. Start Backend Server

```bash
npm run dev
```

Server runs on:

```text
http://localhost:3000
```

---

# 6. Frontend Setup

```bash
cd client
npm install
```

---

# 7. Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Frontend Architecture

## Context API

Authentication state is globally managed using:

```text
AuthContext
```

---

## Axios Interceptors

Axios automatically:

- attaches access tokens
- refreshes expired tokens
- retries failed requests

---

## Protected Routes

Protected pages require valid authentication before rendering.

---

# Security Features

## Password Hashing

Passwords are securely hashed using:

```text
bcrypt
```

---

## JWT Authentication

- Access tokens for authorization
- Refresh tokens for persistent sessions

---

## HTTP-Only Cookies

Refresh tokens are stored securely using HTTP-only cookies.

---

## Authorization Checks

Users can only:

- edit their own posts
- delete their own posts

---

# Screenshots

## Home Page

![Home Page](/screenshots/home.png)

---

## Login Page

![Login Page](./screenshots/login.png)

---

## Single Blog View

![Single Blog](./screenshots/single-blog.png)

---

# Learning Outcomes

This project demonstrates:

- Full Stack Web Development
- REST API Design
- JWT Authentication
- Token Refresh Logic
- Protected Backend Routes
- React State Management
- Axios Interceptors
- PostgreSQL Relationships
- Prisma ORM Usage
- Authentication & Authorization
- CRUD Operations
- Context API
- Responsive UI Design

---

# Author

**Intern ID:** CITS730
**Full Name:** Aniket Roy
**No. of Weeks:** 4
**Project Name:** Full-Stack Blog With Auth
**Project Scope:** The project aims to build a full-stack blog platform with secure authentication and blog CRUD functionality. Users can register, log in, create posts, edit/delete their own blogs, and browse blogs from other users. The project demonstrates frontend-backend integration using React, Express.js, Prisma, PostgreSQL, and JWT authentication.