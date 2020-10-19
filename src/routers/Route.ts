import { Request, Response } from 'express';
import Database from '../database/Database';

abstract class Route {
  private _request: Request;
  private _response: Response;

  constructor(
    protected _db: Database
  ) { };

  public route(request: Request, response: Response): void {
    this._request = request;
    this._response = response;
  }
  public abstract handle(request: Request, response: Response): void;

  protected jsonResponse(payload: unknown, code: number = 200) {
    this._response.json({code: code, payload: payload })
  }

  protected jsonError(code: number, message: string) {
    this._response.json({ code: code, message: message });
  }
}

export default Route;