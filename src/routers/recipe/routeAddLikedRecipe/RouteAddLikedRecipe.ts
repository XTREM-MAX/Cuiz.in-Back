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

			const path = url.resolve("recipe/", request.jsonBody.recipe_id);
      const recipe = (await this.proxyGETRequest<ProxyRecipeDetails>(path)).recipe;
      this.logger.log(recipe);
			const likedRecipe = await this._db.addLikedRecipe({
				created_date: new Date(),
				recipe_duration: recipe.time.total,
				recipe_name: recipe.name,
				recipe_people: parseInt(recipe.quantity.portion),
				recipe_energy: recipe.nutriments.energy,
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