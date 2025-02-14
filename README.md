# Task 1 and 2 Combined:

# Next.js API with JWT Authentication, Webhooks & MongoDB

This project is a simple API built using **Next.js (App Router)** with **TypeScript**, **Mongoose (MongoDB)**, **JWT authentication**, and **Webhook processing**.

## Features

✅ **User Management API**

- `GET /api/users` - Fetch all users (Protected)
- `POST /api/users` - Add a new user
- `GET /api/users/:id` - Fetch a single user by ID (Protected)

✅ **Authentication**

- `POST /api/auth/login` - Authenticate and get a JWT token
- Middleware to protect routes

✅ **Webhook Implementation**

- `POST /api/webhook` - Process incoming webhooks with signature verification

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone <repository_link>
cd <repository_name>
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
WEBHOOK_SECRET=your_webhook_secret
```

### 4️⃣ Run the Development Server

```sh
npm run dev
```

The API will be available at `http://localhost:3000/api/users`

---

## 📌 API Endpoints

### **🔹 User Management**

#### **1️⃣ Create a New User**

```http
POST /api/users
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### **2️⃣ Get All Users (Protected)**

```http
GET /api/users
```

**Headers:**

```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

#### **3️⃣ Get User by ID (Protected)**

```http
GET /api/users/{userId}
```

---

### **🔹 Authentication**

#### **1️⃣ Login**

```http
POST /api/auth/login
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "your_generated_jwt_token"
}
```

Use this token in the `Authorization` header to access protected routes.

---

### **🔹 Webhook Implementation**

#### **1️⃣ Process Webhook Request**

```http
POST /api/webhook
```

**Headers:**

```json
// node generatedSignature.js ; run this command for generatedSignature
{
  "x-signature": "generated_signature"
}
```

**Body:**

```json
{
  "eventType": "user.created",
  "data": {
    "email": "john@example.com"
  }
}
```

**Response:**

1. success response

```json
{
  "success": true,
  "message": "Received"
}
```

2. Failed response

```json
{
  "success": false,
  "message": "Invalid signature"
}
```

---

## 🛠 Technologies Used

- **Next.js 15 (App Router)**
- **TypeScript**
- **MongoDB & Mongoose**
- **JWT Authentication**
- **Bcrypt for Password Hashing**
- **Webhook Signature Verification**
- **File Storage (db.json)**

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📝 Notes

- Ensure MongoDB is running before starting the server.
- Use Postman or cURL to test API routes.
- Webhook signatures should be verified using `WEBHOOK_SECRET`.

---
