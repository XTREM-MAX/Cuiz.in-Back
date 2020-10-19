import DeviceDataModel from "./DeviceDataModel";
import { DataTypes } from "sequelize";
import DataModel from "../../decorator/DataModel";
import ColumnDecorator from "../../decorator/ColumnDecorator";

class DeviceModel extends DataModel<DeviceDataModel> implements DeviceDataModel {
  @ColumnDecorator(DataTypes.INTEGER)
  user_id: number;
  @ColumnDecorator(DataTypes.STRING)
  device_id: string;
}

export default DeviceModel;