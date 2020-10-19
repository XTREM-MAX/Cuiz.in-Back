"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DataModel_1 = require("../decorator/DataModel");
const ColumnDecorator_1 = require("../decorator/ColumnDecorator");
class LikedRecipeModel extends DataModel_1.default {
}
__decorate([
    ColumnDecorator_1.default(sequelize_1.DataTypes.INTEGER)
], LikedRecipeModel.prototype, "user_id", void 0);
__decorate([
    ColumnDecorator_1.default(sequelize_1.DataTypes.DATE)
], LikedRecipeModel.prototype, "created_date", void 0);
__decorate([
    ColumnDecorator_1.default(sequelize_1.DataTypes.STRING, false, false, true)
], LikedRecipeModel.prototype, "recipe_id", void 0);
__decorate([
    ColumnDecorator_1.default(sequelize_1.DataTypes.TEXT({ length: "medium" }))
], LikedRecipeModel.prototype, "recipe_name", void 0);
__decorate([
    ColumnDecorator_1.default(sequelize_1.DataTypes.MEDIUMINT)
], LikedRecipeModel.prototype, "recipe_energy", void 0);
__decorate([
    ColumnDecorator_1.default(sequelize_1.DataTypes.MEDIUMINT)
], LikedRecipeModel.prototype, "recipe_duration", void 0);
__decorate([
    ColumnDecorator_1.default(sequelize_1.DataTypes.TINYINT)
], LikedRecipeModel.prototype, "recipe_people", void 0);
exports.default = LikedRecipeModel;
//# sourceMappingURL=LikedRecipeModel.js.map