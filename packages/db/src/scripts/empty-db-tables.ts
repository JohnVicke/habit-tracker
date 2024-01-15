import type { SQL } from "..";
import { db, sql } from "..";

async function emptyDbTables() {
  console.log("Emptying database tables");
  const schema = db._.schema;
  if (!schema) {
    throw new Error("new schema found");
  }

  const queries = Object.values(schema).map((table) => {
    console.log(`Preparing delete query for table: ${table.dbName}`);
    return sql.raw(`DELETE FROM ${table.dbName}`);
  });

  console.log("Sending delete queries");

  await db.transaction(async (trx) => {
    await Promise.all(queries.map((query: SQL) => trx.run(query)));
  });
}

await emptyDbTables();
