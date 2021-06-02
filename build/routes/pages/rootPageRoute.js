"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootPageRoute = void 0;
exports.rootPageRoute = {
    method: "GET",
    url: "/",
    handler: function (_, reply) {
        reply.view("index.pug", {
            title: "File Shared",
            header: "It's best file shared in the world!",
        });
    },
};
//# sourceMappingURL=rootPageRoute.js.map