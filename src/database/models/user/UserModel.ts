import UserDataModel from "./UserDataModel";
import { Model, DataTypes, Sequelize, ModelOptions } from "sequelize";
import { SequelizeAttributes } from "../../../types";
import DataModel from "../decorator/DataModel";
import ColumnDecorator from "../decorator/ColumnDecorator";

class UserModel extends DataModel<UserDataModel> implements UserDataModel {
  @ColumnDecorator(DataTypes.INTEGER, false, true, true)
  public id: number;
  @ColumnDecorator(DataTypes.STRING(50))
  public email: string;
  @ColumnDecorator(DataTypes.STRING(60))
  public password: string;
  @ColumnDecorator(DataTypes.STRING(40))
  public name: string;
}

export default UserModel;