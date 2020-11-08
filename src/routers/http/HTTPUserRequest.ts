import Route from "../Route";
import HTTPRequest from "./HTTPRequest";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import UserDataModel from "../../database/models/user/UserDataModel";
import Database from "../../database/Database";

class HTTPUserRequest<JsonBody> extends HTTPRequest<JsonBody> {

	private _userToken: jwt.SignOptions;
	public userTokenValid: boolean;
	public user: UserDataModel;

	constructor(
		request: Request,
		response: Response,
		route: Route,
		private _db: Database,
	) {
		super(request, response, route);
	}

	public async init() {
		try {
			this.userTokenValid = this._checkToken();
			if (this.userTokenValid)
				this.user = await this._db.getUserByJwt(this._userToken.subject);
			if (!this.user) {
				this.sendJsonError("Invalid or not provided token", 403);
				this.userTokenValid = false;
			}
		} catch (e) {
			this.userTokenValid = false;
			this._route.logger.error(e);
		}
	}

	private _checkToken(): boolean {
		try {
			const token = this.request.headers.authorization;
			if (!token || !jwt.verify(token, process.env.APP_SECRET,{ ignoreExpiration: true })) {
				this.sendJsonError("Invalid or not provided token", 403);
				return false;
			}
			this._userToken = jwt.decode(token) as jwt.SignOptions;
			return true;
		} catch(e) {
			this.sendJsonError("Invalid or not provided token", 403);
			this._route.logger.error(e);
			return false;
		}
	}
}

export default HTTPUserRequest;