import Route from "./Route";
import RouteRecipe from "./routeRecipe/RouteRecipe";
import RouteIndex from "./RouteIndex";
import RouteRandomRecipe from "./routeRandomRecipe/RouteRandomRecipe";
import { Router } from "express";
import Database from "src/database/Database";
import HTTPRequest from "./http/HTTPRequest";

class RouteManager {
  public router: Router = Router();
  private _db: Database;

  routes: { [key: string]: Route };

  /**
   * Add all handler for all routes
   * @param db Instance of Database connected
   */
  public async init(db: Database) {
    this._db = db;

    this._setRoutes();

    for (const routeKey in this.routes) {
      console.log(routeKey);
      this.router.get(routeKey, (req, res) => {
        const request = new HTTPRequest(req, res, this.routes[routeKey]);
        request.handleRequest();
      });
    }
  }

  private _setRoutes() {
    this.routes = {
      "/": new RouteIndex(this._db),
      "/recipe/:id": new RouteRecipe(this._db),
      "/recipe/random": new RouteRandomRecipe(this._db),
    };
  }
}

export default RouteManager;