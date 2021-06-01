"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomethingError = exports.NoSuchFileError = exports.InvalidParamsError = void 0;
var InvalidParamsError = function (body) {
    return {
        code: "INVALID_PARAMS",
        message: "Invalid params",
        body: body,
    };
};
exports.InvalidParamsError = InvalidParamsError;
var NoSuchFileError = function (source) {
    return {
        code: "NO_SUCH",
        message: "ENOENT: no such file or directory, open '" + source + "'",
    };
};
exports.NoSuchFileError = NoSuchFileError;
var SomethingError = function () {
    return {
        code: "SOMETHING",
        message: "Something wrong",
    };
};
exports.SomethingError = SomethingError;
//# sourceMappingURL=errors.js.map