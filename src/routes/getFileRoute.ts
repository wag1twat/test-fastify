import { RouteOptions, FastifyRequest } from "fastify";
import mime from "mime-types";
import { RouteGenericInterface } from "fastify/types/route";
import * as fs from "fs";
import path from "path";
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
      // const result = fs.createReadStream(request.query.path, {
      //   encoding: "utf8",
      // });

      fs.readFile(request.query.path, (err, fileBuffer) => {
        const base = path.basename(request.query.path);
        const mimeType = mime.lookup(base);
        reply
          .headers({
            "Content-Type": mimeType,
            "Content-Disposition": `attachment; filename="${base}"`,
          })
          .send(err || fileBuffer);
      });

      // const base = path.basename(request.query.path);

      // const parse = path.parse(base);

      // const mimeType = mime.lookup(base);

      // return reply
      //   .headers({
      //     "Content-Type": mimeType,
      //     "Content-Disposition": `attachment; filename="${parse.name}${parse.ext}"`,
      //   })
      //   .send(result);
    } catch (err) {
      return reply.status(404).send(err);
    }
  },
};
