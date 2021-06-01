"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = fastify_1.default({ logger: true });
app.route(routes_1.getFolderRoute);
app.route(routes_1.getFileRoute);
app.route(routes_1.copyFileRoute);
app.route(routes_1.moveFileRoute);
const port = process.env.PORT;
const host = process.env.HOST;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app.listen(port, host);
        const info = app.server.address();
        if (typeof info === "object") {
            const { family, address, port } = info;
            return app.log.info(`Server up and running - protocol: ${family}, host: ${address}, port: ${port}`);
        }
        return app.log.info(`Server up and running - ${info}`);
    }
    catch (err) {
        app.log.error(err);
        return process.exit(1);
    }
});
start();
//# sourceMappingURL=app.js.map