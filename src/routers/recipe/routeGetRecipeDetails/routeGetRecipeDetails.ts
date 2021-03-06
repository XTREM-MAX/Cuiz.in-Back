import RouteProxy from "../../RouteProxy";
import HTTPRequest from "../../http/HTTPRequest";
import RouteGetRecipeDetailsRequest from "./routeGetRecipeDetailsRequest";
import { resolve as urlResolve } from "url";
import ProxyRecipeDetails from "../../../interfaces/ProxyRecipeDetails";

class RouteAddLikedRecipe extends RouteProxy {

  private readonly _expectedData: (keyof RouteGetRecipeDetailsRequest)[] = ["recipe_id"];

  public async handle(request: HTTPRequest<RouteGetRecipeDetailsRequest>) {

    const checkResponse = request.checkJSONBody(this._expectedData);

    if (!checkResponse.success) {
      request.sendJsonError("Bad Request", 400, checkResponse.payload);
      return;
    }

    const recipe: ProxyRecipeDetails = await this.proxyGETRequest<ProxyRecipeDetails>(urlResolve("recipe/", request.jsonBody.recipe_id));
    
    request.sendJsonPayload<ProxyRecipeDetails>(recipe);
  }

}

export default RouteAddLikedRecipe;