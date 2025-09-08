# E-Commerce Web Application

## Overview
This is a full-stack e-commerce web application built as part of an internship assignment. It includes a backend for managing users, products, and carts, and a frontend for a user-friendly interface. The project showcases skills in Node.js, React, MongoDB, and modern web development practices.

- Technologies Used:
  - Backend: Node.js, Express, MongoDB (via Mongoose), JSON Web Token (JWT), bcryptjs, cors, dotenv
  - Frontend: React.js, Axios, React Router, Bootstrap, JWT-decode

## Project Structure
- ecommerce-backend: Contains the server-side code with APIs for authentication, product management, and cart functionality.
- ecommerce-frontend: Contains the client-side code with React components for Signup, Login, Product Listing, and Cart.

## Features
- Backend:
  - User Signup and Login with JWT authentication.
  - CRUD operations for products (Create, Read, Update, Delete).
  - Cart management (Add, Remove, View items) with user-specific persistence.
- Frontend:
  - User-friendly Signup and Login pages.
  - Product listing with filters (price and category).
  - Add to Cart and Remove from Cart functionality.
  - Responsive design with Bootstrap.

## API Endpoints
| Method | Endpoint         | Description                  | Authentication Required? |
|--------|------------------|-------------------------------|--------------------------|
| POST   | /api/auth/signup | Register a new user           | No                       |
| POST   | /api/auth/login  | Login and get JWT token       | No                       |
| GET    | /api/items       | Get all items (with filters)  | No                       |
| POST   | /api/items       | Add a new item                | No                       |
| PUT    | /api/items/:id   | Update an item                | No                       |
| DELETE | /api/items/:id   | Delete an item                | No                       |
| GET    | /api/cart        | View user's cart              | Yes (JWT Token)          |
| POST   | /api/cart/add    | Add item to cart              | Yes (JWT Token)          |
| POST   | /api/cart/remove | Remove item from cart         | Yes (JWT Token)          |

## Prerequisites
- Node.js (LTS version)
- npm (comes with Node.js)
- MongoDB Atlas (or local MongoDB instance)
- Git installed

## Installation

### Backend Setup
1. Navigate to the backend folder:
   cd ecommerce-backend

### Install Dependencies:
   npm install

### Start the Server:
   node server.js

### Frontend Setup:
Navigate to the frontend folder:
   cd ecommerce-frontend
   
### Install dependencies:
   npm install
   
### Start the application:
   npm start
  
App will run on http://localhost:3000.

