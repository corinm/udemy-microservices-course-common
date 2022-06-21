"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = (req, res, next) => {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
        return next();
    }
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
    }
    catch (e) {
        return next();
    }
    req.currentUser = payload;
    return next();
};
exports.currentUser = currentUser;
