import RouteProxy from "../../RouteProxy";
import HTTPRequest from "../../http/HTTPRequest";
import RouteRegisterRequest from "./RouteRegisterRequest";
import RouteRegisterResponse from "./RouteRegisterResponse";

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

/**
 * Route: /user/register
 */
class RouteRegister extends RouteProxy {

	private readonly _expectedData: (keyof RouteRegisterRequest)[] = ["password", "name", "email"];

	public async handle(request: HTTPRequest<RouteRegisterRequest>) {

		const checkResponse = request.checkJSONBody(this._expectedData);

		if (!checkResponse.success) {
			request.sendJsonError("Bad Request", 400, checkResponse.payload);
			return;
		}

		try {
			const encryptedPassword = await bcrypt.hash(request.jsonBody.password, 5);

			if (await this._db.getUserByEmail(request.jsonBody.email) !== null) {
				request.sendJsonError("Email Already Exist", 450);
				return;
			}
			
			const user = await this._db.registerUser({
				email: request.jsonBody.email,
				name: request.jsonBody.name,
				password: encryptedPassword,
			});

			const token = jwt.sign(user.jwtSalt, process.env.APP_SECRET, {
				issuer: process.env.BASE_URL,
				subject: user.email,
				expiresIn: 1000*3600*24*30*1000000 	//Infinite jwt
			});

			request.sendJsonPayload<RouteRegisterResponse>({
				token: token,
				email: user.email,
				name: user.name
			});
		} catch (e) {
			console.error(e);
			request.sendJsonError("Server error", 500);
		}
	}
}

export default RouteRegister;