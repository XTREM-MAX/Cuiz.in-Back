"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = require("./Route");
class RouteIndex extends Route_1.default {
    async handle(request, response) {
        this.jsonResponse({ welcome_message: "Welcome to API XTREM MAX" });
    }
}
exports.default = RouteIndex;
//# sourceMappingURL=RouteIndex.js.map