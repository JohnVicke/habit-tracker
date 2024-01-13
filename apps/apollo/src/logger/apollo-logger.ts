/* eslint-disable @typescript-eslint/require-await */
import type { ApolloServerPlugin } from "@apollo/server";

import type { Context } from "../context";
import { logger } from ".";

interface ApolloLoggerOptions {
  ignoredPaths?: string[];
}

export const createApolloLogger = (
  opts?: ApolloLoggerOptions,
): ApolloServerPlugin<Context> => {
  return {
    async requestDidStart({ request, operationName }) {
      const operationId = crypto.randomUUID();
      if (
        request.operationName &&
        !opts?.ignoredPaths?.includes(request.operationName)
      ) {
        const query = request.query?.replace(/\n/g, "");
        const variables = Object.keys(request.variables ?? {});
        // logger.info({
        //   operationId,
        //   event: "request",
        //   name: operationName,
        //   query,
        //   variables,
        // });
      }

      return {
        async willSendResponse(requestContext) {
          // logger.info({
          //   operationId,
          //   response: requestContext.response,
          // });
        },
      };
    },
  };
};
