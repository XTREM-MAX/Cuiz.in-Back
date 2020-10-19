import Route from "./Route";
import { Request, Response } from "express";

class RouteIndex extends Route {
  public async handle(request: Request, response: Response): Promise<void> {
    this.jsonResponse({ welcome_message: "Welcome to API XTREM MAX" });
  }
}

export default RouteIndex;