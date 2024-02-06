# Project Name

H2Ometer Backend

## Description

This project serves as the backend for the H2Ometer application. It is responsible for handling user registration, water intake data, and user profile updates.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- bcrypt for password hashing
- Swagger for API documentation
- Cloudinary
- NanoId

## System Requirements

- Node.js (v14.0.0 or higher)
- MongoDB (v4.0 or higher)

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Jarevych/H2Ometer_back

1. Install dependencies:
cd h2ometer-backend
npm install

2. Set up environment variables:

Create a .env file in the root of the project and define the following variables:
PROJECT_NAME='H2Ometer'
NODE_ENV=production
PORT=''
BASE_URL_FRONT=""
MONGO_URL=''
JWT_KEY=''
JWT_EXP=''
USER_UKRNET=''
UKRNET_PASSWORD=''
CLOUDINARY_NAME=''
CLOUDINARY_KEY=''
CLOUDINARY_SECRET=''

3.Run the application:
npm run dev

API Documentation
Swagger API documentation is available at:

[Swagger Documentation](https://h2ometer.onrender.com/api-docs/)


Developers
YAROSLAV GRABOVYCH - TeamLead BackEnd
OLEKSANDR FEDORENKO - BackEnd Developer
VITALII NEZHYVENKO - BackEnd Developer
YEVHEN LYBIN - BackEnd Developer