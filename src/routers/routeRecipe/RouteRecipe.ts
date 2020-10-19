import Route from "../Route";
import HTTPRequest from "../http/HTTPRequest";
import RouteRecipeRequest from "./RouteRecipeRequest";

class RouteRecipe extends Route {
  private readonly expectedData: [keyof RouteRecipeRequest] = ["id"];

  public async handle(request: HTTPRequest<RouteRecipeRequest>) {
    const payload = await this._db.getAllLikedRecipes();

    const checkResponse = request.checkJSONBody(this.expectedData);

    if (!checkResponse.success) {
      request.sendJsonError("Bad Request", 400, checkResponse.payload);
      return;
    }
    
    request.sendJsonPayload(payload);
  }

}

export default RouteRecipe;