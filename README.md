# 👕 Clothing Swap Marketplace

A full-stack MERN application that enables users to exchange clothing items instead of buying new ones, encouraging sustainable fashion and reducing textile waste.

---

## 🚀 Tech Stack

### Frontend
- React.js

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT (JSON Web Token)
- Bcrypt.js

### Image Storage
- Cloudinary
- Multer

---

## ✨ Features Implemented

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### 👕 Clothing Module
- Add Clothing Item
- Upload Images to Cloudinary
- Get All Clothing Items
- Get Single Clothing Item
- Update Clothing Item
- Delete Clothing Item

### 🔄 Swap Module
- Create Swap Request
- View Swap Requests
- Accept Swap Request
- Reject Swap Request

### 📊 Dashboard
- Total Clothing Uploaded
- Swap Requests Sent
- Swap Requests Received
- Pending Swaps
- Accepted Swaps
- Rejected Swaps

---

## 📂 Project Structure

```
clothing-swap-marketplace
│
├── frontend
└── backend
```

---

## 🛠 Backend APIs

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Clothing
- POST /api/clothing
- GET /api/clothing
- GET /api/clothing/:id
- PUT /api/clothing/:id
- DELETE /api/clothing/:id

### Swaps
- POST /api/swaps
- GET /api/swaps
- PUT /api/swaps/:id/accept
- PUT /api/swaps/:id/reject

### Dashboard
- GET /api/dashboard

---

## 📅 Current Progress

- ✅ Backend Architecture
- ✅ MongoDB Integration
- ✅ JWT Authentication
- ✅ Clothing CRUD APIs
- ✅ Cloudinary Image Upload
- ✅ Swap Request Module
- ✅ Dashboard API

---

## 🚧 Upcoming Features

- React Frontend
- User Profile
- Search & Filter
- Pagination
- Notifications
- Wishlist
- Admin Panel
- Deployment

---

## 👩‍💻 Author

**Nirmala Kola**

Building this project to strengthen my Full Stack MERN development skills through hands-on practice.
