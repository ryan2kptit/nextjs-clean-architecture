import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { PostgresJsTransaction } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { sessions, todos, users } from './schema';

// Setup PostgreSQL database connection
const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema: { users, sessions, todos } });

// Setup lucia adapter
export const luciaAdapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

// Export Transaction type to be used in repositories
type Schema = {
  users: typeof users;
  sessions: typeof sessions;
  todos: typeof todos;
};
export type Transaction = PostgresJsTransaction<
  Schema,
  ExtractTablesWithRelations<Schema>
>;
