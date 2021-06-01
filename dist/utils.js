"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObjectError = exports.SomethingError = void 0;
const fastify_error_1 = __importDefault(require("fastify-error"));
exports.SomethingError = fastify_error_1.default("SOMETING_WRONG", "Sorry, something wrong...");
const createObjectError = (err) => {
    if (err) {
        if (err.code && err.message) {
            return {
                code: err.code,
                message: err.message,
            };
        }
        const { code, message } = new exports.SomethingError();
        return {
            code,
            message,
        };
    }
    return null;
};
exports.createObjectError = createObjectError;
//# sourceMappingURL=utils.js.map