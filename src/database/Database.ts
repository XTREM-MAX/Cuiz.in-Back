import { Model, ModelCtor, ModelOptions, Sequelize, UUID } from "sequelize";
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
import * as uuid from "short-uuid";
import Logger from "../utils/Logger";

class Database {
	private readonly _options: ModelOptions<DataModel<Model>>;

	private readonly _sequelize = new Sequelize({
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		dialect: "mysql",
		logging: false
	});

	private readonly User = this._generateModel<UserModel, UserDataModel>(UserModel as typeof DataModel);
	private readonly LikedRecipe = this._generateModel<LikedRecipeModel, LikedRecipeDataModel>(LikedRecipeModel as typeof DataModel);
	private readonly Oauth = this._generateModel<OauthModel, OauthDataModel>(OauthModel as typeof DataModel);
	private readonly Device = this._generateModel<DeviceModel, DeviceDataModel>(DeviceModel as typeof DataModel);

	private readonly _logger = new Logger(this);

	public async init(removeOld = false) {
		try {
			await this._sequelize.sync({ force: removeOld });
		} catch (e) {
			this._logger.error("Error syncinc model to DB", e);
		}
		return this;
	}

	private _generateModel<T extends DataModel<V>, V>(model: typeof DataModel): ModelCtor<T> {
		let className: string = model.name;//Exemple: DataModel
		return this._sequelize.define<T, V>(className.substr(0, className.length - 5), model.prototype.model as SequelizeAttributes<V>, this._options);
	}

	public getAllLikedRecipes(userId: number): Promise<LikedRecipeDataModel[]> {
		return this.LikedRecipe.findAll({ where: { user_id: userId } });
	}

	public async getLikedRecipe(recipeId: string, userId: number): Promise<LikedRecipeDataModel> {
		return (await this.LikedRecipe.findOne({ where: { recipe_id: recipeId, user_id: userId } }))?.get();
	}

	public async addLikedRecipe(recipe: LikedRecipeDataModel): Promise<LikedRecipeDataModel> {
		return (await this.LikedRecipe.create(recipe))?.get();
	}

	public removeLikedRecipe(id: string, userId: number) {
		return this.LikedRecipe.destroy({ where: { recipe_id: id, user_id: userId } });
	}

	public registerUser(user: UserDataModel): Promise<UserDataModel> {
		return this.User.create({ ...user, jwtSalt: uuid.generate() });
	}

	public async updateUser(user: Partial<UserDataModel>, id: number): Promise<UserDataModel> {
		await this.User.update(user, { where: { id: id } });
		return await this.User.findOne({ where: { id: id} });
	}

	public async removeUser(id: number): Promise<void> {
		await this.User.destroy({ where: { id: id } });
		await this.LikedRecipe.destroy({ where: { user_id: id } });
	}

	public getUserByEmail(email: string): Promise<UserDataModel> {
		return this.User.findOne({ where: { email: email } });
	}

	public getUserByJwt(jwt: string): Promise<UserDataModel> {
		return this.User.findOne({ where: { jwtSalt: jwt } });
	}
}

export default Database;