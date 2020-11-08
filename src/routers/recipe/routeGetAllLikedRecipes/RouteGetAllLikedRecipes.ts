import Route from "../../Route";
import HTTPUserRequest from "../../http/HTTPUserRequest";

class RouteGetLikedRecipe extends Route {

	public async handle(request: HTTPUserRequest<unknown>) {
		try {
			const payload = await this._db.getAllLikedRecipes(request.user.id);
			request.sendJsonPayload({
				size: payload.length,
				data: payload
			});
		} catch (e) {
			this.logger.error(e);
			request.sendJsonError("Internal Server Error", 500);
		}
	}

}

export default RouteGetLikedRecipe;