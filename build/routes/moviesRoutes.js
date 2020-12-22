"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = require("../controllers/authController");
var favoriteMovieController_1 = require("../controllers/favoriteMovieController");
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
var current_user_mdw_1 = __importDefault(require("../middleware/current-user-mdw"));
var Router = express_1.default.Router();
Router.post('/addmovie', current_user_mdw_1.default, authMiddleware_1.default, favoriteMovieController_1.addMovie);
Router.post('/removemovie', current_user_mdw_1.default, authMiddleware_1.default, favoriteMovieController_1.removeMovie);
Router.get('/getmovies', current_user_mdw_1.default, authMiddleware_1.default, authController_1.userFavoriteMovies);
exports.default = Router;
