import RouteProxy from "../../RouteProxy";
import HTTPUserRequest from "../../http/HTTPUserRequest";
import RouteRemoveLikedRecipeRequest from "./routeRemoveLikedRecipeRequest";

class RouteRemoveLikedRecipe extends RouteProxy {

  private readonly _expectedData: (keyof RouteRemoveLikedRecipeRequest)[] = ["recipe_id"];

  public async handle(request: HTTPUserRequest<RouteRemoveLikedRecipeRequest>) {
    const checkResponse = request.checkJSONBody(this._expectedData);

    if (!checkResponse.success) {
      request.sendJsonError("Bad Request", 400, checkResponse.payload);
      return;
    }
	try {
		await this._db.removeLikedRecipe(request.jsonBody.recipe_id, request.user.id);
		
		request.sendJsonPayload({
			success: true
		});
	} catch (e) {
		this.logger.error(e);
		request.sendJsonError("Internal Server Error", 500);
	} 
  }

}

export default RouteRemoveLikedRecipe;