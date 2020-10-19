import { DataType } from "sequelize";
import DataModel from "./DataModel";

function ColumnDecorator(type: DataType, allowNull: boolean = false, autoIncrement: boolean = false, primaryKey = false) {
  return function (prototype: DataModel<any>, key: string) {
    if (!prototype.model) {//TODO vérifier que prototype n'est pas directement le prototype
      prototype.model = {};
    }
    prototype.model[key] = { type, autoIncrement, allowNull, primaryKey };
  }
}

export default ColumnDecorator;