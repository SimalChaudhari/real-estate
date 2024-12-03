import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './config/db.config';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import propertyRoutes from './routes/property.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Connect to the database
connectToMongoDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);  // Register user routes
app.use('/api/properties', propertyRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
