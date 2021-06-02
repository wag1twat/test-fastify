import { RouteOptions, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import * as fs from "fs";
import { IncomingMessage, Server } from "http";
import { InvalidParamsError } from "../errors";

interface Req
  extends FastifyRequest<RouteGenericInterface, Server, IncomingMessage> {
  body: {
    source: string;
    dest: string;
  };
}

export const copyFileRoute: RouteOptions = {
  method: "POST",
  url: "/file/copy",
  schema: {
    body: {
      source: { type: "string" },
      dest: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          result: { type: "boolean" },
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
  handler: async ({ body: { source, dest } }: Req, reply) => {
    if (typeof source !== "string" || typeof dest !== "string") {
      return reply.status(404).send(InvalidParamsError({ source, dest }));
    }

    if (source.toLowerCase() === dest.toLowerCase()) {
      return reply.status(404).send(InvalidParamsError({ source, dest }));
    }

    try {
      fs.accessSync(source);

      const src = fs.createReadStream(source);
      const dt = fs.createWriteStream(dest);

      src.pipe(dt);

      src.on("error", (err) => {
        reply.status(404).send({
          code: err.name,
          message: err.message,
        });
      });

      src.on("end", () => {
        reply.status(200).send({ result: true });
      });
    } catch (e) {
      return reply.status(404).send(e);
    }
  },
};
