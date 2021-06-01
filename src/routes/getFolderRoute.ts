import { RouteOptions, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import fs from "fs";
import { IncomingMessage, Server } from "http";
import config from "../config";
import { InvalidParamsError } from "../errors";

interface Req
  extends FastifyRequest<RouteGenericInterface, Server, IncomingMessage> {
  query: {
    path: string;
  };
}

export const getFolderRoute: RouteOptions = {
  method: "GET",
  url: "/folder",
  schema: {
    querystring: {
      path: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          result: { type: "array" },
        },
      },
      404: {
        type: "object",
        properties: {
          code: { type: "string" },
          message: { type: "string" },
        },
      },
    },
  },
  preHandler: async (request: Req, reply) => {},
  handler: async (request: Req, reply) => {
    const dir = `${config.rootDir}${request.query.path}`;

    if (typeof request.query.path !== "string") {
      return reply
        .status(404)
        .send(InvalidParamsError({ query: request.query }));
    }

    try {
      const result = fs.readdirSync(dir, { withFileTypes: true });

      return reply.status(200).send({ result });
    } catch (err) {
      return reply.status(404).send(err);
    }
  },
};
