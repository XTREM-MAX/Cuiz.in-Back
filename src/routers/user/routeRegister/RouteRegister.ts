import RouteProxy from "../../RouteProxy";
import HTTPRequest from "../../http/HTTPRequest";
import RouteRegisterRequest from "./RouteRegisterRequest";
import * as bcrypt from "bcrypt";

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

			await this._db.registerUser({
				email: request.jsonBody.email,
				name: request.jsonBody.name,
				password: encryptedPassword
			});
		} catch(e) {
			//TODO: Handle error
			console.error(e);
			return;
		}
		
		request.sendJsonPayload({
			success: true
		});
	}

}

export default RouteRegister;