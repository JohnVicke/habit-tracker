import * as path from "path";
import * as url from "url";
import type { CodegenConfig } from "@graphql-codegen/cli";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const SHARED_CLIENT_GEN_PATH = path.join(__dirname, "./client/");
const GRAPHQL_SERVER_GEN_PATH = path.join(
  __dirname,
  "../../apps/apollo/src/gql/generated.ts",
);
const CLIENT_APPS_DOCUMENTS_PATH = path.join(
  __dirname,
  "../../apps/expo/**/*.tsx",
);

const schema = {
  overwrite: true,
  ignoreNoDocuments: true,
  schema: path.join(__dirname, "./schema.graphql"),
  documents: CLIENT_APPS_DOCUMENTS_PATH,
  emitLegacyCommonJSImports: true,
  generates: {
    [GRAPHQL_SERVER_GEN_PATH]: {
      config: {
        useIndexSignature: true,
      },
      plugins: [
        { typescript: { enumsAsConst: true } },
        "typescript-resolvers",
        {
          add: {
            content: ["/* eslint-disable */", "// @ts-nocheck"],
          },
        },
      ],
    },
    [SHARED_CLIENT_GEN_PATH]: {
      preset: "client",
      config: {
        enumsAsTypes: true,
      },
      plugins: [
        {
          add: {
            content: ["/* eslint-disable */", "// @ts-nocheck"],
          },
        },
      ],
    },
  },
} satisfies CodegenConfig;

export default schema;
