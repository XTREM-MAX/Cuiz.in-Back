import Route from "../../Route";
import HTTPRequest from "../../http/HTTPRequest";
import RouteConnexionRequest from "./RouteConnexionRequest";

import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

/**
 * Route: /user/connexion
 */
class RouteConnexion extends Route {

	private readonly _expectedData: (keyof RouteConnexionRequest)[] = ["password", "email"];

	public async handle(request: HTTPRequest<RouteConnexionRequest>) {

		const checkResponse = request.checkJSONBody(this._expectedData);

		if (!checkResponse.success) {
			request.sendJsonError("Bad Request", 400, checkResponse.payload);
			return;
		}

		try {
			const user = await this._db.getUserByEmail(request.jsonBody.email);
			if (user === null) {
				this.invalidEmailError(request);
				return;
			} else if (!await bcrypt.compare(request.jsonBody.password, user.password)) {
				this.invalidPassError(request);
				return;
			}

			const tokenPayload: jwt.SignOptions = {
				issuer: process.env.BASE_URL,
				subject: user.jwtSalt,
			}

			const token = jwt.sign(tokenPayload, process.env.APP_SECRET);

			request.sendJsonPayload({ 
				token: token,
				email: user.email,
				name: user.name
			});
			
		} catch (e) {
			this.logger.error(e);
			request.sendJsonError("Internal Server Error", 500);
		}
	}

	private invalidPassError(request: HTTPRequest<RouteConnexionRequest>) {
		request.sendJsonError("Invalid Password", 451);
	}
	private invalidEmailError(request: HTTPRequest<RouteConnexionRequest>) {
		request.sendJsonError("Invalid Email", 452);
	}

}

export default RouteConnexion;