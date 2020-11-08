import RouteProxy from "../../RouteProxy";
import HTTPRequest from "../../http/HTTPRequest";
import RouteConnexionRequest from "./RouteConnexionRequest";

class RouteAddLikedRecipe extends RouteProxy {

  private readonly _expectedData: (keyof RouteConnexionRequest)[] = ["password", "username"];

  public async handle(request: HTTPRequest<RouteConnexionRequest>) {

    const checkResponse = request.checkJSONBody(this._expectedData);

    if (!checkResponse.success) {
      request.sendJsonError("Bad Request", 400, checkResponse.payload);
      return;
    }
	
	

	request.sendJsonPayload({
      success: true
    });
  }

}

export default RouteAddLikedRecipe;