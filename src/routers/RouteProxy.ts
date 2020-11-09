import Route from './Route';
import fetch from "node-fetch";
import { AES } from "crypto-js";
import * as url from "url";
import Logger from '../utils/Logger';
import Database from '../database/Database';
import AppKey from "../utils/AppKey";

abstract class RouteProxy extends Route {


	constructor(
		_db: Database,
		_needLoggedUser: boolean = false,
		private _appKey: AppKey
	) { 
		super(_db, _needLoggedUser);
	};

	private _logger = new Logger(this);

	protected async proxyPOSTRequest<RequestData, ResponseData>(path: string, payload: RequestData): Promise<ResponseData> {
		try {
			const res = await fetch(url.resolve("https://api.nutriwi.com/v1/", path), {
				method: "POST",
				headers: {
					"x-api-key": this.getAPIKey("post", path),
					"Origin": "https://www.nutriwi.com",
					"Content-Type": "application/json;charset=UTF-8"
				},
				body: JSON.stringify(payload)
			});
			this._logger.log("[Proxy POST Request]", res.url, res.status, res.statusText);
			return await res.json()
		} catch (e) {
			this._logger.error(e);
			throw "Proxy Request Error";
		}
	}

	protected async proxyGETRequest<ResponseData>(path: string): Promise<ResponseData> {
		try {
			const res = await fetch(url.resolve("https://api.nutriwi.com/v1/", path), {
				method: "GET",
				headers: {
					"x-api-key": this.getAPIKey("get", path),
					"Origin": "https://www.nutriwi.com",
					"content-type": "application/json;charset=UTF-8"
				}
			});
			this._logger.log("[Proxy GET Request]", res.url, res.status, res.statusText);
			return await res.json()
		} catch (e) {
			this._logger.error(e);
			throw "Proxy Request Error";
		}
	}

	private getAPIKey(method: "post" | "get", url: string): string {
		const aesQuery = {
			timestamp: Date.now(),
			baseURL: "https://api.nutriwi.com/v1/",
			url: url,
			appId: this._appKey.get(),
			method: method
		}
		return AES.encrypt(JSON.stringify(aesQuery), "sq5lxSsDyzxWla5G-UTSFATZskrxbJmHsimvKCr1uEB8-8j93WPaZiRdYFL3nwFA9k").toString()
	}

}

export default RouteProxy;