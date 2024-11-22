"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = deepFreeze;
function deepFreeze(obj) {
    if (obj === null || obj === undefined) {
        return obj;
    }
    const propNames = Object.getOwnPropertyNames(obj);
    for (const name of propNames) {
        const value = obj[name];
        if (value && typeof value === "object") {
            deepFreeze(value);
        }
    }
    return Object.freeze(obj);
}
