import { RouteOptions } from "fastify";

export const homePageRoute: RouteOptions = {
  method: "GET",
  url: "/",
  handler: (_, reply) => {
    reply.view("home.pug", {
      title: "File Shared",
      header: "It's best file shared in the world!",
    });
  },
};
