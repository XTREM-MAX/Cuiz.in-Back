import RouteProxy from "../RouteProxy";
import HTTPRequest from "../http/HTTPRequest";
import RouteGetRecipeDetailsRequest from "./routeGetRecipeDetailsRequest";
import { resolve as urlResolve } from "url";
import ProxyRecipeDetails from "../../interfaces/ProxyRecipeDetails";
class RouteAddLikedRecipe extends RouteProxy {

  private readonly expectedData: (keyof RouteGetRecipeDetailsRequest)[] = ["recipe_url", "user_id"];

  public async handle(request: HTTPRequest<RouteGetRecipeDetailsRequest>) {

    const checkResponse = request.checkJSONBody(this.expectedData);

    if (!checkResponse.success) {
      request.sendJsonError("Bad Request", 400, checkResponse.payload);
      return;
    }

    const recipe: ProxyRecipeDetails = await this.proxyGETRequest<ProxyRecipeDetails>(urlResolve("recipes", request.jsonBody.recipe_url));
    
    request.sendJsonPayload<ProxyRecipeDetails>(recipe);
  }

}

export default RouteAddLikedRecipe;