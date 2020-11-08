import RouteProxy from "../../RouteProxy";
import HTTPUserRequest from "../../http/HTTPUserRequest";
import RouteAddLikedRecipeRequest from "./RouteAddLikedRecipeRequest";
import * as url from "url";
import ProxyRecipeDetails from "../../../interfaces/ProxyRecipeDetails";
import { like } from "sequelize/types/lib/operators";

/**
 * Route: /recipe/add
 */
class RouteAddLikedRecipe extends RouteProxy {

	private readonly _expectedData: (keyof RouteAddLikedRecipeRequest)[] = ["recipe_id"];

	public async handle(request: HTTPUserRequest<RouteAddLikedRecipeRequest>) {

		try {
			const checkResponse = request.checkJSONBody(this._expectedData);

			if (!checkResponse.success) {
				request.sendJsonError("Bad Request", 400, checkResponse.payload);
				return;
			}

			if (await this._db.getLikedRecipe(request.jsonBody.recipe_id, request.user.id)) {
				request.sendJsonError("Liked Recipe Already Exists", 460);
				return;
			}

			const path = url.resolve("recipes/", request.jsonBody.recipe_id);
			const recipe = await this.proxyGETRequest<ProxyRecipeDetails>(path);
			
			const likedRecipe = await this._db.addLikedRecipe({
				created_date: new Date(),
				recipe_duration: recipe.result.time.total,
				recipe_name: recipe.result.name,
				recipe_people: parseInt(recipe.result.quantity.portion),
				recipe_energy: recipe.result.nutriments.energy,
				recipe_id: request.jsonBody.recipe_id,
				user_id: request.user.id,
			});
			delete likedRecipe.user_id;
			request.sendJsonPayload(likedRecipe);

		} catch (e) {
			this.logger.error(e);
			request.sendJsonError("Internal Server Error", 500);
		}
	}

}

export default RouteAddLikedRecipe;