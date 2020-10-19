import Route from "./Route";
import RouteRecipe from "./RouteRecipe";
import RouteIndex from "./RouteIndex";
import * as path from "path";
import { Router } from "express";
import Database from "src/database/Database";

class RouteManager {
  public router: Router = Router();
  private _db: Database;

  routes: { [key: string]: Route };

  constructor(
    public readonly mainRoute: string,
  ) {}

  /**
   * Add all handler for all routes
   * @param db Instance of Database connected
   */
  public init(db: Database) {
    this._db = db;

    this._setRoutes();

    for (const routeKey in this.routes) {
      this.router.get(path.join(this.mainRoute, routeKey), this.routes[routeKey].handle);    
    }
  }

  private _setRoutes() {
    this.routes = {
      "/": new RouteIndex(this._db),
      "recipe/:id": new RouteRecipe(this._db),
    };
  }
}

export default RouteManager;