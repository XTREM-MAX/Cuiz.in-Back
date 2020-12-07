import HTTPRequest from "../../http/HTTPRequest";
import RouteProxy from "../../RouteProxy";
import RouteSearchRecipeProxyResponse from "../routeSearchRecipe/RouteSearchRecipeProxyResponse"
import RouteSearchRecipeRequest from "../routeSearchRecipe/RouteSearchRecipeRequest";
import RouteRandomRecipeResponse from "./RouteRandomRecipeResponse";

class RouteRandomRecipe extends RouteProxy {

	public async handle(request: HTTPRequest<null>) {

		const randomPage = Math.round(Math.random() * 14 + 1); //14 pages disponibles 260 recettes pour 12 par requettes

		try {
			const allRecipe = await this.proxyPOSTRequest<Partial<RouteSearchRecipeRequest>, RouteSearchRecipeProxyResponse>("recipes/search", {
				text: "",
				page: randomPage,
				category: [0],
				nutriscore: "",
				time: "00:00"
			});
			const randomRecipe = Math.round(Math.random() * allRecipe.limit);
			const res: RouteRandomRecipeResponse = {
				index: randomRecipe,
				page: randomPage,
				recipe: allRecipe.recipes[randomRecipe]
			}

			request.sendJsonPayload<RouteRandomRecipeResponse>(res);
		} catch (e) {
			this.logger.error(e);
			request.sendJsonError("Internal Server Error", 500);
		}
	}

}

export default RouteRandomRecipe;