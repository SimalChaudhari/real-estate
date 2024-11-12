import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './config/db.config';
import propertyRoutes from './routes/property.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Connect to the database
connectToMongoDB();

// Define routes
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
