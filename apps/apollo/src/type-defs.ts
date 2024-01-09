import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import schemaPath from "@ht/api/schema.graphql";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const typeDefs = await readFile(
  path.join(__dirname, schemaPath as unknown as string),
  "utf-8",
);
