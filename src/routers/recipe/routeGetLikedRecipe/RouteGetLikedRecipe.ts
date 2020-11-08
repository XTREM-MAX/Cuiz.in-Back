import Route from "../../Route";
import HTTPRequest from "../../http/HTTPRequest";
import RouteGetLikedRecipeRequest from "./RouteGetLikedRecipeRequest";

class RouteGetLikedRecipe extends Route {
  private readonly _expectedData: (keyof RouteGetLikedRecipeRequest)[] = ["user_id", "recipe_id"];

  public async handle(request: HTTPRequest<RouteGetLikedRecipeRequest>) {
    const payload = await this._db.getLikedRecipe(request.jsonBody.recipe_id, request.jsonBody.user_id)

    const checkResponse = request.checkJSONBody(this._expectedData);

    if (!checkResponse.success) {
      request.sendJsonError("Bad Request", 400, checkResponse.payload);
      return;
    }
    
    request.sendJsonPayload(payload);
  }

}

export default RouteGetLikedRecipe;