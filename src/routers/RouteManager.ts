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
import RouteProxy from "./RouteProxy";
import AppKey from "../utils/AppKey";

class RouteManager {
	public router: Router = Router();
	private _db: Database;

	private _routes: { 
		[key: string]: { 
			route: typeof Route | typeof RouteProxy, 
			type: "POST"|"GET", 
			protected?: boolean 
		}
	};

	private readonly _logger: Logger = new Logger(this);
	/**
	 * Add all handler for all _getRoutes
	 * @param db Instance of Database connected
	 */
	public async init(db: Database) {
		this._db = db;
		const appKey = new AppKey();

		this._setRoutes();

		for (const routeKey in this._routes) {
			const routeParams = this._routes[routeKey];
			const route = new routeParams.route(this._db, routeParams.protected, appKey);
			this._logger.log(routeParams.type, routeKey);

			const handlerCtor: RequestHandler = async (req: Request, res: Response) => {
				if (routeParams.protected === true) {
					const request: HTTPUserRequest<unknown> = new HTTPUserRequest(req, res, route, this._db);
					await request.init();
					if (request.userTokenValid)
						request.handleRequest();
				}
				else
					new HTTPRequest(req, res, route).handleRequest();
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
				route: RouteIndex,
			},
			"/recipe/random": { 
				type: "GET",
				route: RouteRandomRecipe 
			},
			"/recipe/add": {
				type: "GET",
				route: (RouteAddLikedRecipe as typeof RouteProxy),
				protected: true 
			},
			"/recipe/all": { 
				type: "GET",
				route: RouteGetAllLikedRecipes, 
				protected: true 
			},
			"/recipe/:recipe_id/": { 
				type: "GET",
				route: RouteGetLikedRecipe, 
				protected: true 
			},
			"/recipe/:recipe_id/details": { 
				type: "GET",
				route: RouteGetLikedRecipeDetails, 
				protected: true 
			},
			"/recipe/:recipe_id/remove": { 
				type: "GET",
				route: RouteRemoveLikedRecipe, 
				protected: true 
			},
			"/user/get": {
				type: "GET",
				route: RouteGet,
				protected: true
			},
			"/user/remove": {
				type: "GET",
				route: RouteRemove,
				protected: true
			},
			"/user/register": {
				type: "POST",
				route: RouteRegister
			},
			"/user/connexion": {
				type: "POST",
				route: RouteConnexion
			},
			"/user/update": {
				type: "POST",
				route: RouteUpdate,
				protected: true
			},
			"/recipe/search": {
				type: "POST",
				route: RouteSearchRecipe
			},
		};
	}
}

export default RouteManager;