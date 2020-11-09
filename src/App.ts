import * as express from "express";
import * as path from "path";
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as dotenv from "dotenv";
import RouteManager from "./routers/RouteManager";
import Database from "./database/Database";
import Logger from "./utils/Logger";

class App {
	public app: express.Application = express();
	private _routeManager: RouteManager = new RouteManager();
	private _database: Database;
	private _logger: Logger = new Logger(this);

	public async init() {
		dotenv.config();

		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cookieParser());

		this.app.use(express.static(path.join(__dirname, 'public')));

		this._database = await this._initDatabase();

		await this._routeManager.init(this._database);
		this.app.use("/", this._routeManager.router);
		this.app.listen(process.env.PORT ?? 3000, () => this._onListening());
	}

	private _initDatabase(): Promise<Database> {
		return new Database().init();
	}
	private _onListening() {
		this._logger.log("Server started");
		this._logger.log("Listening on port", process.env.PORT ?? 3000);
	}
}

let instance = new App();
instance.init();

export default App;