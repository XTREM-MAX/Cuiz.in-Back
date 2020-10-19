import { Response, Request } from 'express';
class HTTPRequest {
  constructor(
    public request: Request,
    private _response: Response
  ) { }

  public sendJsonPayload(payload: unknown, code: number = 200) {
    this._response.json({code: code, payload: payload })
  }

  public sendJsonError(message: string, code: number) {
    this._response.json({ code: code, message: message });
  }
}

export default HTTPRequest;