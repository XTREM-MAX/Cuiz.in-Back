import RouteSearchRecipeResponse from "../routeSearchRecipe/RouteSearchRecipeResponse";

interface RouteRandomRecipeResponse {
  recipe: RouteSearchRecipeResponse;
  page: number;
  index: number;
}

export default RouteRandomRecipeResponse;