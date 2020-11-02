import RouteProxy from "../RouteProxy";
import HTTPRequest from "../http/HTTPRequest";
import RouteRemoveLikedRecipeRequest from "./routeRemoveLikedRecipeRequest";
class RouteAddLikedRecipe extends RouteProxy {

  private readonly expectedData: (keyof RouteRemoveLikedRecipeRequest)[] = ["id", "userId"];

  public async handle(request: HTTPRequest<RouteRemoveLikedRecipeRequest>) {

    const checkResponse = request.checkJSONBody(this.expectedData);

    if (!checkResponse.success) {
      request.sendJsonError("Bad Request", 400, checkResponse.payload);
      return;
    }

    await this._db.removeLikedRecipe(request.jsonBody.id, request.jsonBody.userId);
    
    request.sendJsonPayload({
      success: true
    });
  }

}

export default RouteAddLikedRecipe;