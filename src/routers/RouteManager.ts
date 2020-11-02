import Route from "./Route";
import RouteGetLikedRecipe from "./routeGetLikedRecipe/RouteGetLikedRecipe";
import RouteIndex from "./RouteIndex";
import RouteRandomRecipe from "./routeRandomRecipe/RouteRandomRecipe";
import { Router } from "express";
import Database from "src/database/Database";
import HTTPRequest from "./http/HTTPRequest";

import RouteSearchRecipe from "./routeSearchRecipe/RouteSearchRecipe";
import RouteAddLikedRecipe from "./routeAddLikedRecipe/RouteAddLikedRecipe";
import RouteRemoveLikedRecipe from "./routeRemoveLikedRecipe/routeRemoveLikedRecipe";
import RouteGetAllLikedRecipes from "./routeGetAllLikedRecipes/RouteGetAllLikedRecipes";
import RouteGetLikedRecipeDetails from "./routeGetRecipeDetails/routeGetRecipeDetails";

class RouteManager {
  public router: Router = Router();
  private _db: Database;

  private _getRoutes: { [key: string]: Route };
  private _postRoutes: { [key: string]: Route };
  /**
   * Add all handler for all _getRoutes
   * @param db Instance of Database connected
   */
  public async init(db: Database) {
    this._db = db;

    this._setRoutes();

    for (const routeKey in this._getRoutes) {
      console.log("GET", routeKey);
      this.router.get(routeKey, (req, res) => {
        const request = new HTTPRequest(req, res, this._getRoutes[routeKey]);
        request.handleRequest();
      });
    }

    for (const routeKey in this._postRoutes) {
      console.log("POST", routeKey);
      this.router.post(routeKey, (req, res) => {
        const request = new HTTPRequest(req, res, this._postRoutes[routeKey]);
        request.handleRequest();
      });
    }
  }

  private _setRoutes() {
    this._getRoutes = {
      "/": new RouteIndex(this._db),
      "/recipe/random": new RouteRandomRecipe(this._db),
      "/recipe/all": new RouteGetAllLikedRecipes(this._db),
      "/recipe/:id": new RouteGetLikedRecipe(this._db),
      "/recipe/:id/details": new RouteGetLikedRecipeDetails(this._db),
      "/recipe/:id/remove": new RouteRemoveLikedRecipe(this._db),
    };
    this._postRoutes = {
      "/recipe/search": new RouteSearchRecipe(this._db),
      "/recipe/add": new RouteAddLikedRecipe(this._db),
    };
  }
}

export default RouteManager;