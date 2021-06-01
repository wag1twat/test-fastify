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
exports.getFolderRoute = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
const errors_1 = require("../errors");
exports.getFolderRoute = {
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
    preHandler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () { }),
    handler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const dir = `${config_1.default.rootDir}${request.query.path}`;
        if (typeof request.query.path !== "string") {
            return reply
                .status(404)
                .send(errors_1.InvalidParamsError({ query: request.query }));
        }
        try {
            const result = fs_1.default.readdirSync(dir, { withFileTypes: true });
            return reply.status(200).send({ result });
        }
        catch (err) {
            return reply.status(404).send(err);
        }
    }),
};
//# sourceMappingURL=getFolderRoute.js.map