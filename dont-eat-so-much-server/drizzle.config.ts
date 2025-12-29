import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const getDatabaseUrl = () => {
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_HOST;
  const port = process.env.POSTGRES_PORT;
  const database = process.env.POSTGRES_DB;

  return `postgres://${user}:${password}@${host}:${port}/${database}`;
};

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
