"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Route {
    constructor(_db) {
        this._db = _db;
    }
    ;
    route(request, response) {
        this._request = request;
        this._response = response;
    }
    jsonResponse(payload, code = 200) {
        this._response.json({ code: code, payload: payload });
    }
    jsonError(code, message) {
        this._response.json({ code: code, message: message });
    }
}
exports.default = Route;
//# sourceMappingURL=Route.js.map