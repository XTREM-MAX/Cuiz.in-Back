import Route from "../../Route";
import HTTPRequest from "../../http/HTTPRequest";
import RouteProxy from "../../RouteProxy";
import RouteSearchRecipeProxyRequest from "../routeSearchRecipe/RouteSearchRecipeProxyRequest";
import RouteSearchRecipeProxyResponse from "../routeSearchRecipe/RouteSearchRecipeProxyResponse"
import RouteRandomRecipeResponse from "./RouteRandomRecipeResponse";

class RouteRandomRecipe extends RouteProxy {

  public async handle(request: HTTPRequest<null>) {

    const randomPage = Math.floor(Math.random() * 14 + 1); //14 pages disponibles 260 recettes pour 12 par requettes

    const allRecipe = await this.proxyPOSTRequest<RouteSearchRecipeProxyRequest, RouteSearchRecipeProxyResponse>("recipes/search", {
      where: {
        text: "",
        page: randomPage,
        category: [0],
        nutriscore: "",
        time: "00:00"
      }
    });
    const randomRecipe = Math.floor(Math.random() * allRecipe.limit);

    const res: RouteRandomRecipeResponse = {
      index: randomRecipe,
      page: randomPage,
      recipe: allRecipe.result[randomRecipe]
    }

    request.sendJsonPayload<RouteRandomRecipeResponse>(res);
  }

}

export default RouteRandomRecipe;