import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import clientRoutes from './src/client/client.routes.mjs';
import { connectDb } from './src/config/database.mjs';
import projectRoutes from './src/project/project.routes.mjs';
import taskRoutes from './src/task/task.routes.mjs';
import userRoutes from './src/user/user.routes.mjs';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RESTful API for managing Projects.',
      version: '1.0.0',
      description: 'API documentation for RESTful API for managing Projects.',
    },
  },
  apis: ['./routes/task/task.routes.mjs', './routes/user/user.routes.mjs'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

export const app = express();

app.listen(process.env.PORT || 6001, async error => {
  if (!error)
    console.info(
      'Server is Successfully Running, and App is listening on port ' +
        process.env.PORT || 6001
    );
  else console.error('Error occured, server can`t start!', error);
});

connectDb();

dotenv.config();

app.use(express.json());

const corsOptions = {
  origin: 'https://project-management-dashboard-iplr.onrender.com', // Your frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include cookies or other credentials if necessary
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', userRoutes, projectRoutes, taskRoutes, clientRoutes);
