"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const users_1 = require("../controller/users");
const router = express_1.default.Router();
router.get('/fetch-user-data', authMiddleware_1.authMiddleware, users_1.fetchUserData);
router.put('/update-user-data', authMiddleware_1.authMiddleware, users_1.updateUserData);
router.post('/create-user-data', authMiddleware_1.authMiddleware, users_1.createUserData);
exports.default = router;
