import Database from '../database/Database';
import HTTPRequest from './http/HTTPRequest';

abstract class Route {
	constructor(
		protected _db: Database
	) { };

	public abstract handle(request: HTTPRequest<unknown>): void;
}

export default Route;