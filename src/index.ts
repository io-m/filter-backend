import express from 'express';
import cors from 'cors';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';
import * as schema from './db/schema';
import { db } from './config/database';
import { FilterRepository } from './repositories/filterRepository';
import { FilterHandler } from './handlers/filterHandler';
import { createFilterRouter } from './routes/filters';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swagger';

const app = express();
const port = process.env.PORT || 3001;

// Database setup
// const sqlite = new Database(path.join(__dirname, '../sqlite/database.db'));
// const db = drizzle(sqlite, { schema });

// Repositories - passing db instance as dependency (think about that approach)
const filterRepository = new FilterRepository(db);

// Handlers
const filterHandler = new FilterHandler(filterRepository);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/filters', createFilterRouter(filterHandler));
// Error handling
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  },
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
