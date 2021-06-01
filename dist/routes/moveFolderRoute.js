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
exports.moveFolderRoute = void 0;
const fs_1 = __importDefault(require("fs"));
exports.moveFolderRoute = {
    method: "POST",
    url: "/folder/move",
    schema: {
        // request needs to have a querystring with a `name` parameter
        body: {
            source: { type: "string" },
            dest: { type: "string" },
        },
        // the response needs to be an object with an `hello` property of type 'string'
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
    // this function is executed for every request before the handler is executed
    preHandler: (request, reply) => __awaiter(void 0, void 0, void 0, function* () { }),
    handler: ({ body: { source, dest } }, reply) => {
        var _a, _b;
        try {
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
        }
        catch (err) {
            reply
                .status(404)
                .send({ code: (_a = err.code) !== null && _a !== void 0 ? _a : "", message: (_b = err.message) !== null && _b !== void 0 ? _b : "" });
        }
    },
};
//# sourceMappingURL=moveFolderRoute.js.map