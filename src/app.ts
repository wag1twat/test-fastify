import Fastify, { FastifyInstance } from "fastify";
import fastifyStatic from "fastify-static";
import pointOfView from "point-of-view";
import pug from "pug";
import path from "path";
import dotenv from "dotenv";
import {
  getFileRoute,
  getFolderRoute,
  copyFileRoute,
  moveFileRoute,
  rootPageRoute,
} from "./routes";

const staticRoot = "public";

dotenv.config();

const app: FastifyInstance = Fastify({ logger: true });

app.register(fastifyStatic, {
  root: path.join(__dirname, staticRoot),
  prefixAvoidTrailingSlash: true,
});

app.register(pointOfView, {
  engine: {
    pug,
  },
  root: path.join(__dirname, staticRoot),
});

app.route(rootPageRoute);
app.route(getFolderRoute);
app.route(getFileRoute);
app.route(copyFileRoute);
app.route(moveFileRoute);

const port = process.env.PORT;

const host = process.env.HOST;

const start = async () => {
  try {
    await app.listen(port, host);

    const info = app.server.address();

    if (typeof info === "object") {
      const { family, address, port } = info;
      return app.log.info(
        `Server up and running - protocol: ${family}, host: ${address}, port: ${port}`
      );
    }

    return app.log.info(`Server up and running - ${info}`);
  } catch (err) {
    app.log.error(err);

    return process.exit(1);
  }
};

start();
