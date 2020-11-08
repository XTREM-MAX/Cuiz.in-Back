import Route from "./Route";
import RouteIndex from "./RouteIndex";
import { Router } from "express";
import Database from "src/database/Database";
import HTTPRequest from "./http/HTTPRequest";

import RouteSearchRecipe from "./recipe/routeSearchRecipe/RouteSearchRecipe";
import RouteAddLikedRecipe from "./recipe/routeAddLikedRecipe/RouteAddLikedRecipe";
import RouteRemoveLikedRecipe from "./recipe/routeRemoveLikedRecipe/routeRemoveLikedRecipe";
import RouteGetAllLikedRecipes from "./recipe/routeGetAllLikedRecipes/RouteGetAllLikedRecipes";
import RouteGetLikedRecipeDetails from "./recipe/routeGetRecipeDetails/routeGetRecipeDetails";
import RouteGetLikedRecipe from "./recipe/routeGetLikedRecipe/RouteGetLikedRecipe";
import RouteRandomRecipe from "./recipe/routeRandomRecipe/RouteRandomRecipe";

import RouteRegister from "./user/routeRegister/RouteRegister";

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
			"/user/register": new RouteRegister(this._db),
			"/recipe/search": new RouteSearchRecipe(this._db),
			"/recipe/add": new RouteAddLikedRecipe(this._db),
		};
	}
}

export default RouteManager;