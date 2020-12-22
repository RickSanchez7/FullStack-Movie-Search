"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFavoriteMovies = exports.signOut = exports.currentUser = exports.updateUserProfile = exports.userProfile = exports.signin = exports.signup = void 0;
// import jwt from 'jsonwebtoken';
var generateToken_1 = __importDefault(require("../utils/generateToken"));
// import catchAsync from '../utils/catchAsync';
var User_1 = __importDefault(require("../models/User"));
var bad_request_error_1 = __importDefault(require("../errors/bad-request-error"));
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, passwordChangedAt, userExists, user, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, passwordChangedAt = _a.passwordChangedAt;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                userExists = _b.sent();
                if (userExists) {
                    throw new bad_request_error_1.default('User already exists');
                }
                return [4 /*yield*/, User_1.default.create({
                        name: name,
                        email: email,
                        password: password,
                        passwordChangedAt: passwordChangedAt,
                    })];
            case 2:
                user = _b.sent();
                token = generateToken_1.default(user._id);
                // Store it on session object
                req.session = {
                    jwt: token,
                };
                if (user) {
                    res.status(201).send({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        favoriteMovies: user.favoriteMovies,
                    });
                }
                else {
                    throw new bad_request_error_1.default('Invalid user data');
                }
                return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, token;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, user.matchPassword(password, user.password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    token = generateToken_1.default(user._id);
                    // Store it on session object
                    req.session = {
                        jwt: token,
                    };
                    res.send({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    });
                }
                else {
                    res.status(401);
                    throw new bad_request_error_1.default('Invalid email or password');
                }
                return [2 /*return*/];
        }
    });
}); };
exports.signin = signin;
var userProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.session) return [3 /*break*/, 2];
                return [4 /*yield*/, User_1.default.findById((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id)];
            case 1:
                user = _b.sent();
                _b.label = 2;
            case 2:
                if (!user)
                    res.send(null);
                if (user) {
                    res.send({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        favoriteMovies: user.favoriteMovies,
                    });
                }
                else {
                    throw new bad_request_error_1.default('User not found');
                }
                return [2 /*return*/];
        }
    });
}); };
exports.userProfile = userProfile;
var updateUserProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, updatedUser;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.session) return [3 /*break*/, 2];
                return [4 /*yield*/, User_1.default.findById((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id)];
            case 1:
                user = _b.sent();
                _b.label = 2;
            case 2:
                if (!user) return [3 /*break*/, 4];
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                if (req.body.password) {
                    user.password = req.body.password;
                }
                return [4 /*yield*/, user.save()];
            case 3:
                updatedUser = _b.sent();
                res.send({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    token: generateToken_1.default(updatedUser._id),
                });
                return [3 /*break*/, 5];
            case 4:
                res.status(404);
                throw new bad_request_error_1.default('User not found');
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateUserProfile = updateUserProfile;
var currentUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send({ currentUser: req.currentUser || null });
        return [2 /*return*/];
    });
}); };
exports.currentUser = currentUser;
var signOut = function (req, res) {
    req.session = null;
    res.send({});
};
exports.signOut = signOut;
var userFavoriteMovies = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.session) return [3 /*break*/, 2];
                return [4 /*yield*/, User_1.default.findById((_a = req.currentUser) === null || _a === void 0 ? void 0 : _a.id)];
            case 1:
                user = _b.sent();
                _b.label = 2;
            case 2:
                if (!user)
                    res.send(null);
                if (user) {
                    res.send({
                        favoriteMovies: user.favoriteMovies,
                    });
                }
                else {
                    throw new bad_request_error_1.default('User not found');
                }
                return [2 /*return*/];
        }
    });
}); };
exports.userFavoriteMovies = userFavoriteMovies;