import Route from "./Route";
import HTTPRequest from "./http/HTTPRequest";

class RouteRecipe extends Route {
  public async handle(request: HTTPRequest) {
    const payload = await this._db.getAllLikedRecipes();
    request.sendJsonPayload(payload);
  }
}

export default RouteRecipe;