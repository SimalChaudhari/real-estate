import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToMongoDB from './config/db.config';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
// import propertyRoutes from './routes/property.routes';
import propertyListingRoutes from './routes/properties.routes';
import agentRoutes from './routes/agent.routes';
import locationRoutes from './routes/location.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Enable CORS
app.use(
  cors({
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' })); // JSON body ke liye 50MB ka limit set karein
app.use(express.urlencoded({ limit: '50mb', extended: true })); // URL encoded data ke liye bhi limit set karein


app.use(express.json());

// Connect to the database
connectToMongoDB();

// Route registration
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/properties-listing', propertyListingRoutes);
app.use('/api/agent', agentRoutes);

app.use(errorHandler);

// // Catch invalid routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route not found' });
});

// // Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: err.stack, // Always include the stack trace
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
