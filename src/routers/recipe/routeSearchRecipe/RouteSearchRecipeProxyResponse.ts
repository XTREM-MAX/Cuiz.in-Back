interface RouteSearchRecipeProxyResponse {
  recipes: {
    _id: string,
    name: string,
    nameSlugify: string,
    quantity: {
      portion: string,
      total: number,
    },
    picture: boolean,
    category: number,
    active: number,
    numberOfIngredients: number,
    time: {
      total: number,
      preparation: number,
      baking: number,
    }
    nutriscore: number,
    difficulty: number,
    numberOfComments: number
  }[],
  limit: number;
  count: number;
  status: number;
}

export default RouteSearchRecipeProxyResponse;