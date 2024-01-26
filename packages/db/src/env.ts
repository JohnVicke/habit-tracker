const DB_CONNECTION_TYPE = process.env.DB_CONNECTION_TYPE;
const DB_AUTH_TOKEN = process.env.DB_AUTH_TOKEN;
const DB_URL = process.env.DB_URL;

const envObj = { DB_CONNECTION_TYPE, DB_AUTH_TOKEN, DB_URL };

export const env = envObj as Env;

export interface Env {
  DB_CONNECTION_TYPE: "local" | "local-replica" | "remote";
  DB_AUTH_TOKEN: string;
  DB_URL: string;
}
