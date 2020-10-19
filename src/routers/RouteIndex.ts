import Route from "./Route";
import HTTPRequest from "./http/HTTPRequest";

class RouteIndex extends Route {
  public async handle(request: HTTPRequest) {
    console.log("test");
    request.sendJsonPayload({ welcome_message: "Welcome to API XTREM MAX" });
  }
}

export default RouteIndex;