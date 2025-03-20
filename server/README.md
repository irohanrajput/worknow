```
api_url=https://api.test.tushar.wiki/
```

# Jobs21 - Job Portal Backend API

This is the backend server for Jobs21, a full-stack job portal application that enables companies to post jobs and manage their listings. This repository contains the server-side implementation built with Node.js, Express, and MongoDB.

🔗 [Frontend Repository](https://github.com/irohanrajput/jobs21)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Authentication Routes](#authentication-routes)
  - [Job Routes](#job-routes)

## Features

- 🔐 JWT-based authentication
- ✉️ Email verification system
- 🏢 Company registration and management
- 💼 CRUD operations for job postings
- 🔒 Protected routes for authenticated companies
- 📧 Email notifications using Nodemailer
- 🗄️ MongoDB integration for data persistence

## Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Email Service:** Nodemailer
- **Other Tools:**
  - bcryptjs (Password hashing)
  - cors (Cross-origin resource sharing)
  - dotenv (Environment variables)

## Project Structure

```
server/
├── config/
│   └── db.js             # Database configuration
├── controllers/
│   ├── authController.js # Authentication logic
│   └── jobController.js  # Job management logic
├── middlewares/
│   └── authenticate.middleware.js # JWT authentication middleware
├── models/
│   ├── CompanyModel.js   # Company schema and model
│   └── JobModel.js       # Job schema and model
├── routes/
│   ├── authRoutes.js     # Authentication routes
│   └── jobRoutes.js      # Job management routes
├── utils/
│   └── emailService.js   # Email functionality
├── app.js               # Express app configuration
├── server.js            # Server entry point
├── package.json         # Project dependencies
└── package-lock.json   #lock file
```

## Setup

1. Clone the repository:
```bash
git clone https://github.com/irohanrajput/jobs21.git
cd jobs21/server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory and configure the environment variables.

4. Start the development server:
```bash
npm start
```

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_EMAIL_SECRET=your_email_verification_secret
JWT_LOGIN_SECRET=your_login_token_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=your_frontend_url
```

## Authentication

The API uses JWT (JSON Web Token) for authentication. Protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication Routes

#### Register Company
- **POST** `/api/auth/register`
- Creates a new company account
- **Request Body:**
  ```json
  {
    "name": "Company Name",
    "email": "company@example.com",
    "password": "securepassword",
    "phone": "1234567890"
  }
  ```
- **Response:** 201 Created
  ```json
  {
    "message": "Company registered. Please verify your email."
  }
  ```

#### Verify Email
- **GET** `/api/auth/verify-email/:id/:token`
- Verifies company email address
- **Response:** 200 OK
  ```json
  {
    "message": "Email verified successfully"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- Authenticates a company and returns access token
- **Request Body:**
  ```json
  {
    "email": "company@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** 200 OK
  ```json
  {
    "message": "logged in successfully",
    "accessToken": "jwt_token_here"
  }
  ```

### Job Routes

#### Create Job
- **POST** `/api/jobs`
- Creates a new job posting
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "title": "Job Title",
    "description": "Job Description",
    "experience": "beginner|intermediate|expert",
    "endDate": "2024-12-31"
  }
  ```
- **Response:** 201 Created
  ```json
  {
    "job": {
      "title": "Job Title",
      "description": "Job Description",
      "experience": "beginner",
      "endDate": "2024-12-31T00:00:00.000Z",
      "candidates": [],
      "company": "company_id",
      "_id": "job_id",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
  ```

#### Get All Jobs
- **GET** `/api/jobs`
- Retrieves all job postings
- **Authentication:** Not Required
- **Response:** 200 OK
  ```json
  {
    "jobs": [
      {
        "_id": "job_id",
        "title": "Job Title",
        "description": "Job Description",
        "experience": "beginner",
        "endDate": "2024-12-31T00:00:00.000Z",
        "candidates": [],
        "company": {
          "_id": "company_id",
          "name": "Company Name",
          "email": "company@example.com",
          "phone": "1234567890"
        }
      }
    ]
  }
  ```

#### Get Single Job
- **GET** `/api/jobs/:id`
- Retrieves a specific job posting
- **Authentication:** Not Required
- **Response:** 200 OK
  ```json
  {
    "job": {
      "_id": "job_id",
      "title": "Job Title",
      "description": "Job Description",
      "experience": "beginner",
      "endDate": "2024-12-31T00:00:00.000Z",
      "candidates": [],
      "company": {
        "_id": "company_id",
        "name": "Company Name",
        "email": "company@example.com",
        "phone": "1234567890"
      }
    }
  }
  ```

#### Update Job
- **PUT** `/api/jobs/:id`
- Updates a specific job posting
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "title": "Updated Job Title",
    "description": "Updated Job Description",
    "experience": "intermediate",
    "endDate": "2025-01-31"
  }
  ```
- **Response:** 200 OK
  ```json
  {
    "job": {
      "_id": "job_id",
      "title": "Updated Job Title",
      "description": "Updated Job Description",
      "experience": "intermediate",
      "endDate": "2025-01-31T00:00:00.000Z",
      "candidates": [],
      "company": "company_id"
    }
  }
  ```

#### Delete Job
- **DELETE** `/api/jobs/:id`
- Deletes a specific job posting
- **Authentication:** Required
- **Response:** 200 OK
  ```json
  {
    "message": "Job deleted successfully"
  }
  ```

## Error Responses

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request:** Invalid input or validation error
- **401 Unauthorized:** Missing or invalid authentication token
- **403 Forbidden:** Email not verified
- **404 Not Found:** Resource not found
- **500 Internal Server Error:** Server error

Example error response:
```json
{
  "message": "Error message here"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
