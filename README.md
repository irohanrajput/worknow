# workNow - Full Stack Job Portal

workNow is a comprehensive job portal application that enables companies to post jobs and manage their listings. The platform provides a seamless experience for both employers and job seekers through a modern web interface backed by a robust API.

## 🔗 Quick Links
- [API Documentation](./server#api-endpoints)
- [Frontend Dir](./client)
- [Backend Dir](./server)

## Features

- 🏢 Company registration and profile management
- 💼 Job posting and management system
- 🔐 Secure authentication and authorization
- ✉️ Email verification system
- 📱 Responsive design for all devices
- 🔍 Advanced job search and filtering
- 📧 Email notifications for account activities

## Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer

## Project Structure
```
workNow/
├── client/               # Frontend application
│   ├── src/             # Source code
│   ├── public/          # Public assets
│   └── package.json     # Frontend dependencies
│
├── server/              # Backend application
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── package.json     # Backend dependencies
│
└── README.md            # This file
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/irohanrajput/workNow.git
cd workNow
```

2. Setup the backend:
```bash
cd server
npm install
cp .env.example .env  # Configure your environment variables(reference given below)
node server.js
```

3. Setup the frontend:
```bash
cd ../client
npm install
cp .env.example .env  # Configure your environment variables(reference given below)
npm run dev
```

4. Open http://localhost:3000 in your browser

## Environment Setup

### Backend (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_EMAIL_SECRET=your_email_verification_secret
JWT_LOGIN_SECRET=your_login_token_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=your_frontend_url
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Development

- Run backend in development mode: `cd server && npm run dev`
- Run frontend in development mode: `cd client && npm start`
- Run both concurrently: `npm run dev` (from root directory)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- Thanks to all contributors who have helped shape workNow
- Special thanks to the open-source community for the amazing tools that made this possible
