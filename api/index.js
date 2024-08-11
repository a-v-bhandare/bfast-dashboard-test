import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import orderRoutes from './routes/order.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import User from './models/user.model.js';
import bcryptjs from 'bcryptjs';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(async() => {
    console.log('MongoDb is connected');
    const adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      const defaultAdmin = new User({
        username: 'admin',
        email: process.env.ADMIN_EMAIL, // Use environment variables for sensitive data
        password: bcryptjs.hashSync(process.env.ADMIN_PASSWORD, 10),
        isAdmin: true,
      });

      await defaultAdmin.save();
      console.log('Default admin user created');
    }
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
