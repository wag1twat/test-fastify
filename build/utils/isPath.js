"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPath = void 0;
var isPath = function (path) {
    return new RegExp(/((\/)[a-zA-Z0-9\s_@\-^!#$%&+={}\[\]]+)+\.?[a-zA-Z]+$/g).test(path);
};
exports.isPath = isPath;
//# sourceMappingURL=isPath.js.map