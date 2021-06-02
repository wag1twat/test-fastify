import { RouteOptions, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import * as fs from "fs";
import { IncomingMessage, Server } from "http";
import { InvalidParamsError } from "../errors";
import { isPath } from "../utils";

interface Req
  extends FastifyRequest<RouteGenericInterface, Server, IncomingMessage> {
  query: {
    path: string;
  };
}

export const getFileRoute: RouteOptions = {
  method: "GET",
  url: "/file",
  schema: {
    querystring: {
      path: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          result: { isFileType: true },
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
        .send(InvalidParamsError({ query: request.query.path }));
    }
  },
  handler: async (request: Req, reply) => {
    try {
      const result = fs.readFileSync(request.query.path);

      return reply.status(200).send(result);
    } catch (err) {
      return reply.status(404).send(err);
    }
  },
};
