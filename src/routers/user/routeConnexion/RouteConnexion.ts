import RouteProxy from "../../RouteProxy";
import HTTPRequest from "../../http/HTTPRequest";
import RouteConnexionRequest from "./RouteConnexionRequest";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

/**
 * Route: /user/connexion
 */
class RouteConnexion extends RouteProxy {

	private readonly _expectedData: (keyof RouteConnexionRequest)[] = ["password", "email"];

	public async handle(request: HTTPRequest<RouteConnexionRequest>) {

		const checkResponse = request.checkJSONBody(this._expectedData);

		if (!checkResponse.success) {
			request.sendJsonError("Bad Request", 400, checkResponse.payload);
			return;
		}

		try {
			const user = await this._db.getUserByEmail(request.jsonBody.email);
			if (user === null || !await bcrypt.compare(request.jsonBody.password, user.password)) {
				this.invalidCredsError(request);
				return;
			}

			const token = jwt.sign(user.jwtSalt, process.env.APP_SECRET, {
				issuer: process.env.BASE_URL,
				subject: user.email,
				expiresIn: 1000 * 3600 * 24 * 30 * 1000000 	//Infinite jwt
			});

			request.sendJsonPayload({ token: token });
		} catch (e) {
			console.error(e);
			request.sendJsonError("Internal Server Error", 500);
		}
	}

	private invalidCredsError(request: HTTPRequest<RouteConnexionRequest>) {
		request.sendJsonError("Invalid credentials", 451);
	}

}

export default RouteConnexion;