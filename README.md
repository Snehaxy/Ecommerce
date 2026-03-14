# E-Commerce Platform

A full-stack e-commerce application built with React and Node.js.

## Features

- User authentication (JWT)
- Product catalog with categories
- Shopping cart functionality
- Order management with stock tracking
- Admin panel for product management
- Responsive design

## Tech Stack

### Frontend
- React 18
- React Router
- Axios for API calls
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing

## Live Demo

[Your Live URL Here] - *Deployed on Render/Vercel*

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

3. Set up environment variables:
   - Backend: Copy `.env.example` to `.env`
   - Frontend: Copy `.env.example` to `.env`

4. Start the development servers:
   ```bash
   # Backend (port 5000)
   cd backend
   npm run dev
   
   # Frontend (port 3000)
   cd frontend
   npm start
   ```

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/products` - Get all products
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

## Deployment

### Backend (Render)
1. Connect GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy automatically on push to main branch

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set `REACT_APP_API_URL` environment variable
3. Deploy automatically on push to main branch

## Database

MongoDB Atlas cloud database with collections:
- Users (authentication data)
- Products (catalog with stock tracking)
- Orders (order history and management)

## Contributing

This project was built as a demonstration of full-stack development skills including:
- RESTful API design
- Database modeling and relationships
- Authentication and authorization
- State management in React
- Responsive UI/UX design

## License

MIT License
