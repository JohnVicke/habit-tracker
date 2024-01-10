import pino from "pino";

const pinoInstance = pino({
  transport:
    process.env.NODE_ENV !== "developement"
      ? undefined
      : {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
});

export const logger = pinoInstance;
