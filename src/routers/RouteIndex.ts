import Route from "./Route";
import HTTPRequest from "./http/HTTPRequest";

class RouteIndex extends Route {

  public async handle(request: HTTPRequest<unknown>) {
    request.sendJsonPayload({ welcome_message: "Welcome to API XTREM MAX" });
  }
}

export default RouteIndex;