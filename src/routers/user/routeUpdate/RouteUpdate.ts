import RouteProxy from "../../RouteProxy";
import HTTPUserRequest from "../../http/HTTPUserRequest";
import RouteUpdateRequest from "./RouteUpdateRequest";
import UserDataModel from "../../../database/models/user/UserDataModel";
import * as bcrypt from "bcrypt";
import * as uuid from "short-uuid";
import * as jwt from "jsonwebtoken";
/**
 * Route: /user/update
 * Met à jour les informations de l'utilisateur (email, nom, mot de passe)
 * Doit comporter obligatoirement un champ password_verify qui est ensuite vérifié,
 * Si le mot de passe est faux la route retourne '403 Forbidden'
 */
class RouteUpdate extends RouteProxy {

	private readonly _expectedData: void;

	public async handle(request: HTTPUserRequest<RouteUpdateRequest>) {
		try {

			const userParams: UserDataModel = {
				password: request.jsonBody.password,
				email: request.jsonBody.email,
				name: request.jsonBody.name,
			};



			//Dans les cas ou on change le mot de passe, on regénère le "salt" pour le jwt
			//Ca rend impossible la connexion pour les appareils avec des anciens mots de passe
			if (userParams.password) {
				userParams.password = bcrypt.hashSync(userParams.password, 5);
				userParams.jwtSalt = uuid.generate();
			}
			if (userParams.email && await this._db.getUserByEmail(userParams.email)) {
				request.sendJsonError("Email already exist", 460);
				return;
			}

			const user = await this._db.updateUser(userParams, request.user.id);
			
			const tokenPayload: jwt.SignOptions = {
				issuer: process.env.BASE_URL,
				subject: user.jwtSalt,
			}

			const token = jwt.sign(tokenPayload, process.env.APP_SECRET);

			request.sendJsonPayload({
				token: token
			});

		} catch (e) {
			this.logger.error(e);
			request.sendJsonError("Internal Server Error", 500);
		}
	}
}

export default RouteUpdate;