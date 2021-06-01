import { RouteOptions, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import fs from "fs";
import { IncomingMessage, Server } from "http";
import { InvalidParamsError } from "../errors";
import { isPath } from "../utils";

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
  preHandler: async (request: Req, reply) => {
    if (!isPath(request.query.path)) {
      return reply
        .status(404)
        .send(
          InvalidParamsError(JSON.stringify({ query: request.query.path }))
        );
    }
  },
  handler: async (request: Req, reply) => {
    try {
      const result = fs.readdirSync(request.query.path, {
        withFileTypes: true,
      });

      return reply.status(200).send({ result });
    } catch (err) {
      return reply.status(404).send(err);
    }
  },
};
