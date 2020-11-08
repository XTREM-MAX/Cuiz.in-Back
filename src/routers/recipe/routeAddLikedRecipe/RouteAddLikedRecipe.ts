import RouteProxy from "../../RouteProxy";
import HTTPRequest from "../../http/HTTPRequest";
import RouteAddLikedRecipeRequest from "./RouteAddLikedRecipeRequest";
import { resolve as urlResolve } from "url";
import ProxyRecipeDetails from "../../../interfaces/ProxyRecipeDetails";
class RouteAddLikedRecipe extends RouteProxy {

  private readonly _expectedData: (keyof RouteAddLikedRecipeRequest)[] = ["recipe_url", "user_id"];

  public async handle(request: HTTPRequest<RouteAddLikedRecipeRequest>) {

    const checkResponse = request.checkJSONBody(this._expectedData);

    if (!checkResponse.success) {
      request.sendJsonError("Bad Request", 400, checkResponse.payload);
      return;
    }

    const recipe = await this.proxyGETRequest<ProxyRecipeDetails>(urlResolve("recipes", request.jsonBody.recipe_url));
    
    await this._db.addLikedRecipe({
      created_date: new Date(),
      recipe_duration: recipe.result.time.total,
      recipe_name: recipe.result.name,
      recipe_people: parseInt(recipe.result.quantity.portion),
      recipe_energy: recipe.result.nutriments.energy,
      recipe_id: request.jsonBody.recipe_url,
      user_id: 0,
    });
    request.sendJsonPayload({
      success: true
    });
  }

}

export default RouteAddLikedRecipe;