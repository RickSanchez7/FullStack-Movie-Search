"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var authController_1 = require("../controllers/authController");
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
var current_user_mdw_1 = __importDefault(require("../middleware/current-user-mdw"));
var validate_request_1 = __importDefault(require("../middleware/validate-request"));
var Router = express_1.default.Router();
Router.post('/signup', [
    express_validator_1.body('email').isEmail().withMessage('Email must be valid'),
    express_validator_1.body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
], validate_request_1.default, authController_1.signup);
Router.post('/signin', authController_1.signin);
Router.post('/signout', authController_1.signOut);
Router.get('/currentuser', current_user_mdw_1.default, authMiddleware_1.default, authController_1.currentUser);
Router.route('/profile')
    .get(current_user_mdw_1.default, authMiddleware_1.default, authController_1.userProfile)
    .put(current_user_mdw_1.default, authMiddleware_1.default, authController_1.updateUserProfile);
exports.default = Router;
