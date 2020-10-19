"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = require("./Route");
class RouteRecipe extends Route_1.default {
    async handle(request, response) {
        const payload = await this._db.getAllLikedRecipes();
        response.json(payload);
    }
}
exports.default = RouteRecipe;
//# sourceMappingURL=RouteRecipe.js.map