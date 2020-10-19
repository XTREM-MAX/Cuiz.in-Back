import { Response, Request } from 'express';
import Route from '../Route';

class HTTPRequest<JSONBody> {
  public jsonBody: JSONBody;

  constructor(
    public request: Request,
    private _response: Response,
    private _route: Route
  ) {
    this.jsonBody = this.request.body;
  }

  public handleRequest() {
    this._route.handle(this);
  }

  /**
   * Vérifie que le corp de la requête est bien constitué de tous les paramètres demandés
   * Renvoie un object avec les clef de la requete et true si le paramêtre est spécifié ou false si il ne l'est pas
   * @param expectedData 
   */
  public checkJSONBody(expectedData: [keyof JSONBody]): { success: boolean, payload: { [Key in keyof JSONBody]: boolean } } {
    let response: { [Key in keyof JSONBody]: boolean };
    let success: boolean = true;
    for (const expectedKey of expectedData) {
      if (!(expectedKey in this.jsonBody)
        || this.jsonBody[expectedKey] === null
        || this.jsonBody[expectedKey] === undefined) {
        response[expectedKey] = false;
        success = false;
      } else
        response[expectedKey] = true;
    }
    return { success: success, payload: response };
  }

  public sendJsonPayload(payload: unknown, code: number = 200) {
    this._response.json({code: code, payload: payload })
  }

  public sendJsonError(message: string, code: number, payload?: { [Key in keyof Partial<JSONBody>]: boolean }) {
    this._response.json({ code: code, message: message, payload: payload });
  }
}

export default HTTPRequest;