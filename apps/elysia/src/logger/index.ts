import pino from "pino";

function createPinoLogger() {
  return pino();
}

export const logger = createPinoLogger();
