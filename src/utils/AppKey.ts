import fetch from "node-fetch";
import Logger from "./Logger";

class AppKey {
	private _appKey: string;
	private _logger: Logger = new Logger(this);

	constructor() {
		//On Get AppKey toutes les heures
		this._update();
		setInterval(() => this._update(), 1000*3600);
	}


	private async _update() {
		let text = await (await fetch("https://www.nutriwi.com")).text();
		text = text.substring(text.indexOf(',appID:"')+',appID:"'.length);
		text = text.substring(0, text.indexOf('"'));
		this._appKey = text;
		this._logger.log("New AppId is", text);
	}

	public get(): string {
		return this._appKey;
	}
}

export default AppKey;