import Route from "../../Route";
import HTTPUserRequest from "../../http/HTTPUserRequest";
import RouteGetLikedRecipeRequest from "./RouteGetLikedRecipeRequest";

class RouteGetLikedRecipe extends Route {
	private readonly _expectedData: (keyof RouteGetLikedRecipeRequest)[] = ["recipe_id"];

	public async handle(request: HTTPUserRequest<RouteGetLikedRecipeRequest>) {
		try {
			const checkResponse = request.checkJSONBody(this._expectedData);
			if (!checkResponse.success) {
				request.sendJsonError("Bad Request", 400, checkResponse.payload);
				return;
			}

			const payload = await this._db.getLikedRecipe(request.jsonBody.recipe_id, request.user.id)

			delete payload.user_id;
			if (!payload)
				request.sendJsonPayload({ empty: true }, 430);
			else
				request.sendJsonPayload(payload);
		} catch (e) {
			this.logger.error(e);
			request.sendJsonError("Internal Server Error", 500);
		}
	}
}

export default RouteGetLikedRecipe;