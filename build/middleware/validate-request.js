"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var request_validation_error_1 = __importDefault(require("../errors/request-validation-error"));
var validateRequest = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.default(errors.array());
    }
    next();
};
exports.default = validateRequest;
