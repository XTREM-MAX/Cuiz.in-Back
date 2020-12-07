interface ProxyRecipeDetails {
  recipe: Result;
  status: number;
}

export default ProxyRecipeDetails;

interface Result {
  _id: string;
  name: string;
  nameSlugify: string;
  created: string;
  ownerId: string;
  quantity: Quantity;
  picture: boolean;
  category: number;
  active: number;
  avgRate?: any;
  seasoning: Seasoning[];
  ingredients: Ingredients;
  numberOfIngredients: number;
  time: Time;
  nutriscore: number;
  tags: Tags2;
  difficulty: number;
  steps: Step[];
  nutriments: Nutriments;
  viewed: number;
  comments: any[];
  owner: Owner[];
  numberOfComments: number;
}

interface Owner {
  username: string;
}

interface Step {
  content: string;
  ingredients: string[];
}

interface Tags2 {
  additives: string[];
  diets: string[];
}

interface Time {
  total: number;
  preparation: number;
  baking: number;
}

interface Ingredients {
  tagsId: string[];
  // quantities: Quantities;
  information: Information[];
}

interface Information {
  _id: string;
  categories: string[];
  name: string;
  source: number;
  nutriscore: number;
  picture: string;
  tags: Tags;
  nutriments: Nutriments;
}

interface Nutriments {
  salt: number;
  sugar: number;
  saturatedFat: number;
  proteins: number;
  carbohydrates: number;
  fiber: number;
  fat: number;
  energy: number;
}

interface Tags {
  allergens: string[];
  additives: string[];
  brands: string[];
  ingredients: string[];
}

interface Seasoning {
  quantity: string;
  ingredient: string;
}

interface Quantity {
  portion: string;
  total: number;
}