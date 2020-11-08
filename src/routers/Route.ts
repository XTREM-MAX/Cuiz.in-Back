import Database from '../database/Database';
import HTTPRequest from './http/HTTPRequest';
import Logger from "../utils/Logger";

abstract class Route {
	public logger: Logger;

	constructor(
		protected _db: Database,
		_name: string,
		protected _needLoggedUser: boolean = false
	) { 
		this.logger = new Logger(_name);
	};

	public abstract handle(request: HTTPRequest<unknown>): void;
}

export default Route;