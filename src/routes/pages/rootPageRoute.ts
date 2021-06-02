import { RouteOptions } from "fastify";

export const rootPageRoute: RouteOptions = {
  method: "GET",
  url: "/",
  handler: (_, reply) => {
    reply.view("index.pug", {
      title: "File Shared",
      header: "It's best file shared in the world!",
    });
  },
};
