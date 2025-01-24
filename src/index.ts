import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swagger';
import { db } from './config/database'; // Database setup
import filterRoutes from './routes/filters'; // Filter Routes

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/filters', filterRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error Handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error('Error stack:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  },
);

// Server Start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});