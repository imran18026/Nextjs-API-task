Task 1:
..........................
Next.js API with JWT Authentication & MongoDB

This project is a simple API built using Next.js (App Router) with TypeScript, Mongoose (MongoDB), and JWT authentication.

Features

✅ User Management API

GET /api/users - Fetch all users (Protected)

POST /api/users - Add a new user

GET /api/users/:id - Fetch a single user by ID (Protected)

✅ Authentication

POST /api/auth/login - Authenticate and get a JWT token

Middleware to protect routes

🚀 Getting Started

1️⃣ Clone the Repository

git clone <repository_link>
cd <repository_name>

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env.local file in the root directory and add the following:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Run the Development Server

npm run dev

The API will be available at http://localhost:3000/api/users

📌 API Endpoints

🔹 User Management

1️⃣ Create a New User

POST /api/users

Body:

{
"name": "John Doe",
"email": "john@example.com",
"password": "123456"
}

2️⃣ Get All Users (Protected)

GET /api/users

Headers:

{
"Authorization": "Bearer YOUR_JWT_TOKEN"
}

3️⃣ Get User by ID (Protected)

GET /api/users/{userId}

🔹 Authentication

1️⃣ Login

POST /api/auth/login

Body:

{
"email": "john@example.com",
"password": "123456"
}

Response:

{
"token": "your_generated_jwt_token"
}

Use this token in the Authorization header to access protected routes.

🛠 Technologies Used

Next.js 14 (App Router)

TypeScript

MongoDB & Mongoose

JWT Authentication

Bcrypt for Password Hashing

📜 License

This project is licensed under the MIT License.

📝 Notes

Ensure MongoDB is running before starting the server.

Use Postman or cURL to test API routes.
