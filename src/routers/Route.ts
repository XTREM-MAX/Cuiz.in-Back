import Database from '../database/Database';
import HTTPRequest from './http/HTTPRequest';
import Logger from "../utils/Logger";

abstract class Route {
	public logger: Logger = new Logger(this);

	constructor(
		protected _db: Database,
		protected _needLoggedUser: boolean = false
	) {};

	public abstract handle(request: HTTPRequest<unknown>): void;
}

export default Route;