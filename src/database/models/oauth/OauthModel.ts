import DataModel from "../../decorator/DataModel";
import ColumnDecorator from "../../decorator/ColumnDecorator";
import OauthDataModel from "./OauthDataModel";
import OauthType from "./OauthType";
import { DataTypes } from "sequelize";

class OauthModel extends DataModel<OauthDataModel> implements OauthDataModel {
  @ColumnDecorator(DataTypes.INTEGER)
  user_id: number;
  @ColumnDecorator(DataTypes.ENUM(...Object.values(OauthType)))
  type: OauthType;
}

export default OauthModel;