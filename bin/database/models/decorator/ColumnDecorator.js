"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ColumnDecorator(type, allowNull = false, autoIncrement = false, primaryKey = false) {
    return function (prototype, key) {
        if (!prototype.model) { //TODO vérifier que prototype n'est pas directement le prototype
            prototype.model = {};
        }
        prototype.model[key] = { type, autoIncrement, allowNull, primaryKey };
    };
}
exports.default = ColumnDecorator;
//# sourceMappingURL=ColumnDecorator.js.map