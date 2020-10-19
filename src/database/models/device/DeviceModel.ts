import DeviceDataModel from "./DeviceDataModel";
import { Model, DataTypes, Sequelize, ModelOptions } from "sequelize";
import { SequelizeAttributes } from "../../../types";
import DataModel from "../decorator/DataModel";
import ColumnDecorator from "../decorator/ColumnDecorator";
import { Col } from "sequelize/types/lib/utils";

class DeviceModel extends DataModel<DeviceDataModel> implements DeviceDataModel {
  @ColumnDecorator(DataTypes.INTEGER)
  user_id: number;
  @ColumnDecorator(DataTypes.STRING)
  device_id: string;
}

export default DeviceModel;