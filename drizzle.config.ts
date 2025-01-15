import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'sqlite',
  driver: 'libsql',
  dbCredentials: {
    url: './sqlite/database.db',
  },
} satisfies Config;
