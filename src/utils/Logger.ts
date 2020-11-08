class Logger {
	constructor(
		private _name: string
	) {}

	log(...params: any[]) {
		console.log(`[${this._name}]`, ...params);
	}

	error(...params: any[]) {
		console.error(`[${this._name}]`, ...params);
	}
}

export default Logger;