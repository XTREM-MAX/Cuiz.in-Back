"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RouteRecipe_1 = require("./RouteRecipe");
const RouteIndex_1 = require("./RouteIndex");
const path = require("path");
const express_1 = require("express");
class RouteManager {
    constructor(mainRoute) {
        this.mainRoute = mainRoute;
        this.router = express_1.Router();
    }
    /**
     * Add all handler for all routes
     * @param db Instance of Database connected
     */
    init(db) {
        this._db = db;
        this._setRoutes();
        for (const routeKey in this.routes) {
            this.router.get(path.join(this.mainRoute, routeKey), this.routes[routeKey].handle);
        }
    }
    _setRoutes() {
        this.routes = {
            "/": new RouteIndex_1.default(this._db),
            "recipe/:id": new RouteRecipe_1.default(this._db),
        };
    }
}
exports.default = RouteManager;
//# sourceMappingURL=RouteManager.js.map