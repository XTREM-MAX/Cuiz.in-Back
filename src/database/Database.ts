import { Model, ModelCtor, ModelOptions, Sequelize } from "sequelize";
import { SequelizeAttributes } from "src/types";
import DataModel from './decorator/DataModel';
import DeviceDataModel from "./models/device/DeviceDataModel";
import LikedRecipeDataModel from "./models/likedRecipe/LikedRecipeDataModel";
import LikedRecipeModel from "./models/likedRecipe/LikedRecipeModel";
import OauthDataModel from "./models/oauth/OauthDataModel";
import OauthModel from "./models/oauth/OauthModel";
import UserDataModel from "./models/user/UserDataModel";
import UserModel from "./models/user/UserModel";
import DeviceModel from "./models/device/DeviceModel";

class Database {
  private readonly _options: ModelOptions<DataModel<Model>>;

  private readonly _sequelize = new Sequelize({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: "mysql",
    logging: true
  });
  
  private readonly User = this._generateModel<UserModel, UserDataModel>(UserModel as typeof DataModel);
  private readonly LikedRecipe = this._generateModel<LikedRecipeModel, LikedRecipeDataModel>(LikedRecipeModel as typeof DataModel);
  private readonly Oauth = this._generateModel<OauthModel, OauthDataModel>(OauthModel as typeof DataModel);
  private readonly Device = this._generateModel<DeviceModel, DeviceDataModel>(DeviceModel as typeof DataModel);
  
	public async init(removeOld = false) {
		try {
			await this._sequelize.sync({force: removeOld});
		} catch (e) {
			console.log("Error syncinc model to DB", e);
    }
    return this;
  }
  
  private _generateModel<T extends DataModel<V>, V>(model: typeof DataModel): ModelCtor<T> {
    let className: string = model.name;//Exemple: DataModel
    return this._sequelize.define<T, V>(className.substr(0, className.length-5), model.prototype.model as SequelizeAttributes<V>, this._options); 
  }

  public getAllLikedRecipes(): Promise<LikedRecipeModel[]> {
    return this.LikedRecipe.findAll();
  }

  public getLikedRecipe(recipeId: number): Promise<LikedRecipeModel> {
    return this.LikedRecipe.findOne({where: {recipe_id: recipeId}});
  }
}

export default Database;