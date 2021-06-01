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
exports.moveFileRoute = void 0;
const fs_1 = __importDefault(require("fs"));
const errors_1 = require("../errors");
exports.moveFileRoute = {
    method: "POST",
    url: "/file/move",
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
    preHandler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () { }),
    handler: ({ body: { source, dest } }, reply) => __awaiter(void 0, void 0, void 0, function* () {
        if (typeof source !== "string" || typeof dest !== "string") {
            return reply.status(404).send(errors_1.InvalidParamsError({ source, dest }));
        }
        if (source.toLowerCase() === dest.toLowerCase()) {
            return reply.status(404).send(errors_1.InvalidParamsError({ source, dest }));
        }
        try {
            fs_1.default.accessSync(source);
            const src = fs_1.default.createReadStream(source);
            const dt = fs_1.default.createWriteStream(dest);
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
            src.on("close", () => {
                fs_1.default.unlinkSync(source);
            });
            return reply.status(200).send({ result: true });
        }
        catch (e) {
            return reply.status(404).send(e);
        }
    }),
};
//# sourceMappingURL=moveFileRoute.js.map