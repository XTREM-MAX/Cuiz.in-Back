import RouteProxy from "../../RouteProxy";
import HTTPRequest from "../../http/HTTPRequest";
import RouteSearchRecipeRequest from "./RouteSearchRecipeRequest";
import RouteSearchRecipeProxyResponse from "./RouteSearchRecipeProxyResponse";

/**
 * Route: Search Recipe : Route /searh
 */
class RouteSearchRecipe extends RouteProxy {
	private readonly _expectedData: (keyof RouteSearchRecipeRequest)[] = ["text"];

	public async handle(request: HTTPRequest<RouteSearchRecipeRequest>) {
		const checkResponse = request.checkJSONBody(this._expectedData);
		if (!checkResponse.success) {
			request.sendJsonError("Bad Request", 400, checkResponse.payload);
			return;
		}

		try {
			const res = await this.proxyPOSTRequest<Partial<RouteSearchRecipeRequest>, RouteSearchRecipeProxyResponse>("recipes/search", {
			  ...request.jsonBody,
			});
			request.sendJsonPayload(res);
			
		} catch (e) {
			request.sendJsonError("Internal Server Error", 500);
		}
	}

}

export default RouteSearchRecipe;