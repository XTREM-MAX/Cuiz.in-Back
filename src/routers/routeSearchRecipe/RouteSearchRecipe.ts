import RouteProxy from "../RouteProxy";
import HTTPRequest from "../http/HTTPRequest";
import RouteSearchRecipeRequest from "./RouteSearchRecipeRequest";
import RouteSearchRecipeProxyRequest from "./RouteSearchRecipeProxyRequest";
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

    const res = await this.proxyPOSTRequest<RouteSearchRecipeProxyRequest, RouteSearchRecipeProxyResponse>("recipes/search", {
      where: request.jsonBody,
    });

    request.sendJsonPayload(res); 
  }

}

export default RouteSearchRecipe;