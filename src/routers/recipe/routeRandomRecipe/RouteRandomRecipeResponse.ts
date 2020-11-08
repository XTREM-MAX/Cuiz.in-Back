import RouteSearchRecipeResponse from "../routeSearchRecipe/RouteSearchRecipeResponse";

export default interface RouteRandomRecipeResponse {
  recipe: RouteSearchRecipeResponse;
  page: number;
  index: number;
}