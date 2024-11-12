import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './config/dbConfig';
import propertyRoutes from './routes/propertyRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// Connect to the database
connectToMongoDB();

// Define routes
app.use('/api/properties', propertyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
