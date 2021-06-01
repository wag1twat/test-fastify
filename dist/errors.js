"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomethingError = exports.NoSuchFileError = exports.InvalidParamsError = void 0;
const InvalidParamsError = (body) => {
    return {
        code: "INVALID_PARAMS",
        message: "Invalid params",
        body,
    };
};
exports.InvalidParamsError = InvalidParamsError;
const NoSuchFileError = (source) => {
    return {
        code: "NO_SUCH",
        message: `ENOENT: no such file or directory, open '${source}'`,
    };
};
exports.NoSuchFileError = NoSuchFileError;
const SomethingError = () => {
    return {
        code: "SOMETHING",
        message: "Something wrong",
    };
};
exports.SomethingError = SomethingError;
//# sourceMappingURL=errors.js.map