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
exports.getFilesRoute = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
exports.getFilesRoute = {
    method: "GET",
    url: "/folder",
    schema: {
        // request needs to have a querystring with a `name` parameter
        querystring: {
            path: { type: "string" },
        },
        // the response needs to be an object with an `hello` property of type 'string'
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
    // this function is executed for every request before the handler is executed
    preHandler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () { }),
    handler: (request, reply) => {
        const dir = `${config_1.default.rootDir}${request.query.path}`;
        return fs_1.default.readdir(dir, { withFileTypes: true }, (err, result) => {
            if (err) {
                return reply.status(404).send({
                    code: err.code,
                    message: err.message,
                });
            }
            return reply.status(200).send({ result });
        });
    },
};
//# sourceMappingURL=getFilesRoute.js.map