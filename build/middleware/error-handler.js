"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var custom_error_1 = __importDefault(require("../errors/custom-error"));
var errorHandler = function (err, req, res, next) {
    if (err instanceof custom_error_1.default) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    console.error(err);
    res.status(400).send({
        errors: { message: 'Something went wrong' },
    });
};
exports.default = errorHandler;
