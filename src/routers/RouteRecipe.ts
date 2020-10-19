import Route from "./Route";
import { Request, Response } from "express";

class RouteRecipe extends Route {
  public async handle(request: Request, response: Response): Promise<void> {
    const payload = await this._db.getAllLikedRecipes();
    response.json(payload);
  }
}

export default RouteRecipe;