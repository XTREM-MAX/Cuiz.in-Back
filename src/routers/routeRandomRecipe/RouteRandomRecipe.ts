import Route from "../Route";
import HTTPRequest from "../http/HTTPRequest";
import RouteRandomRecipeRequest from "./RouteRandomRecipeRequest";

class RouteRandomRecipe extends Route {

  public handle(request: HTTPRequest<RouteRandomRecipeRequest>) {

    request.sendJsonPayload({
      
    });
  }

}

export default RouteRandomRecipe;