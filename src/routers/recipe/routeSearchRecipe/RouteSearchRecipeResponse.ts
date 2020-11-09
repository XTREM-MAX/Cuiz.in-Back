interface RouteSearchRecipeResponse {
  name: string,
  imageUrl?: string;
  quantity: {
    portion: string,
    total: number,
  },
  category: number,
  numberOfIngredients: number,
  time: {
    total: number,
    preparation: number,
    baking: number,
  }
  nutriscore: number,
  difficulty: number,
}

export default RouteSearchRecipeResponse