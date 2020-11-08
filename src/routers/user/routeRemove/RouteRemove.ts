import RouteProxy from "../../RouteProxy";
import HTTPUserRequest from "../../http/HTTPUserRequest";
import RouteRemoveRequest from "./RouteRemoveRequest";
import * as bcrypt from "bcrypt";
/**
 * Route: /user/remove
 * Supprime l'utilisateur
 * Doit comporter obligatoirement un champ password_verify qui est ensuite vérifié,
 * Si le mot de passe est faux la route retourne '403 Forbidden'
 */
class RouteRemove extends RouteProxy {

	private readonly _expectedData: (keyof RouteRemoveRequest)[] = ["password_verify"];

	public async handle(request: HTTPUserRequest<RouteRemoveRequest>) {
		try {
			const checkResponse = request.checkJSONBody(this._expectedData);
			if (!checkResponse.success) {
				request.sendJsonError("", 400, checkResponse.payload);
				return;
			} 
			if (!bcrypt.compareSync(request.jsonBody.password_verify, request.user.password)) {
				request.sendJsonError("Wrong Password", 403);
				return;
			}

			await this._db.removeUser(request.user.id);

			request.sendJsonPayload({
				success: true
			}, 200);

		} catch (e) {
			this.logger.error(e);
			request.sendJsonError("Internal Server Error", 500);
		}
	}
}

export default RouteRemove;