import Route from "./Route";
import RouteIndex from "./RouteIndex";
import { Request, Response, Router, RequestHandler } from "express";
import HTTPRequest from "./http/HTTPRequest";
import HTTPUserRequest from "./http/HTTPUserRequest";

import Logger from "../utils/Logger";
import Database from "../database/Database";

import RouteSearchRecipe from "./recipe/routeSearchRecipe/RouteSearchRecipe";
import RouteAddLikedRecipe from "./recipe/routeAddLikedRecipe/RouteAddLikedRecipe";
import RouteRemoveLikedRecipe from "./recipe/routeRemoveLikedRecipe/routeRemoveLikedRecipe";
import RouteGetAllLikedRecipes from "./recipe/routeGetAllLikedRecipes/RouteGetAllLikedRecipes";
import RouteGetLikedRecipeDetails from "./recipe/routeGetRecipeDetails/routeGetRecipeDetails";
import RouteGetLikedRecipe from "./recipe/routeGetLikedRecipe/RouteGetLikedRecipe";
import RouteRandomRecipe from "./recipe/routeRandomRecipe/RouteRandomRecipe";

import RouteRegister from "./user/routeRegister/RouteRegister";
import RouteConnexion from "./user/routeConnexion/RouteConnexion";
import RouteUpdate from "./user/routeUpdate/RouteUpdate";
import RouteGet from "./user/routeGet/RouteGet";
import RouteRemove from "./user/routeRemove/RouteRemove";

class RouteManager {
	public router: Router = Router();
	private _db: Database;

	private _routes: { [key: string]: { route: Route, type: "POST"|"GET", protected?: boolean } };

	private readonly _logger: Logger = new Logger("RouteManager");
	/**
	 * Add all handler for all _getRoutes
	 * @param db Instance of Database connected
	 */
	public async init(db: Database) {
		this._db = db;

		this._setRoutes();

		for (const routeKey in this._routes) {
			const routeParams: { route: Route, type: "POST"|"GET", protected?: boolean } = this._routes[routeKey];
			this._logger.log(routeParams.type, routeKey);

			const handlerCtor: RequestHandler = async (req: Request, res: Response) => {
				if (routeParams.protected === true) {
					const request: HTTPUserRequest<unknown> = new HTTPUserRequest(req, res, routeParams.route, this._db);
					await request.init();
					if (request.userTokenValid)
						request.handleRequest();
				}
				else
					new HTTPRequest(req, res, routeParams.route).handleRequest();
			}

			if (routeParams.type == "POST")
				this.router.post(routeKey, handlerCtor);
			else if (routeParams.type == "GET")
				this.router.get(routeKey, handlerCtor);
		}
	}

	private _setRoutes() {
		this._routes = {
			"/": { 
				type: "GET",
				route: new RouteIndex(this._db, "RouteIndex"),
			},
			"/recipe/random": { 
				type: "GET",
				route: new RouteRandomRecipe(this._db, "RouteRandomRecipe") 
			},
			"/recipe/add": {
				type: "GET",
				route: new RouteAddLikedRecipe(this._db, "RouteAddLikedRecipe"),
				protected: true 
			},
			"/recipe/all": { 
				type: "GET",
				route: new RouteGetAllLikedRecipes(this._db, "RouteGetAllLikedRecipes"), 
				protected: true 
			},
			"/recipe/:recipe_id/": { 
				type: "GET",
				route: new RouteGetLikedRecipe(this._db, "RouteGetLikedRecipe"), 
				protected: true 
			},
			"/recipe/:recipe_id/details": { 
				type: "GET",
				route: new RouteGetLikedRecipeDetails(this._db, "RouteGetLikedRecipeDetails"), 
				protected: true 
			},
			"/recipe/:recipe_id/remove": { 
				type: "GET",
				route: new RouteRemoveLikedRecipe(this._db, "RouteRemoveLikedRecipe"), 
				protected: true 
			},
			"/user/get": {
				type: "GET",
				route: new RouteGet(this._db, "RouteGet"),
				protected: true
			},
			"/user/remove": {
				type: "GET",
				route: new RouteRemove(this._db, "RouteRemove"),
				protected: true
			},
			"/user/register": {
				type: "POST",
				route: new RouteRegister(this._db, "RouteRegister")
			},
			"/user/connexion": {
				type: "POST",
				route: new RouteConnexion(this._db, "RouteConnexion")
			},
			"/user/update": {
				type: "POST",
				route: new RouteUpdate(this._db, "RouteUpdate"),
				protected: true
			},
			"/recipe/search": {
				type: "POST",
				route: new RouteSearchRecipe(this._db, "RouteSearchRecipe")
			},
		};
	}
}

export default RouteManager;