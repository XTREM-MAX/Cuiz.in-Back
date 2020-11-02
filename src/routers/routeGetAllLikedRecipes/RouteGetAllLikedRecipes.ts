import Route from "../Route";
import HTTPRequest from "../http/HTTPRequest";
import RouteGetAllLikedRecipesRequest from "./RouteGetAllLikedRecipesRequest";

class RouteGetLikedRecipe extends Route {
  private readonly expectedData: [keyof RouteGetAllLikedRecipesRequest] = ["user_id"];

  public async handle(request: HTTPRequest<RouteGetAllLikedRecipesRequest>) {
    const payload = await this._db.getAllLikedRecipes(request.jsonBody.user_id);

    const checkResponse = request.checkJSONBody(this.expectedData);

    if (!checkResponse.success) {
      request.sendJsonError("Bad Request", 400, checkResponse.payload);
      return;
    }
    
    request.sendJsonPayload(payload);
  }

}

export default RouteGetLikedRecipe;