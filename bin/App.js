"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const RouteManager_1 = require("./routers/RouteManager");
const Database_1 = require("./database/Database");
class App {
    constructor() {
        this.app = express();
        this._routeManager = new RouteManager_1.default("/");
    }
    async init() {
        dotenv.config();
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this._database = await this.initDatabase();
        this._routeManager.init(this._database);
        console.log(this.app.routes);
        this.app.listen(process.env.PORT ?? 3000, () => this.onListening());
    }
    initDatabase() {
        return new Database_1.default().init();
    }
    onListening() {
        console.log("Server started");
        console.log("Listening on port", process.env.PORT ?? 3000);
    }
}
let instance = new App();
instance.init();
exports.default = App;
//# sourceMappingURL=App.js.map