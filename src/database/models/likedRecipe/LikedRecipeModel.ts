import { DataTypes } from "sequelize";
import DataModel from "../decorator/DataModel";
import ColumnDecorator from "../decorator/ColumnDecorator";
import LikedRecipeDataModel from "./LikedRecipeDataModel";

class LikedRecipeModel extends DataModel<LikedRecipeDataModel> implements LikedRecipeDataModel {
  @ColumnDecorator(DataTypes.INTEGER)
  user_id: number;
  @ColumnDecorator(DataTypes.DATE)
  created_date: Date;
  @ColumnDecorator(DataTypes.STRING, false, false, true)
  recipe_id: string;
  @ColumnDecorator(DataTypes.TEXT({length: "medium"}))
  recipe_name: string;
  @ColumnDecorator(DataTypes.MEDIUMINT)
  recipe_energy: number;
  @ColumnDecorator(DataTypes.MEDIUMINT)
  recipe_duration: number;
  @ColumnDecorator(DataTypes.TINYINT)
  recipe_people: number;
}

export default LikedRecipeModel;