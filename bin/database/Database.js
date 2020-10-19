"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const LikedRecipeModel_1 = require("./models/likedRecipe/LikedRecipeModel");
const OauthModel_1 = require("./models/oauth/OauthModel");
const UserModel_1 = require("./models/user/UserModel");
const DeviceModel_1 = require("./models/device/DeviceModel");
class Database {
    constructor() {
        this._sequelize = new sequelize_1.Sequelize({
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            dialect: "mysql",
            logging: true
        });
        this.User = this._generateModel(UserModel_1.default);
        this.LikedRecipe = this._generateModel(LikedRecipeModel_1.default);
        this.Oauth = this._generateModel(OauthModel_1.default);
        this.Device = this._generateModel(DeviceModel_1.default);
    }
    async init(removeOld = false) {
        try {
            await this._sequelize.sync({ force: removeOld });
        }
        catch (e) {
            console.log("Error syncinc model to DB", e);
        }
        return this;
    }
    _generateModel(model) {
        let className = model.name; //Exemple: DataModel
        return this._sequelize.define(className.substr(0, className.length - 5), model.prototype.model, this._options);
    }
    getAllLikedRecipes() {
        return this.LikedRecipe.findAll();
    }
    getLikedRecipe(recipeId) {
        return this.LikedRecipe.findOne({ where: { recipe_id: recipeId } });
    }
}
exports.default = Database;
//# sourceMappingURL=Database.js.map