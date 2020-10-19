import { DataTypes, Model } from "sequelize";
import { SequelizeAttributes } from "src/types";

class DataModel<T> extends Model<T> {
  model: SequelizeAttributes<T>;
}

export default DataModel;