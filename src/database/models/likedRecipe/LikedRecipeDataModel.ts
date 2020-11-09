interface LikedRecipeDataModel {
  user_id: number;
  created_date: Date;
  recipe_id: string;
  recipe_name: string;
  recipe_energy: number;
  recipe_duration: number;
  recipe_people: number;
}

export default LikedRecipeDataModel;